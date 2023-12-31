import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";

import { COLORS } from "../constants";
import { useTheme } from "../contexts";

const ProgressBar = ({ step, steps }) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  const { theme } = useTheme();

  return (
    <View style={{ overflow: "hidden", backgroundColor: theme.box }}>
      <Animated.View
        style={{
          width: "100%",
          height: 2,
          transform: [
            {
              translateX: animatedValue,
            },
          ],
        }}
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}>
        <LinearGradient
          colors={COLORS.primaryGradient}
          style={{ width: "100%", height: "100%" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
    </View>
  );
};

export default ProgressBar;
