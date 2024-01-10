import FONTS from "constants/fonts";
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

export const Body1 = createTextComponent({
  fontSize: 18,
  fontFamily: FONTS.OpenSans.regular,
  lineHeight: 25,
});

export const Body2 = createTextComponent({
  fontSize: 16,
  fontFamily: FONTS.OpenSans.regular,
  lineHeight: 22,
});

export const Body3 = createTextComponent({
  fontSize: 15,
  fontFamily: FONTS.OpenSans.regular,
  lineHeight: 20,
});

export const Title1 = createTextComponent({
  fontSize: 30,
  fontFamily: FONTS.OpenSans.bold,
  lineHeight: 41,
});

export const Title2 = createTextComponent({
  fontSize: 25,
  fontFamily: FONTS.OpenSans.bold,
  lineHeight: 34,
});

export const Title3 = createTextComponent({
  fontSize: 20,
  fontFamily: FONTS.OpenSans.bold,
  lineHeight: 27,
});

export const Title4 = createTextComponent({
  fontSize: 20,
  fontFamily: FONTS.OpenSans.semiBold,
  lineHeight: 27,
});

export default Text;
