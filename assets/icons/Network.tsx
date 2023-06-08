import Svg, { SvgProps, Path } from "react-native-svg";
const Network = (props: SvgProps) => (
  <Svg width={13} height={18} viewBox="0 0 13 18" fill="none" {...props}>
    <Path
      d="M7.86365 1.52447C9.72585 3.46544 10.8707 6.0984 10.8707 9.00141C10.8707 11.9044 9.72585 14.5374 7.86364 16.4783C7.52046 16.8384 7.53171 17.4066 7.88896 17.7498C8.24621 18.093 8.81725 18.0817 9.16043 17.7245C11.3349 15.4629 12.6711 12.3883 12.6711 9.00141C12.6711 5.61456 11.3349 2.53996 9.16325 0.275501C8.81725 -0.0817496 8.24903 -0.0930016 7.88896 0.250184C7.5289 0.593369 7.51765 1.16441 7.86365 1.52166L7.86365 1.52447ZM6.36995 9.00141C6.36995 10.5992 5.7764 12.0563 4.79467 13.1703C4.46555 13.5444 4.50212 14.1126 4.87343 14.4417C5.24475 14.7709 5.81579 14.7343 6.14491 14.363C7.40513 12.934 8.17026 11.0549 8.17026 9.00141C8.17026 6.94792 7.40513 5.06884 6.14491 3.64265C5.81579 3.26853 5.24756 3.23477 4.87343 3.56389C4.4993 3.89301 4.46555 4.46123 4.79467 4.83536C5.7764 5.9465 6.36995 7.40363 6.36995 9.00422L6.36995 9.00141ZM1.86916 10.8017C2.34663 10.8017 2.80455 10.612 3.14217 10.2744C3.4798 9.9368 3.66947 9.47888 3.66947 9.00141C3.66947 8.52393 3.4798 8.06602 3.14217 7.72839C2.80455 7.39077 2.34663 7.20109 1.86916 7.20109C1.39168 7.20109 0.933765 7.39077 0.596141 7.72839C0.258516 8.06602 0.0688397 8.52393 0.0688396 9.00141C0.0688396 9.47888 0.258516 9.9368 0.59614 10.2744C0.933765 10.612 1.39168 10.8017 1.86916 10.8017Z"
      fill={props.color}
    />
  </Svg>
);
export default Network;
