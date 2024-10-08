import { saveAuthData } from "@/auth/auth-storage";
import { useAuthStore } from "@/auth/auth-store";
import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { FormTextInput } from "@/components/primitives/form-input";
import { Header } from "@/components/primitives/header";
import { Typography } from "@/components/primitives/typography";
import { routes } from "@/constants/routes";
import { useForm } from "@/hooks/useForm";
import { signIn } from "@/queries/auth/sign-in.query";
import { SignInSchema } from "@/schemas/auth/sign-in.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-root-toast";

export default function SignInPage() {
  const { setUser } = useAuthStore();

  const { theme } = useTheme();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    schema: SignInSchema,
  });
  const handleSubmit = async () => {
    const res = await signIn(form.values);
    if (res.error) {
      switch (res.status) {
        case 401:
          Toast.show("Email ou mot de passe incorrect", {
            duration: Toast.durations.LONG,
            backgroundColor: colors[theme].destructive,
          });
          break;
        case 409:
          Toast.show(
            "Votre compte n'a pas encore été validé. Veuillez vérifier vos emails.",
            {
              duration: Toast.durations.LONG,
              backgroundColor: colors[theme].destructive,
            }
          );
          break;
        default:
          Toast.show(
            "Une erreur est survenue lors de la connexion. Si le problème persiste, contactez un administrateur.",
            {
              duration: Toast.durations.LONG,
              backgroundColor: colors[theme].destructive,
            }
          );
          break;
      }
    } else {
      const { token, user } = res.data;
      setUser(user, token);
      await saveAuthData(token, user);
      router.push(routes.home as Href);
    }
  };
  return (
    <PageContainer>
      <Header title="Se connecter" leftIcon="inside-psbs" rightIcon="close" />
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
            <FormTextInput
              label="Mot de passe"
              form={form}
              id="password"
              autoComplete="current-password"
              autoCapitalize="none"
              autoCorrect={false}
              password
              placeholder="********"
            />
            <TouchableOpacity
              className="flex w-full flex-row gap-2"
              onPress={() => router.push(routes.forgot_password as Href)}
            >
              <Typography size="p">Mot de passe oublié ?</Typography>
              <Typography size="p" className="text-primary">
                Réinitialiser
              </Typography>
            </TouchableOpacity>

            <Button
              onPress={() => form.submit(handleSubmit)}
              loading={form.isSubmitting}
              disabled={form.isSubmitting}
            >
              Se connecter
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageContainer>
  );
}
