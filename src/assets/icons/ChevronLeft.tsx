import Svg, { SvgProps, Path } from "react-native-svg";
const ChevronLeft = (props: SvgProps) => (
  <Svg width={11} height={19} viewBox="0 0 11 19" fill="none" {...props}>
    <Path
      d="M0.925407 8.09404C0.423343 8.5961 0.423343 9.41145 0.925407 9.91352L8.63711 17.6252C9.13917 18.1273 9.95453 18.1273 10.4566 17.6252C10.9587 17.1232 10.9587 16.3078 10.4566 15.8057L3.65262 9.00177L10.4526 2.1978C10.9546 1.69573 10.9546 0.880382 10.4526 0.378318C9.95051 -0.123746 9.13516 -0.123746 8.63309 0.378318L0.92139 8.09002L0.925407 8.09404Z"
      fill={props.color}
    />
  </Svg>
);
export default ChevronLeft;
