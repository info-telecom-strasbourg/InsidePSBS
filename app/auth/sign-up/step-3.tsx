import { PageError } from "@/components/page/error";
import { PageLoading } from "@/components/page/loading";
import { Button } from "@/components/primitives/button";
import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useCGU } from "@app/(public)/cgu/_features/cgu.query";
import CheckBox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import toast from "react-native-root-toast";
import { signUp } from "./_features/sign-up.query";
import { useSignUp } from "./_features/use-sign-up";

export default function Step3Page() {
  const { data, error, isLoading } = useCGU();
  const [checked, setChecked] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  const form = useSignUp();

  const handleSubmit = async () => {
    const submit = async () => {
      const res = await signUp(form.values);
      if (!res) throw new Error("Sign up failed");
      router.push("auth/confirm");
    };

    if (!(await form.submit(submit))) {
      toast.show(
        "Une erreur est survenue lors de la création de votre compte. Si le problème persiste, contactez un administrateur.",
        {
          duration: toast.durations.LONG,
          backgroundColor: colors[theme].destructive,
        }
      );
    }
  };

  return (
    <View className="flex flex-1 items-center justify-center">
      {isLoading && <PageLoading />}
      {error ? (
        <PageError />
      ) : (
        <View className="w-full flex-1 gap-12 pb-8">
          <ScrollView>
            <View className="flex flex-1 flex-col gap-10 py-5">
              {data?.sections?.map((section, index) => (
                <View key={index}>
                  <Typography size="h4" fontWeight="bold" className="mb-2">
                    {section.title}
                  </Typography>
                  <Typography size="p">{section.content}</Typography>
                </View>
              ))}
            </View>
          </ScrollView>
          <Pressable
            className="flex-row items-center gap-3"
            onPress={() => setChecked(!checked)}
          >
            <CheckBox
              onValueChange={setChecked}
              value={checked}
              color={colors[theme].primary}
            />
            <Typography size="p">
              J'accepte les conditions générales d'utilisation
            </Typography>
          </Pressable>
          <Button
            disabled={!checked || form.isSubmitting}
            loading={form.isSubmitting}
            onPress={handleSubmit}
          >
            Créer un compte
          </Button>
        </View>
      )}
    </View>
  );
}
