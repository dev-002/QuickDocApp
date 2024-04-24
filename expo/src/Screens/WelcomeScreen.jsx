import { View, Text, Image } from "react-native";
import React, { useContext, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";
import getScreen from "../utility/getScreen";
import { useFocusEffect } from "@react-navigation/native";

export default function WelcomeScreen({ navigation }) {
  // const [isLogged] = useContext(useLoggedIn);
  const isLogged = true;

  const ringValue = useSharedValue(0);
  const translateValue = useSharedValue(250);

  useFocusEffect(
    useCallback(() => {
      ringValue.value = 0;
      translateValue.value = 250;
      setTimeout(() => {
        ringValue.value = withTiming(90, {
          duration: 2000,
          easing: Easing.elastic(2),
          reduceMotion: ReduceMotion.Never,
        });

        translateValue.value = withTiming(0, {
          duration: 3000,
          easing: Easing.elastic(2.2),
          reduceMotion: ReduceMotion.System,
        });
      }, 500);
      setTimeout(
        async () => navigation.replace(isLogged ? await getScreen() : "Login"),
        5000
      );
    }, [])
  );

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-blue-700">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1 justify-center items-center">
        <Animated.View className="flex justify-center items-center text-5xl mb-10">
          <Animated.View
            className="absolute bg-white rounded-full"
            style={{ padding: ringValue }}
          />
          <Image
            source={require("../../assets/images/Welcome_Screen.png")}
            className="h-40 w-40"
          />
        </Animated.View>
        <View className="flex items-center justify-center space-y-2">
          <Text className="text-5xl font-bold text-white">QuickDoc</Text>
          <Animated.Text
            className="relative text-2xl font-medium text-white"
            style={{ top: translateValue }}
          >
            Appoint your Doctor
          </Animated.Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
