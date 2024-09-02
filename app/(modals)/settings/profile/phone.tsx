import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/primitives/button";
import { FormTextInput } from "@/components/primitives/form-input";
import { useForm } from "@/hooks/useForm";
import { checkPhone } from "@/queries/auth/availability.query";
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

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const schema = z.object({
  phone: z
    .string()
    .regex(phoneRegex, "Le numéro de téléphone n'est pas valide")
    .refine(
      async (phone) => {
        return await checkPhone(phone);
      },
      { message: "Le numéro de téléphone est déjà utilisé" }
    ),
});

export default function PhonePage() {
  const { data, isLoading } = useMe();
  const { token } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const form = useForm({
    schema,
    defaultValues: { phone: data?.data.phone || "" },
  });

  const handleSubmit = async () => {
    try {
      if (!token) throw new Error("Unauthorized");
      await zodFetchWithToken("api/user", token, {
        method: "PUT",
        data: {
          phone: form.values.phone,
        },
        schema,
      });

      toastSuccess("Votre numéro de téléphone a été modifié avec succès");
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
            id="phone"
            label="Numéro de Téléphone"
            form={form}
            autoComplete="tel"
            keyboardType="phone-pad"
            placeholder="01 23 45 67 89"
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
