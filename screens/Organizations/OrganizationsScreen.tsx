import { ScrollScreenContainer } from "components/Containers";
import { Title3 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import TEXT from "constants/text";
import { View } from "react-native";

import { useTheme } from "../../contexts/themeContext";

const OrganizationsScreen = () => {
  const url = "https://fouaille.bde-tps.fr/api/organization";

  //   const { res, isLoading, error } = useFetch(url);
  const { theme } = useTheme();

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{TEXT.organizations.title}</BackButtonTopbar>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <View style={{ paddingHorizontal: 11 }}>
        <View style={{ paddingVertical: 30 }}>
          <Title3>{TEXT.organizations.associations}</Title3>
          <View style={{ height: 20 }} />
          {/* {res?.data.associations.map((association, index) => (
            <OrganizationButton key={index} data={association} />
          ))} */}
        </View>
        <View style={{ paddingVertical: 30 }}>
          <Title3>{TEXT.organizations.clubs}</Title3>
          <View style={{ height: 20 }} />
          {/* {res?.data.clubs.map((association, index) => (
            <OrganizationButton key={index} data={association} />
          ))} */}
        </View>
      </View>
      {/* )} */}
    </ScrollScreenContainer>
  );
};

export default OrganizationsScreen;
