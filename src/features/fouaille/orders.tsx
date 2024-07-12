import { Typography } from "@/components/primitives/typography";
import type { OrdersData } from "@/schemas/GET/fouaille/orders.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { ChevronDown, TrendingUp } from "lucide-react-native";
import { FlatList, TouchableOpacity, View } from "react-native";

type OrdersProps = {
  data: (OrdersData["data"]["orders"] | undefined)[];
  size: number;
  setSize: (size: number) => void;
};

const Orders = ({ data, size, setSize }: OrdersProps) => {
  const { theme } = useTheme();
  return (
    <>
      <FlatList
        data={data}
        onEndReached={() => setSize(size + 1)}
        onEndReachedThreshold={0.4}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View className="gap-3">
            {item?.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="mx-2 rounded-2xl bg-popover p-4"
                // onPress={() => modalRouter.open(`/post/${item.id}`)}
              >
                {item.product === null ? (
                  <View className="flex-row items-center gap-5">
                    <TrendingUp className="size-24" color={colors.green} />
                    <View>
                      <Typography size="h5" fontWeight="semibold">
                        Rechargement
                      </Typography>
                      <Typography className="text-green">
                        {item.total_price}
                      </Typography>
                    </View>
                    <View className="absolute right-2">
                      <ChevronDown
                        className="size-24"
                        color={colors[theme].foreground}
                      />
                    </View>
                  </View>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </>
  );
};

export default Orders;
