import Button from "components/Button";
import { ScreenContainer } from "components/Containers";
import { BackButtonTopbar } from "components/Topbar";
import ROUTES from "constants/routes";
import { useAuth } from "contexts/authContext";
import { useRouter } from "expo-router";
import { login } from "queries/auth/login";
import { register } from "queries/auth/register";
import { errorToast, successToast } from "utils/toast";

const accountRegister = {
  user_name: "insidepsbs-test",
  first_name: "Test",
  last_name: "InsidePSBS",
  sector: 1,
  email: "insidepsbs.test@gmail.com",
  phone: "0123456789",
  promotion_year: 2024,
  password: "TestPSBS2024",
  password_confirmation: "TestPSBS2024",
};

const accountLogin = {
  email: "insidepsbs.test@gmail.com",
  password: "TestPSBS2024",
};

const useTestAccount = () => {
  const router = useRouter();
  const { setToken } = useAuth();
  const handle_register = async () => {
    try {
      const res = await register(accountRegister);
      successToast(`Compte créé avec succès : ${JSON.stringify(res)}`);
    } catch (e) {
      const errorMessage = (await e.json()).errors;
      errorToast(
        "Erreur à la création de votre compte. Veuillez réessayer ultérieurement. Si le problème persiste, contactez un administrateur.",
      );
      if (e.status === 422) {
        console.error(errorMessage);
      } else throw e;
    }
  };

  const handle_login = async () => {
    try {
      const res = await login(accountLogin);
      successToast(
        `Vous avez été connecté avec succès : ${JSON.stringify(res)}`,
      );
      console.log(res.token);
      setToken(res.token);
      router.replace(ROUTES.home);
    } catch (e) {
      console.error(e);
    }
  };
  return { handle_register, handle_login };
};

const TestAccount = () => {
  const { handle_register, handle_login } = useTestAccount();
  const { setToken } = useAuth();
  return (
    <ScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>Test Account</BackButtonTopbar>
      <Button text="create dev account" onPress={handle_register} />
      <Button text="login with dev account" onPress={handle_login} />
      <Button
        text="setToken"
        onPress={() => {
          setToken("test");
        }}
      />
    </ScreenContainer>
  );
};

export default TestAccount;
