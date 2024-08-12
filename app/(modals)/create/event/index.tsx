import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { FormTextInput } from "@/components/primitives/form-input";
import { Header } from "@/components/primitives/header";
import { Typography } from "@/components/primitives/typography";
import { useForm } from "@/hooks/useForm";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import {
  BottomSheetModalProvider,
  type BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Calendar } from "lucide-react-native";
import { useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import type { CreateEventData } from "./_features/create-event.schema";
import { CreateEventSchema } from "./_features/create-event.schema";
import { DateRangePicker } from "./_features/date-range-picker";

export default function CreateEventPage() {
  const form = useForm({
    schema: CreateEventSchema,
    defaultValues: {
      title: "",
      place: "",
    },
  });

  const handleSubmit = (values: CreateEventData) => {
    console.log(values);
  };

  const { theme } = useTheme();
  const today = new Date();

  const dateRangePickerRef = useRef<BottomSheetModal>(null);

  return (
    <BottomSheetModalProvider>
      <PageContainer>
        <Header title="Créer un événement" rightIcon="close" leftIcon="back" />

        <FormTextInput
          form={form}
          id="title"
          placeholder="Samed'ITS"
          label="Titre"
        />
        <FormTextInput
          form={form}
          id="place"
          placeholder="Samed'ITS"
          label="Lieu"
        />

        <Typography size="h2" fontWeight="bold" className="mb-4">
          Date(s) de l'événement :
        </Typography>
        <TouchableOpacity
          onPress={() => {
            dateRangePickerRef.current?.present();
          }}
        >
          <View className="flex-row items-center justify-between rounded-2xl bg-popover p-4 px-6">
            <Typography fontWeight="semibold">
              {/* {format(uploadedAt, "dd/MM/yyyy")} */}
            </Typography>

            <Calendar
              strokeWidth={1.5}
              color={colors[theme].mutedForeground}
              size={24}
            />
          </View>
        </TouchableOpacity>
        <Button onPress={() => form.submit(handleSubmit)}>Envoyer</Button>
      </PageContainer>
      <DateRangePicker ref={dateRangePickerRef} today={today} />
    </BottomSheetModalProvider>
  );
}
