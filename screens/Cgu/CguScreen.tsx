import { ScreenContainer } from "components/Containers";
import { Loader } from "components/Loader";
import { Body3, Title3 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import { useCgu } from "queries/cgu";
import { ScrollView, View } from "react-native";
import { errorToast } from "utils/toast";

const CguScreen = () => {
  return (
    <ScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>CGU</BackButtonTopbar>
      <CguScrollView />
    </ScreenContainer>
  );
};

export const CguScrollView = () => {
  const { data, isLoading, error } = useCgu();

  if (error) errorToast("Erreur au chargement des CGU");

  if (isLoading || !data) return <Loader />;

  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <View style={{ gap: 40, paddingHorizontal: 20, paddingVertical: 20 }}>
        {data.sections.map((section, index) => (
          <View key={index} style={{ gap: 10 }}>
            <Title3>{section.title}</Title3>
            <Body3>{section.content}</Body3>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CguScreen;
