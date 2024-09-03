import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/primitives/button";
import { FormTextInput } from "@/components/primitives/form-input";
import { useForm } from "@/hooks/useForm";
import { useMe } from "@/queries/profile/me.query";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";

import { checkUserName } from "@/queries/auth/availability.query";
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
  user_name: z
    .string()
    .min(3, {
      message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
    })
    .max(30, {
      message: "Le nom d'utilisateur doit contenir au plus 30 caractères",
    })
    .refine(
      async (user_name) => {
        return await checkUserName(user_name);
      },
      { message: "Le nom d'utilisateur est déjà utilisé" }
    ),
});

export default function UsernamePage() {
  const { data, isLoading } = useMe();
  const { token } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const form = useForm({
    schema,
    defaultValues: { user_name: data?.data.user_name || "" },
  });

  const handleSubmit = async () => {
    try {
      if (!token) throw new Error("Unauthorized");
      await zodFetchWithToken("api/user", token, {
        method: "PUT",
        data: {
          user_name: form.values.user_name,
        },
        schema,
      });

      toastSuccess("Votre nom d'utilisateur a été modifié avec succès");
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
            id="user_name"
            label="Nom d'utilisateur"
            form={form}
            autoComplete="username"
            autoCapitalize="none"
            placeholder="fabien.pregaldiny"
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
