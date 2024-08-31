import { useAuth } from "@/auth/useAuth";
import { PageContainer } from "@/components/primitives/container";
import { FormTextInput } from "@/components/primitives/form-input";
import { Header } from "@/components/primitives/header";
import { Typography } from "@/components/primitives/typography";
import { DateRangePicker } from "@/features/create/event/date-range-picker";
import { OrganizationSelect } from "@/features/create/event/organization-select";
import { ChoiceItem } from "@/features/create/post/choice-item";
import { useForm } from "@/hooks/useForm";
import { storeEvent } from "@/queries/create/event/store-event";
import { useMe } from "@/queries/profile/me.query";
import {
  CreateEventSchema,
  type CreateEventData,
} from "@/schemas/create/event/create-event.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import {
  BottomSheetModalProvider,
  type BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { Calendar } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function CreateEventPage() {
  const form = useForm({
    schema: CreateEventSchema,
    defaultValues: {
      title: "",
      place: "",
    },
  });
  const { token } = useAuth();
  const { theme } = useTheme();
  const today = new Date();

  const { data, isLoading: dataIsLoading } = useMe();
  const [organizationId, setOrganizationId] = useState<number | null>(null);

  const dateRangePickerRef = useRef<BottomSheetModal>(null);
  const organizationListRef = useRef<BottomSheetModal>(null);

  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [startAt, setStartAt] = useState<string>("");
  const [endAt, setEndAt] = useState<string>("");
  const [displayOrganizations, setDisplayOrganizations] =
    useState<boolean>(false);

  const handleSubmit = useCallback(
    async (values: CreateEventData) => {
      setIsPublishing(true);
      try {
        const res = await storeEvent(
          values.title,
          values.place,
          organizationId,
          startAt,
          endAt,
          token
        );
        if (!res.ok) {
          console.log(JSON.stringify(res));
        }
      } catch (error) {
        console.log(error);
      }
      setIsPublishing(false);
    },
    [endAt, startAt, token, organizationId]
  );

  useEffect(() => {
    if (data?.organizations[0] && organizationId === null) {
      setOrganizationId(data.organizations[0].id);
      setDisplayOrganizations(true);
    }
  }, [organizationId, data]);

  return (
    <BottomSheetModalProvider>
      <PageContainer>
        <Header title="Créer un événement" rightIcon="close" leftIcon="back" />

        <View className="mb-4 flex-row items-center">
          {!data || dataIsLoading ? (
            <Skeleton.Group show={!data || dataIsLoading}>
              <Skeleton colorMode={theme}>
                <View className="rounded-2xl p-4">
                  <Typography size="h3">Name Surname</Typography>
                </View>
              </Skeleton>
            </Skeleton.Group>
          ) : data.organizations && displayOrganizations ? (
            <ChoiceItem
              isOrganization
              onPress={() => {
                organizationListRef.current?.present();
              }}
              title={
                data.organizations.filter(
                  (item) => item.id === organizationId
                )[0].name
              }
              url={
                data.organizations.filter(
                  (item) => item.id === organizationId
                )[0].logo_url
              }
            />
          ) : (
            <Typography size="h4" fontWeight="medium">
              Vous ne pouvez pas créer d'évènement car vous ne faîtes pas partie
              d'une association ou d'un club !
            </Typography>
          )}
        </View>

        <View className="flex-1 justify-between pb-4">
          <View>
            <FormTextInput
              form={form}
              id="title"
              placeholder="Samed'ITS"
              label="Titre"
            />
            <FormTextInput
              form={form}
              id="place"
              placeholder="Fouaille"
              label="Lieu"
            />

            <Typography size="h2" fontWeight="bold" className="mb-4 mt-2">
              Date(s) de l'événement :
            </Typography>
            <TouchableOpacity
              onPress={() => {
                dateRangePickerRef.current?.present();
              }}
            >
              <View className="flex-row items-center justify-between rounded-2xl bg-popover p-4 px-6">
                <Typography fontWeight="semibold">
                  {startAt && endAt
                    ? startAt === endAt
                      ? format(startAt, "dd/MM/yyyy")
                      : `${format(startAt, "dd/MM/yyyy")} - ${format(
                          endAt,
                          "dd/MM/yyyy"
                        )}`
                    : format(today, "dd/MM/yyyy")}
                </Typography>

                <Calendar
                  strokeWidth={1.5}
                  color={colors[theme].mutedForeground}
                  size={24}
                />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => form.submit(handleSubmit)}
            disabled={
              isPublishing || !data?.organizations[0] || organizationId === null
            }
          >
            <View
              className="items-center justify-center rounded-full bg-primary p-4"
              style={{
                opacity:
                  isPublishing ||
                  !data?.organizations[0] ||
                  organizationId === null
                    ? 0.6
                    : 1,
              }}
            >
              {isPublishing ? (
                <Typography
                  className="text-center text-white"
                  fontWeight="bold"
                  size="h2"
                >
                  Publication en cours...
                </Typography>
              ) : (
                <Typography
                  className="text-center text-white"
                  fontWeight="bold"
                  size="h2"
                >
                  Publier
                </Typography>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </PageContainer>
      <DateRangePicker
        ref={dateRangePickerRef}
        today={today}
        setStartAt={setStartAt}
        setEndAt={setEndAt}
      />
      <OrganizationSelect
        data={data}
        organizationId={organizationId}
        setOrganizationId={setOrganizationId}
        ref={organizationListRef}
      />
    </BottomSheetModalProvider>
  );
}