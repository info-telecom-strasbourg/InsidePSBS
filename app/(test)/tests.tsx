import Button from "components/Button";
import { ScreenContainer } from "components/Containers";
import { TextInput } from "components/Inputs";
import { BackButtonTopbar } from "components/Topbar";
import ROUTES from "constants/routes";
import { useRouter } from "expo-router";

const TestPage = () => {
  const router = useRouter();
  return (
    <ScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>Tests</BackButtonTopbar>
      <Button
        text="dev account"
        onPress={() => router.push(ROUTES.test_account)}
      />
      <TextInput />
      <Button
        text="Submit"
        onPress={(e) => {
          console.log(e.target);
        }}
      />
    </ScreenContainer>
  );
};

export default TestPage;
