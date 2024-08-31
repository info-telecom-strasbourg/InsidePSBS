import { useAuth } from "@/auth/useAuth";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import { z } from "zod";
import type { EventsData } from "./event.schema";
import { EventSchema } from "./event.schema";

const calendarFetcher = async (url: string, token: string | null) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const parsedData = EventSchema.safeParse(data);
    return parsedData.data?.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.map((e) => ({ path: e.path, message: e.message }));
      console.error(error);
    }
    console.error(error);
  }
};

const getKey = (pageIndex: number, previousPageData: EventsData["data"]) => {
  if (pageIndex === 0) {
    return `${process.env.EXPO_PUBLIC_API_URL}/api/event?per_page=10&page=${
      pageIndex + 1
    }`;
  } else {
    const len = previousPageData?.length;
    if (previousPageData && !previousPageData.length) return null;
    return `${process.env.EXPO_PUBLIC_API_URL}/api/event?previous_date=${
      previousPageData[len - 1].start_at
    }&per_page=10&page=${pageIndex + 1}`;
  }
};

export const useCalendar = () => {
  const { token } = useAuth();

  const res = useFetchInfinite<EventsData["data"]>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData),
    (url) => calendarFetcher(url, token || "")
  );
  const hasMore = res.data?.[res.data?.length - 1]?.length ?? 0 > 0;
  return { ...res, hasMore };
};
