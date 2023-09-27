import Svg, { SvgProps, Path } from "react-native-svg";
const Camera = (props: SvgProps) => (
  <Svg height={24} width={24} viewBox="0 0 512 512" fill="none" {...props}>
    <Path
      d="M149.1 64.8 138.7 96H64c-35.3 0-64 28.7-64 64v256c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64h-74.7l-10.4-31.2C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
      fill={props.color}
    />
  </Svg>
);
export default Camera;
