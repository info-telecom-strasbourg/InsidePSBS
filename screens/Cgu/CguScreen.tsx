import { BackButtonTopbar } from "components/Topbar";
import { SafeAreaView, View } from "react-native";
import { ScreenContainer } from "components/Containers";

import CGUText from "../../components/CGU";

const CguScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenContainer>
        <BackButtonTopbar rightIcon={<></>}>CGU</BackButtonTopbar>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 25,
            flex: 1,
          }}>
          <CGUText />
        </View>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default CguScreen;
