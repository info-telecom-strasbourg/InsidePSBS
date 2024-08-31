import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { FormTextInput } from "@/components/primitives/form-input";
import { Header } from "@/components/primitives/header";
import { useForm } from "@/hooks/useForm";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Toast from "react-native-root-toast";
import { forgotPassword } from "./_features/forgot.query";
import { ForgotPasswordSchema } from "./_features/forgot.schema";

export default function ForgotPasswordPage() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    schema: ForgotPasswordSchema,
  });
  const { theme } = useTheme();

  const handleSubmit = async () => {
    const res = await forgotPassword(form.values);
    switch (res.status) {
      case 404:
        Toast.show("L'email renseigné n'est pas valide.", {
          duration: Toast.durations.LONG,
          backgroundColor: colors[theme].destructive,
        });
        break;
      case 200:
        Toast.show(
          "Un email de réinitialisation de mot de passe vous a été envoyé.",
          {
            duration: Toast.durations.LONG,
            backgroundColor: colors.green,
          }
        );
        break;
      default:
        Toast.show(
          `Erreur ${res.status}. Si le problème persiste, contactez un administrateur.`,
          {
            duration: Toast.durations.LONG,
            backgroundColor: colors[theme].destructive,
          }
        );
        break;
    }
  };

  return (
    <PageContainer>
      <Header title="Réinitialiser" leftIcon="inside-psbs" rightIcon="close" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={60}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mt-8 flex flex-col justify-center gap-8">
            <FormTextInput
              label="Email"
              form={form}
              id="email"
              autoComplete="email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="fabien.pregaldiny@its-tps.fr"
            />

            <Button
              onPress={() => form.submit(handleSubmit)}
              loading={form.isSubmitting}
              disabled={form.isSubmitting}
            >
              Réinitialiser le mot de passe
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageContainer>
  );
}
