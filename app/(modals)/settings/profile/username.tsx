import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/primitives/button";
import { FormTextInput } from "@/components/primitives/form-input";
import { useForm } from "@/hooks/useForm";
import { useMe } from "@/queries/profile/me.query";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";

import { checkUserName } from "@/queries/auth/availability.query";
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

const query = async (data: z.infer<typeof schema>, token: string) => {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/user`, {
    method: "PUT",
    body: JSON.stringify(data),
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
    const res = await query(form.values, token || "");

    switch (res.status) {
      case 200:
        Toast.show("Votre nom d'utilisateur a été modifié avec succès", {
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
        Toast.show("Vous n'avez pas entré une valeur valide", {
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
