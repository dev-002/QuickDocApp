import { View, Pressable, Text } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  withTiming,
  useSharedValue,
  Easing,
} from "react-native-reanimated";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const navigation = useNavigation();
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

  async function handleLogout() {
    await AsyncStorage.removeItem("token").catch((err) => console.log(err));
    await AsyncStorage.removeItem("loggedUser").catch((err) =>
      console.log(err)
    );

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  }

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
      <Pressable
        onPress={() => handleLogout()}
        className="relative bg-red-600 rounded-xl"
        style={{ left: 120 }}
      >
        <Text className="px-2 text-center text-lg text-white">Log out</Text>
      </Pressable>
    </View>
  );
}
