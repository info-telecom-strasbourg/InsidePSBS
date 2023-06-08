import Svg, { SvgProps, Path } from "react-native-svg";
const Cross = (props: SvgProps) => (
  <Svg width={19} height={18} viewBox="0 0 19 18" fill="none" {...props}>
    <Path
      d="M18.0359 3.07403C18.7387 2.37123 18.7387 1.22989 18.0359 0.527097C17.3332 -0.175699 16.1918 -0.175699 15.489 0.527097L9.56866 6.45307L3.64269 0.532719C2.9399 -0.170077 1.79856 -0.170077 1.09576 0.532719C0.392966 1.23551 0.392966 2.37685 1.09576 3.07965L7.02173 9L1.10138 14.926C0.398588 15.6288 0.398588 16.7701 1.10138 17.4729C1.80418 18.1757 2.94552 18.1757 3.64831 17.4729L9.56866 11.5469L15.4946 17.4673C16.1974 18.1701 17.3388 18.1701 18.0416 17.4673C18.7444 16.7645 18.7444 15.6231 18.0416 14.9203L12.1156 9L18.0359 3.07403Z"
      fill={props.color}
    />
  </Svg>
);
export default Cross;
