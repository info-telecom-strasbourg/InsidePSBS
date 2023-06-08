import Svg, { SvgProps, Path } from "react-native-svg";
const Clock = (props: SvgProps) => (
  <Svg width={19} height={18} viewBox="0 0 19 18" fill="none" {...props}>
    <Path
      d="M9.84784 18C4.87675 18 0.847839 13.9711 0.847839 9C0.847839 4.02891 4.87675 0 9.84784 0C14.8189 0 18.8478 4.02891 18.8478 9C18.8478 13.9711 14.8189 18 9.84784 18ZM9.00409 4.21875V9C9.00409 9.28125 9.14471 9.54492 9.38026 9.70312L12.7553 11.9531C13.142 12.2133 13.6658 12.1078 13.926 11.7176C14.1861 11.3273 14.0807 10.807 13.6904 10.5469L10.6916 8.55V4.21875C10.6916 3.75117 10.3154 3.375 9.84784 3.375C9.38026 3.375 9.00409 3.75117 9.00409 4.21875Z"
      fill={props.color}
    />
  </Svg>
);
export default Clock;