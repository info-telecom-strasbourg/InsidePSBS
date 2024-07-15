import type { OrdersData } from "@/schemas/GET/fouaille/orders.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { capitalize } from "@/utils/capitalize";
import {
  Beef,
  Beer,
  ChevronDown,
  GlassWater,
  TrendingUp,
  Utensils,
} from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Typography } from "./typography";

const orderIcon = (
  product: OrdersData["data"]["orders"][0]["product"] | undefined
) => {
  switch (product?.type) {
    case "Soirée":
      return Beer;
    case "CharcutFromage":
      return Beef;
    case "Shots":
      return GlassWater;
    case "Midi":
      return Utensils;
    default:
      return TrendingUp;
  }
};

export const Order = ({
  order,
}: {
  order: OrdersData["data"]["orders"][0] | undefined;
}) => {
  const { theme } = useTheme();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const Icon = orderIcon(order?.product);

  return (
    <TouchableOpacity
      onPress={() => setIsOpened(!isOpened)}
      className="mx-2 mb-3 rounded-2xl bg-popover p-3 px-4"
    >
      <View className="flex-row items-center gap-4">
        {order?.product ? (
          <>
            <Icon color={colors.red} size={24} />
            <View className="">
              <Typography size="h4" fontWeight="semibold">
                {capitalize(order?.product?.name)}
              </Typography>
              <Text
                style={{
                  color: colors.red,
                  fontFamily: "SpaceGrotesk-regular",
                  fontSize: 12,
                }}
              >
                - {order?.total_price}€
              </Text>
            </View>
          </>
        ) : (
          <>
            <TrendingUp color="#0E8A30" size={24} />
            <View>
              <Typography size="h4" fontWeight="semibold">
                Rechargement
              </Typography>
              <Text
                style={{
                  color: "#0E8A30",
                  fontFamily: "SpaceGrotesk-regular",
                  fontSize: 12,
                }}
              >
                {order?.total_price}€
              </Text>
            </View>
          </>
        )}
        <View className="absolute right-1">
          <ChevronDown size={24} color={colors[theme].foreground} />
        </View>
      </View>
      {isOpened && order?.product && (
        <View className="ml-11 mt-4 flex-row items-center justify-between">
          <Typography fontWeight="semibold">
            {order?.amount}x {order?.product?.type}
          </Typography>
          <Typography className="text-muted-foreground" size="sm">
            {order.date}
          </Typography>
        </View>
      )}
    </TouchableOpacity>
  );
};
