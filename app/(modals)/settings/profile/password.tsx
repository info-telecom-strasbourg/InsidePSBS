import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/primitives/button";
import { FormTextInput } from "@/components/primitives/form-input";
import { useForm } from "@/hooks/useForm";
import { useMe } from "@/queries/profile/me.query";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { FetchError, zodFetchWithToken } from "@/utils/fetch";
import { toastError, toastSuccess } from "@/utils/toast";
import * as Crypto from "expo-crypto";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>]*$/
);

const schema = z
  .object({
    former_password: z
      .string()
      .min(1, { message: "Veuillez entrer un mot de passe" }),
    password: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      })
      .regex(passwordRegex, {
        message:
          "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
      }),
    password_confirmation: z
      .string()
      .min(1, { message: "Veuillez confirmer votre mot de passe" }),
  })
  .superRefine(async ({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation)
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["password_confirmation"],
      });
  });

const query = async (
  data: z.infer<typeof schema> & { email: string },
  token: string
) => {
  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${data.password}${data.email}`
  );
  const hashedPasswordConfirmation = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${data.password_confirmation}${data.email}`
  );
  const hashedFormerPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${data.former_password}${data.email}`
  );

  return await zodFetchWithToken("api/password", token, {
    method: "PUT",
    data: {
      former_password: hashedFormerPassword,
      password: hashedPassword,
      password_confirmation: hashedPasswordConfirmation,
    },
  });
};

export default function PasswordPage() {
  const { data, isLoading } = useMe();
  const { token } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const form = useForm({
    schema,
    defaultValues: {
      former_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleSubmit = async () => {
    try {
      if (!token) throw new Error("Unauthorized");
      await query(
        { ...form.values, email: data?.data.email || "" },
        token || ""
      );
      toastSuccess("Votre mot de passe a été modifié avec succès");
      router.replace({ pathname: "/settings", params: { refresh: "true" } });
    } catch (error) {
      if (error instanceof FetchError) {
        switch (error.status) {
          case 401:
            return toastError("Cette requête nécessite d'être authentifié");
          case 422:
            return toastError("Le mot de passe entré n'est pas valide");
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
            label="Ancien mot de passe"
            form={form}
            id="former_password"
            autoComplete="current-password"
            autoCapitalize="none"
            autoCorrect={false}
            password
            placeholder="********"
          />
          <FormTextInput
            id="password"
            label="Nouveau mot de passe"
            form={form}
            autoComplete="new-password"
            autoCapitalize="none"
            autoCorrect={false}
            password
            placeholder="********"
          />
          <FormTextInput
            id="password_confirmation"
            label="Confirmer le mot de passe"
            form={form}
            autoComplete="new-password"
            autoCapitalize="none"
            autoCorrect={false}
            password
            placeholder="********"
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
