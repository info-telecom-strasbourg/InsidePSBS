import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const ChevronUp = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 17 10" fill="none" {...props}>
    <Path
      fill={props.color}
      d="M9.486.331a1.127 1.127 0 0 0-1.593 0l-6.75 6.75a1.127 1.127 0 0 0 1.593 1.593L8.69 2.718l5.955 5.952a1.127 1.127 0 0 0 1.593-1.592L9.489.328 9.486.33Z"
    />
  </Svg>
);
export default ChevronUp;
