import { TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

export default function CategoryList({ data, activeSpec, setActiveSpec }) {
  function handlePress(data) {
    if (activeSpec === data) {
      setActiveSpec("all");
    } else setActiveSpec(data);
  }
  return data?.map((d, index) => (
    <TouchableOpacity
      className="mx-1"
      key={index}
      onPress={() => handlePress(d)}
    >
      <LinearGradient
        colors={["#46b3ff", "#0067af", "#49007d"]}
        className="p-5 align-center rounded-xl"
      >
        <Text className="py-1 px-2 font-bold text-sm self-center text-white">
          {d}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  ));
}
