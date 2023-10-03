import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Error = (props: SvgProps) => (
  <Svg height={24} viewBox="0 0 512 512" width={24} fill="none" {...props}>
    <Path
      d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24v112c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm-32 224a32 32 0 1 1 64 0 32 32 0 1 1-64 0z"
      fill={props.color}
    />
  </Svg>
);
export default Error;
