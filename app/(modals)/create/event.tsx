import { useAuth } from "@/auth/useAuth";
import { PageContainer } from "@/components/primitives/container";
import { CustomModal } from "@/components/primitives/custom-modal";
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
import { FetchError } from "@/utils/fetch";
import { toastError, toastSuccess } from "@/utils/toast";
import {
  BottomSheetModalProvider,
  type BottomSheetModal,
} from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { Calendar } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import { useEffect, useRef, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";

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

  // Fetching...
  const { data, isLoading: dataIsLoading } = useMe();

  // Date Picker
  const today = new Date();
  const dateRangePickerRef = useRef<BottomSheetModal>(null);
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");

  // Time Picker
  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);
  const [timeStart, setTimeStart] = useState<Date>(today);
  const [timeEnd, setTimeEnd] = useState<Date>(today);

  const router = useRouter();

  // AccountPicker
  const [organizationId, setOrganizationId] = useState<number | null>(null);
  const organizationListRef = useRef<BottomSheetModal>(null);
  const [displayOrganizations, setDisplayOrganizations] =
    useState<boolean>(false);
  useEffect(() => {
    if (data?.organizations[0] && organizationId === null) {
      setOrganizationId(data.organizations[0].id);
      setDisplayOrganizations(true);
    }
  }, [organizationId, data]);

  // Submitting
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const handleSubmit = async (values: CreateEventData) => {
    setIsPublishing(true);
    try {
      await storeEvent(
        values.title,
        values.place,
        organizationId,
        `${dateStart} ${format(timeStart, "HH:mm")}`,
        `${dateEnd} ${format(timeEnd, "HH:mm")}`,
        token
      );

      toastSuccess("Événement créé avec succès");
      router.replace({ pathname: "/calendar", params: { refresh: "true" } });
    } catch (error) {
      if (error instanceof FetchError) {
        toastError(`Erreur ${error.status} lors de la publication`);
      } else {
        toastError("Une erreur est survenue");
      }
    } finally {
      setIsPublishing(false);
    }
  };

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
                  {dateStart && dateEnd
                    ? dateStart === dateEnd
                      ? format(dateStart, "dd/MM/yyyy")
                      : `${format(dateStart, "dd/MM/yyyy")} - ${format(
                          dateEnd,
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
            <View className="mt-4 flex-row items-center justify-center gap-3">
              <View className="flex-1">
                <Typography
                  size="h4"
                  fontWeight="semibold"
                  className="mb-2 text-center"
                >
                  Heure de début :
                </Typography>
                <TouchableOpacity
                  onPress={() => {
                    setShowStartPicker(true);
                  }}
                  className="flex-row items-center justify-between rounded-2xl bg-popover p-4 px-6"
                >
                  <Typography fontWeight="semibold">
                    {format(timeStart, "HH:mm")}
                  </Typography>

                  <Calendar
                    strokeWidth={1.5}
                    color={colors[theme].mutedForeground}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
              <View className="flex-1">
                <Typography
                  size="h4"
                  fontWeight="semibold"
                  className="mb-2 text-center"
                >
                  Heure de fin :
                </Typography>
                <TouchableOpacity
                  onPress={() => {
                    setShowEndPicker(true);
                  }}
                  className="flex-row items-center justify-between rounded-2xl bg-popover p-4 px-6"
                >
                  <Typography fontWeight="semibold">
                    {format(timeEnd, "HH:mm")}
                  </Typography>

                  <Calendar
                    strokeWidth={1.5}
                    color={colors[theme].mutedForeground}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
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
        setStartAt={setDateStart}
        setEndAt={setDateEnd}
      />
      <OrganizationSelect
        data={data}
        organizationId={organizationId}
        setOrganizationId={setOrganizationId}
        ref={organizationListRef}
      />
      {showStartPicker &&
        (() => {
          const dateTimePicker = (
            <DateTimePicker
              value={timeStart || new Date()}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={true}
              style={{
                backgroundColor: colors[theme].popover,
              }}
              timeZoneName="Europe/Paris"
              onChange={(event, selectedTime) => {
                setTimeStart(selectedTime!);
                if (Platform.OS === "android") {
                  setShowStartPicker(false);
                }
              }}
            />
          );
          return Platform.OS === "android" ? (
            dateTimePicker
          ) : (
            <CustomModal
              isOpen={showStartPicker}
              setIsOpen={setShowStartPicker}
            >
              {dateTimePicker}
            </CustomModal>
          );
        })()}
      {showEndPicker &&
        (() => {
          const dateTimePicker = (
            <DateTimePicker
              value={timeEnd || new Date()}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={true}
              style={{
                backgroundColor: colors[theme].popover,
              }}
              timeZoneName="Europe/Paris"
              onChange={(event, selectedTime) => {
                setTimeEnd(selectedTime!);
                if (Platform.OS === "android") {
                  setShowEndPicker(false);
                }
              }}
            />
          );
          return Platform.OS === "android" ? (
            dateTimePicker
          ) : (
            <CustomModal isOpen={showEndPicker} setIsOpen={setShowEndPicker}>
              {dateTimePicker}
            </CustomModal>
          );
        })()}
    </BottomSheetModalProvider>
  );
}
