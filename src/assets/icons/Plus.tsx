import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Plus = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 29 29" fill="none" {...props}>
    <Path
      fill={props.color}
      d="M25.808 16.497a2.002 2.002 0 0 0 0-4.002l-9.307.004-.004-9.307a2.002 2.002 0 0 0-4.002 0l.004 9.307-9.307.004a2.002 2.002 0 0 0 0 4.003l9.307-.005.004 9.307a2.002 2.002 0 0 0 4.003 0l-.005-9.307 9.307-.004Z"
    />
  </Svg>
);
export default Plus;
