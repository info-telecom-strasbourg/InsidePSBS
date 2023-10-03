import Svg, { SvgProps, Path } from "react-native-svg";
const ChevronRight = (props: SvgProps) => (
  <Svg width={11} height={19} viewBox="0 0 11 19" fill="none" {...props}>
    <Path
      d="M10.4566 8.09404C10.9587 8.5961 10.9587 9.41145 10.4566 9.91352L2.74489 17.6252C2.24282 18.1273 1.42747 18.1273 0.925407 17.6252C0.423343 17.1232 0.423343 16.3078 0.925407 15.8057L7.72938 9.00177L0.929423 2.1978C0.427359 1.69573 0.427359 0.880382 0.929423 0.378318C1.43149 -0.123746 2.24684 -0.123746 2.7489 0.378318L10.4606 8.09002L10.4566 8.09404Z"
      fill={props.color}
    />
  </Svg>
);
export default ChevronRight;
