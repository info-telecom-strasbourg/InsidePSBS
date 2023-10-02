import { Text, TextProps as TextProperties } from "./Themed";

export function MonoText(properties: TextProperties) {
  return (
    <Text
      {...properties}
      style={[properties.style, { fontFamily: "SpaceMono" }]}
    />
  );
}
