import Svg, { SvgProps, Path } from "react-native-svg";
const Shirt = (props: SvgProps) => (
  <Svg width={24} height={18} viewBox="0 0 24 18" fill="none" {...props}>
    <Path
      d="M8.11734 0C8.39156 0 8.62008 0.200391 8.70445 0.464062C9.13687 1.82461 10.413 2.8125 11.9212 2.8125C13.4295 2.8125 14.7056 1.82461 15.138 0.464062C15.2224 0.200391 15.4509 0 15.7252 0H16.1681C16.9591 0 17.722 0.277734 18.3302 0.783984L22.767 4.47891C22.999 4.67227 23.1431 4.95352 23.1677 5.25586C23.1923 5.5582 23.0939 5.85703 22.8935 6.08555L20.9248 8.33555C20.524 8.79609 19.8279 8.84883 19.3568 8.45859L17.5462 6.95039V15.75C17.5462 16.991 16.5373 18 15.2962 18H8.54625C7.30523 18 6.29625 16.991 6.29625 15.75V6.95039L4.4857 8.45859C4.01812 8.84883 3.32203 8.79609 2.91773 8.33555L0.948983 6.08555C0.748592 5.85703 0.650154 5.5582 0.674764 5.25586C0.699373 4.95352 0.843514 4.67227 1.07555 4.47891L5.51226 0.783984C6.12047 0.277734 6.88336 0 7.67437 0H8.11734Z"
      fill="black"
    />
  </Svg>
);
export default Shirt;
