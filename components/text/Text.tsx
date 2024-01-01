import { useTheme } from "contexts/themeContext";
import { PropsWithChildren } from "react";
import { Text as DefaultText, TextStyle } from "react-native";

type TextPropsType = PropsWithChildren<{ style?: TextStyle }>;

const Text = ({ children, style }: TextPropsType) => {
  const { theme } = useTheme();
  return (
    <DefaultText style={{ color: theme.text, ...style }}>
      {children}
    </DefaultText>
  );
};

export const createTextComponent = (componentStyle: TextStyle) => {
  return ({ children, style }: TextPropsType) => {
    return (
      <Text
        style={{
          ...componentStyle,
          ...style,
        }}>
        {children}
      </Text>
    );
  };
};

export default Text;
