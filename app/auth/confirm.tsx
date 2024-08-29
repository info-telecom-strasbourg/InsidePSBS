import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import { CircleCheck } from "lucide-react-native";
import { View } from "react-native";

export default function Step4Page() {
  const router = useRouter();
  return (
    <PageContainer className="flex flex-col justify-between">
      <View className="flex-1 items-center justify-center gap-10">
        <CircleCheck size={90} color={colors.green} />
        <View className="gap-2">
          <Typography size="h1">
            Votre compte a été créé avec succès !
          </Typography>
          <Typography size="p">
            Un email de vérification vous a été envoyé. Veuillez le valider pour
            finaliser votre inscription
          </Typography>
        </View>
        <Button className="bg-green" onPress={() => router.replace("/")}>
          Retour à l'accueil
        </Button>
      </View>
    </PageContainer>
  );
}
