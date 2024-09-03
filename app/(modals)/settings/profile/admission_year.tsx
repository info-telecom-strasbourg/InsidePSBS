import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/primitives/button";
import { FormTextInput } from "@/components/primitives/form-input";
import { useForm } from "@/hooks/useForm";
import { useMe } from "@/queries/profile/me.query";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { FetchError, zodFetchWithToken } from "@/utils/fetch";
import { toastError, toastSuccess } from "@/utils/toast";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { z } from "zod";

const schema = z.object({
  admission_year: z
    .string()
    .regex(/\d+/, { message: "L'année de promotion n'est pas valide" })
    .transform(Number)
    .refine((n) => n > 2000 && n < 3000, {
      message: "L'année de promotion n'est pas valide",
    })
    .transform(String),
});

export default function AdmissionYearPage() {
  const { data, isLoading } = useMe();
  const { token } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const form = useForm({
    schema,
    defaultValues: { admission_year: data?.data.admission_year || "" },
  });

  const handleSubmit = async () => {
    try {
      if (!token) throw new Error("Unauthorized");
      await zodFetchWithToken("api/user", token, {
        method: "PUT",
        data: {
          admission_year: form.values.admission_year,
        },
        schema,
      });

      toastSuccess("Votre année d'arrivée a été modifiée avec succès");
      router.replace({ pathname: "/settings", params: { refresh: "true" } });
    } catch (error) {
      if (error instanceof FetchError) {
        switch (error.status) {
          case 401:
            return toastError("Cette requête nécessite d'être authentifié");
          case 422:
            return toastError("Vous n'avez pas entré une valeur valide");
          default:
            return toastError(`Erreur ${error.status} lors de la mise à jour`);
        }
      }
      return toastError("Une erreur est survenue");
    }
  };

  if (!data?.data || isLoading) {
    return <ActivityIndicator color={colors[theme].foreground} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
      className="flex-1"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-8">
          <FormTextInput
            id="admission_year"
            label="Année d'arrivée"
            form={form}
            keyboardType="numeric"
            placeholder="2010"
          />
          <Button
            onPress={() => form.submit(handleSubmit)}
            loading={form.isSubmitting}
            disabled={form.isSubmitting}
          >
            Modifier
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
