import { ScrollScreenContainer } from "components/Containers";
import { Loader } from "components/Loader";
import { BackButtonTopbar } from "components/Topbar";
import TEXT from "constants/text";
import { useTheme } from "contexts/ThemeContext";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { fetchApiData } from "./CtsApi";

const CtsScreen = () => {
  const { theme } = useTheme();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchApiData().then((res) => {
      if (res === -1) setData(null);
      else {
        setData(res);
      }
    });
  }, []);

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{TEXT.cts.page_name}</BackButtonTopbar>

      <View style={{ paddingHorizontal: 11 }}>
        <View style={{ paddingVertical: 30 }}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Text>truc ici</Text>
            </>
          )}
        </View>
      </View>
    </ScrollScreenContainer>
  );
};

export default CtsScreen;
