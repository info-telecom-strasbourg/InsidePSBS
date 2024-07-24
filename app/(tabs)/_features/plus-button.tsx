import Animated, {
  type SharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from "react-native-svg";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export const PlusButton = ({ rotation }: { rotation: SharedValue<number> }) => {
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withSpring(`${rotation.value}deg`),
      },
    ],
  }));

  return (
    <AnimatedSvg
      width={56}
      height={56}
      viewBox="0 0 56 56"
      fill="none"
      style={animatedStyles}
    >
      <Rect width={56} height={56} rx={28} fill="url(#a)" />
      <Path
        d="M16.333 28h23.334M28 16.333v23.333"
        stroke="#fff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={0}
          y1={0}
          x2={63.751}
          y2={10.974}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E03860" />
          <Stop offset={1} stopColor="#F78115" />
        </LinearGradient>
      </Defs>
    </AnimatedSvg>
  );
};
