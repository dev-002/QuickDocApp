import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const TabBar = ({ data, activeTab, setActiveTab }) => {
  return (
    <View className="flex-row justify-between py-2">
      {data &&
        data.map((d) => (
          <TabButton
            key={d}
            label={d}
            isActive={activeTab === d}
            onPress={() => setActiveTab(d)}
          />
        ))}
    </View>
  );
};

const TabButton = ({ label, isActive, onPress }) => {
  return (
    <TouchableOpacity className="flex-1 items-cente" onPress={onPress}>
      <Text
        className={`text-center text-gray-800 py-2 ${
          isActive ? "border-b-2 border-blue-500" : ""
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TabBar;
