import * as React from "react";
import {Image, ImageSourcePropType, StyleProp, ViewStyle} from 'react-native';

interface ImageIconProps {
  height: number;
  width: number;
  style?: any;
}

const ImageIcon = ({height, width, style}: ImageIconProps) => (
  <Image
    style={
      {
      resizeMode: 'cover',
        height: height,
        width: width, 
        ...style,
      }
    }
    source={require('../../assets/images/media_physique_strasbourg_400.png')}
  />
);

export default ImageIcon;
