import type { TextProps as TextProperties } from "./Themed";
import { Text } from "./Themed";

export const MonoText = (properties: TextProperties) => {
  return (
    <Text
      {...properties}
      style={[properties.style, { fontFamily: "SpaceMono" }]}
    />
  );
};
