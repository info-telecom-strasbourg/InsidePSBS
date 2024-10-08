import { Button } from "@/components/primitives/button";
import { FormTextInput } from "@/components/primitives/form-input";
import { FormPicker } from "@/components/primitives/form-picker";
import { useSignUp } from "@/hooks/auth/use-sign-up";
import { useForm } from "@/hooks/useForm";
import { useSectors } from "@/queries/auth/sectors.query";
import type { SignUpStep2Data } from "@/schemas/auth/sign-up.schema";
import { signUpStep2Schema } from "@/schemas/auth/sign-up.schema";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

const defaultValues = {
  user_name: "",
  last_name: "",
  first_name: "",
  sector: 0,
  phone: "",
  admission_year: new Date().getFullYear().toString(),
};

export default function Step1Page() {
  const router = useRouter();
  const { updateValue } = useSignUp();

  const { data: sectors } = useSectors();

  const form = useForm({
    schema: signUpStep2Schema,
    defaultValues,
  });

  const handleSubmit = async () => {
    Object.keys(form.values).forEach((key) => {
      const typedKey = key as keyof SignUpStep2Data;
      updateValue(typedKey, form.values[typedKey]);
    });
    router.push("auth/sign-up/step-3" as Href);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 60}
      className="flex-1 bg-background"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-8">
          <FormTextInput
            id="first_name"
            label="Prénom"
            form={form}
            autoComplete="name"
            placeholder="Fabien"
          />
          <FormTextInput
            id="last_name"
            label="Nom"
            form={form}
            autoComplete="family-name"
            placeholder="Pregaldiny"
          />

          <FormTextInput
            id="user_name"
            label="Nom d'utilisateur"
            form={form}
            autoComplete="username"
            autoCapitalize="none"
            placeholder="fabien.pregaldiny"
          />

          <FormTextInput
            id="phone"
            label="Numéro de Téléphone"
            form={form}
            autoComplete="tel"
            keyboardType="phone-pad"
            placeholder="01 23 45 67 89"
          />
          <FormTextInput
            id="admission_year"
            label="Année d'arrivée"
            form={form}
            keyboardType="numeric"
            placeholder="2010"
          />

          <FormPicker
            id="sector"
            label="Filière"
            form={form}
            values={sectors?.map((sector) => ({
              id: sector.id,
              value: sector.name,
            }))}
          />

          <View className="pb-8">
            <Button
              onPress={() => form.submit(handleSubmit)}
              disabled={form.isSubmitting}
              loading={form.isSubmitting}
            >
              Suivant
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
