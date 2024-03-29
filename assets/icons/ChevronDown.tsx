import Svg, { SvgProps, Path } from "react-native-svg";
const ChevronDown = (props: SvgProps) => (
  <Svg width={17} height={10} viewBox="0 0 17 10" fill="none" {...props}>
    <Path
      d="M7.89646 8.67217C8.33591 9.11162 9.04959 9.11162 9.48904 8.67217L16.239 1.92217C16.6785 1.48271 16.6785 0.769043 16.239 0.32959C15.7996 -0.109863 15.0859 -0.109863 14.6465 0.32959L8.69099 6.28506L2.73552 0.333105C2.29607 -0.106348 1.5824 -0.106348 1.14294 0.333105C0.703491 0.772558 0.703491 1.48623 1.14294 1.92568L7.89294 8.67568L7.89646 8.67217Z"
      fill={props.color}
    />
  </Svg>
);
export default ChevronDown;
