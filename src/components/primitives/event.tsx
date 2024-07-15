import { useModalRouter } from "@/hooks/useModalRouter";
import type { EventsData } from "@/schemas/GET/events/event.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { capitalize } from "@/utils/capitalize";
import { Clock, Forward, Map } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Typography } from "./typography";

export const Event = ({
  item,
  isLoading,
}: {
  item: EventsData["data"][0] | undefined;
  isLoading: boolean;
}) => {
  const { theme } = useTheme();
  const modalRouter = useModalRouter();
  return (
    <View className="mb-6 flex-1 flex-row gap-3 text-wrap rounded-2xl bg-popover p-3">
      <Skeleton.Group show={true}>
        <View
          className="w-1 rounded-full"
          style={{ backgroundColor: item?.color }}
        ></View>
        <View>
          <View className="w-full flex-row items-center justify-between gap-4 pr-6">
            <View className="flex-row items-center gap-3">
              <Skeleton colorMode={theme}>
                <TouchableOpacity
                  onPress={() =>
                    modalRouter.open(`/organizations/${item?.author.id}`)
                  }
                >
                  <Image
                    source={{ uri: item?.author.logo_url || undefined }}
                    className="size-12"
                  />
                </TouchableOpacity>
              </Skeleton>
              <Skeleton colorMode={theme}>
                <Typography size="h5" fontWeight="semibold">
                  {item?.author.short_name}
                </Typography>
              </Skeleton>
            </View>
            <Skeleton colorMode={theme}>
              <Typography
                size="p"
                className="rounded-full px-3 py-1 text-white"
                style={{
                  backgroundColor: item?.color,
                  fontFamily: "SpaceGrotesk-semibold",
                }}
              >
                {capitalize(item?.date_format.date)}
              </Typography>
            </Skeleton>
          </View>
          <View className="gap-3">
            <Skeleton colorMode={theme}>
              <Text
                style={{
                  color: item?.color,
                  fontFamily: "SpaceGrotesk-semibold",
                  fontSize: 22,
                }}
              >
                {item?.title}
              </Text>
            </Skeleton>
            <View className="flex-row items-center gap-2">
              <Skeleton colorMode={theme}>
                <>
                  <Clock color={colors[theme].foreground} size={20} />
                  <Typography
                    size="sm"
                    className="text-muted-foreground"
                    fontWeight="semibold"
                  >
                    {item?.date_format.start_at_simplified} -{" "}
                    {item?.date_format.end_at_simplified}
                  </Typography>
                </>
              </Skeleton>
            </View>
            <View className="w-full flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Skeleton colorMode={theme}>
                  <>
                    <Map color={colors[theme].foreground} size={20} />
                    <Typography
                      size="sm"
                      className="text-muted-foreground"
                      fontWeight="semibold"
                    >
                      {item?.location}
                    </Typography>
                  </>
                </Skeleton>
              </View>
              {item?.post_id ? (
                <TouchableOpacity
                  className="mr-6"
                  onPress={() => modalRouter.open(`/post/${item?.post_id}`)}
                >
                  <Forward color={colors[theme].foreground} size={24} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </Skeleton.Group>
    </View>
  );
};

export default Event;
