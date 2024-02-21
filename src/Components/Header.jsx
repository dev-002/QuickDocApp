import { View, Text, Image } from "react-native";
import React from "react";

export default function Header() {
  return (
    <View className="p-2 flex flex-row bg-background border-b-4 border-b-black/50">
      <Image
        source={require("../../assets/Icon/Doctor_Stethoscope.jpeg")}
        className="h-10 w-10"
      />
      <Text className="ml-3 self-end font-bold text-3xl">QuickDoc</Text>
    </View>
  );
}
