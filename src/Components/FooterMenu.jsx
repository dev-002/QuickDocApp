import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function FooterMenu() {
  return (
    <View className="fixed bottom-10 w-[80%] h-auto left-[10%] p-1 bg-background border border-black/50 rounded-full">
      <View className="flex flex-row justify-around items-center">
        <TouchableOpacity
          className="h-[40] w-[15%]"
          onPress={() => console.log("CheckUp")}
        >
          <Image
            source={require("../../assets/Icon/CheckUp.jpeg")}
            className="h-[40] w-[100%]"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="h-[40] w-[15%]"
          onPress={() => console.log("Clock")}
        >
          <Image
            source={require("../../assets/Icon/Clock.jpeg")}
            className="h-[40] w-[100%]"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="h-[40] w-[15%]"
          onPress={() => console.log("Ambulance")}
        >
          <Image
            source={require("../../assets/Icon/Ambulance.jpeg")}
            className="h-[40] w-[100%]"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
