import { Typography } from "@/components/primitives/typography";
import type { FouailleBalanceData } from "@/schemas/fouaille/balance.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Nfc } from "lucide-react-native";
import { View } from "react-native";

const Balance = ({ data }: { data: FouailleBalanceData["data"] }) => {
  const { theme } = useTheme();
  return (
    <View className="mx-2 flex-1 flex-row items-center justify-between rounded-2xl border border-muted-foreground bg-popover p-8">
      <View className="flex-1 gap-4">
        <Typography size="h4" className="text-muted-foreground">
          Carte Fouaille
        </Typography>
        <Typography size="h1" fontWeight="bold">
          {data.balance}€
        </Typography>
        <Typography size="h3" fontWeight="semibold">
          {`${data.first_name} ${data.last_name}`}
        </Typography>
      </View>
      <View>
        <Nfc className="size-24" color={colors[theme].foreground} />
      </View>
    </View>
  );
};

export default Balance;
