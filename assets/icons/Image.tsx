import { Image, ImageStyle } from "react-native";

interface ImageIconProps {
  height: number;
  width: number;
  style?: ImageStyle;
}

const ImageIcon = ({ height, width, style }: ImageIconProps) => (
  <Image
    style={{
      resizeMode: "cover",
      height,
      width,
      ...style,
    }}
    source={require("../../assets/images/media_physique_strasbourg_400.png")}
  />
);

export default ImageIcon;
