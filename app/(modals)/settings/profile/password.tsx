import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/primitives/button";
import { FormTextInput } from "@/components/primitives/form-input";
import { useForm } from "@/hooks/useForm";
import { useMe } from "@/queries/profile/me.query";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import * as Crypto from "expo-crypto";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import Toast from "react-native-root-toast";
import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>]*$/
);

const schema = z
  .object({
    old_password: z
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
  const hashedOldPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${data.old_password}${data.email}`
  );

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/password`, {
    method: "PUT",
    body: JSON.stringify({
      former_password: hashedOldPassword,
      password: hashedPassword,
      password_confirmation: hashedPasswordConfirmation,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return {
      data: null,
      status: res.status,
      error: await res.json(),
    };
  }

  return {
    data: await res.json(),
    status: res.status,
    error: null,
  };
};

export default function PasswordPage() {
  const { data, isLoading } = useMe();
  const { token } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const form = useForm({
    schema,
    defaultValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleSubmit = async () => {
    const res = await query(
      { ...form.values, email: data?.data.email || "" },
      token || ""
    );

    switch (res.status) {
      case 200:
        Toast.show("Votre mot de passe a été modifié avec succès", {
          backgroundColor: colors.green,
        });
        router.back();
        break;
      case 401:
        Toast.show("Cette requête nécessite d'être authentifié", {
          backgroundColor: colors[theme].destructive,
        });
        break;
      case 422:
        Toast.show("Le mot de passe entré n'est pas valide", {
          backgroundColor: colors[theme].destructive,
        });
        break;
      default:
        Toast.show(
          "Une erreur est survenue. Veuillez réessayer ultérieurement",
          {
            backgroundColor: colors[theme].destructive,
          }
        );
        break;
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
            id="old_password"
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
