import Svg, { SvgProps, Path } from "react-native-svg";
const ArrowUp = (props: SvgProps) => (
  <Svg width={13} height={6} viewBox="0 0 13 6" fill="none" {...props}>
    <Path d="M6.06885 0L12.131 6L0.00667 6L6.06885 0Z" fill={props.color} />
  </Svg>
);
export default ArrowUp;
