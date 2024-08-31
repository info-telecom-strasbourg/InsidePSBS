import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/primitives/button";
import { FormTextInput } from "@/components/primitives/form-input";
import { useForm } from "@/hooks/useForm";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useMe } from "@app/(tabs)/profile/_features/me.query";
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
  admission_year: z
    .string()
    .regex(/\d+/, { message: "L'année de promotion n'est pas valide" })
    .transform(Number)
    .refine((n) => n > 2000 && n < 3000, {
      message: "L'année de promotion n'est pas valide",
    })
    .transform(String),
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
    const res = await query(form.values, token || "");

    switch (res.status) {
      case 200:
        Toast.show("Votre année d'arrivée a été modifié avec succès", {
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
