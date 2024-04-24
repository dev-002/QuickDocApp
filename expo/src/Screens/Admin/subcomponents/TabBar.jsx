import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const TabBar = ({ activeTab, setActiveTab }) => {
  return (
    <View className="flex-row justify-between py-2">
      <TabButton
        label="All"
        isActive={activeTab === "all"}
        onPress={() => setActiveTab("all")}
      />
      <TabButton
        label="Pending"
        isActive={activeTab === "pending"}
        onPress={() => setActiveTab("pending")}
      />
      <TabButton
        label="Approved"
        isActive={activeTab === "approved"}
        onPress={() => setActiveTab("approved")}
      />
      <TabButton
        label="Rejected"
        isActive={activeTab === "rejected"}
        onPress={() => setActiveTab("rejected")}
      />
      <TabButton
        label="Completed"
        isActive={activeTab === "completed"}
        onPress={() => setActiveTab("completed")}
      />
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
