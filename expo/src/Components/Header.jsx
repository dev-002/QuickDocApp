import { View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  withTiming,
  useSharedValue,
  Easing,
} from "react-native-reanimated";

export default function Header() {
  const logoX = useSharedValue(100);
  const TextX = useSharedValue(300);

  useEffect(() => {
    logoX.value = 100;
    TextX.value = 300;
    setTimeout(() => {
      logoX.value = withTiming(0, { duration: 700, easing: Easing.linear });
      TextX.value = withTiming(0, { duration: 700, easing: Easing.linear });
    }, 500);
  }, []);

  return (
    <View className="p-2 flex flex-row bg-background border-b-4 border-b-black/50">
      <Animated.Image
        source={require("../../assets/Icon/Doctor_Stethoscope.jpeg")}
        className="relative h-10 w-10"
        style={{ right: logoX }}
      />
      <Animated.Text
        className="relative ml-3 self-end font-bold text-3xl"
        style={{ left: TextX }}
      >
        QuickDoc
      </Animated.Text>
    </View>
  );
}
