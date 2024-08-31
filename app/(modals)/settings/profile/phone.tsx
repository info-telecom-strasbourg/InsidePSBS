import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/primitives/button";
import { FormTextInput } from "@/components/primitives/form-input";
import { useForm } from "@/hooks/useForm";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useMe } from "@app/(tabs)/profile/_features/me.query";
import { checkPhone } from "@app/auth/sign-up/_features/availability.query";
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
    const res = await query(form.values, token || "");

    switch (res.status) {
      case 200:
        Toast.show("Votre numéro de téléphone a été modifié avec succès", {
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
