import { ScrollScreenContainer } from "components/Containers";
import { Topbar } from "components/Topbar";
import TEXT from "constants/text";

const MessagesScreen = () => {
  return (
    <ScrollScreenContainer>
      <Topbar>{TEXT.messages.title}</Topbar>
    </ScrollScreenContainer>
  );
};

export default MessagesScreen;
