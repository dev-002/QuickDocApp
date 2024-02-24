import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function FooterMenu() {
  const navigation = useNavigation();
  return (
    <View className="fixed bottom-10 w-[80%] h-auto left-[10%] p-1 bg-background border border-black/50 rounded-full">
      <View className="flex flex-row justify-around items-center">
        <TouchableOpacity
          className="h-[40] w-[15%]"
          onPress={() =>
            navigation.navigate("AppointmentList", { completedStatus: true })
          }
        >
          <Animated.Image
            entering={FadeIn.springify().duration(1000).delay(100).damping(12)}
            source={require("../../assets/Icon/CheckUp.jpeg")}
            className="h-[40] w-[100%]"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="h-[40] w-[15%]"
          onPress={() =>
            navigation.navigate("AppointmentList", { completedStatus: false })
          }
        >
          <Animated.Image
            entering={FadeIn.springify().duration(1000).delay(100).damping(12)}
            source={require("../../assets/Icon/Clock.jpeg")}
            className="h-[40] w-[100%]"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="h-[40] w-[15%]"
          onPress={() => navigation.navigate("AmbulanceEmergency")}
        >
          <Animated.Image
            entering={FadeIn.springify().duration(1000).delay(100).damping(12)}
            source={require("../../assets/Icon/Ambulance.jpeg")}
            className="h-[40] w-[100%]"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
