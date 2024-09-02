import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/primitives/button";
import { FormPicker } from "@/components/primitives/form-picker";
import { Typography } from "@/components/primitives/typography";
import { useForm } from "@/hooks/useForm";
import { useSectors } from "@/queries/auth/sectors.query";
import { useMe } from "@/queries/profile/me.query";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { FetchError, zodFetchWithToken } from "@/utils/fetch";
import { toastError, toastSuccess } from "@/utils/toast";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { z } from "zod";

const schema = z.object({
  sector: z.number().int(),
});

export default function SectorPage() {
  const { data, isLoading } = useMe();
  const { token } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const form = useForm({
    schema,
    defaultValues: { sector: data?.data.sector_id || 0 },
  });
  const { data: sectors } = useSectors();

  const handleSubmit = async () => {
    try {
      if (!token) throw new Error("Unauthorized");
      await zodFetchWithToken("api/user", token, {
        method: "PUT",
        data: {
          sector: form.values.sector,
        },
        schema,
      });

      toastSuccess("Votre filière a été modifiée avec succès");
      router.replace({ pathname: "/settings", params: { refresh: "true" } });
    } catch (error) {
      if (error instanceof FetchError) {
        switch (error.status) {
          case 401:
            return toastError("Cette requête nécessite d'être authentifié");
          case 422:
            return toastError("Vous n'avez pas entré une valeur valide");
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
          <FormPicker
            id="sector"
            label="Filière"
            form={form}
            values={sectors?.map((sector) => ({
              id: sector.id,
              value: sector.name,
            }))}
          />
          <Typography className="text-destructive">
            Cette page ne fonctionne pas à cause de Thibaut Deslandes
          </Typography>
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
