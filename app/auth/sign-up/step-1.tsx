import { Button } from "@/components/primitives/button";
import { FormTextInput } from "@/components/primitives/form-input";
import { useSignUp } from "@/hooks/auth/use-sign-up";
import { useForm } from "@/hooks/useForm";
import type { SignUpStep1Data } from "@/schemas/auth/sign-up.schema";
import { signUpStep1Schema } from "@/schemas/auth/sign-up.schema";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

// const defaultValues = {
//   email: "",
//   password: "",
//   password_confirmation: "",
// };

const defaultValues = {
  email: "",
  password: "",
  password_confirmation: "",
};

export default function Step1Page() {
  const router = useRouter();
  const { updateValue } = useSignUp();

  const form = useForm({
    schema: signUpStep1Schema,
    defaultValues,
  });

  const handleSubmit = async () => {
    Object.keys(form.values).forEach((key) => {
      const typedKey = key as keyof SignUpStep1Data;
      updateValue(typedKey, form.values[typedKey]);
    });
    router.push("auth/sign-up/step-2" as Href);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
      className="flex-1 bg-background"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-1 flex-col gap-8">
          <FormTextInput
            id="email"
            label="Email"
            form={form}
            autoComplete="email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="fabien.pregaldiny@its-tps.fr"
          />
          <FormTextInput
            id="password"
            label="Mot de passe"
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

          <View className="pb-8">
            <Button
              onPress={() => form.submit(handleSubmit)}
              loading={form.isSubmitting}
              disabled={form.isSubmitting}
            >
              Suivant
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
