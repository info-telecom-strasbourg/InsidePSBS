import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import type { FouailleBalanceData } from "@app/(modals)/fouaille/_features/balance.schema";
import { Nfc } from "lucide-react-native";
import { View } from "react-native";

export const Balance = ({
  data,
  isLoading,
}: {
  data: FouailleBalanceData["data"] | undefined;
  isLoading: boolean;
}) => {
  const { theme } = useTheme();
  return (
    <View className="mx-2 mb-6 flex-row items-center justify-between rounded-2xl border border-muted-foreground bg-popover p-8">
      <View className="flex-1 gap-4">
        <Typography size="h4" className="text-muted-foreground">
          Carte Fouaille
        </Typography>
        <Typography size="h1" fontWeight="bold">
          {data?.balance}€
        </Typography>
        <Typography size="h3" fontWeight="semibold">
          {`${data?.first_name} ${data?.last_name}`}
        </Typography>
      </View>
      <View>
        <Nfc className="size-24" color={colors[theme].foreground} />
      </View>
    </View>
  );
};
