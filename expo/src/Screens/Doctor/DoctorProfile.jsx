import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, Image, ScrollView } from "react-native";

export default function DoctorProfile({ navigation }) {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 px-1 bg-background">
        {/* Title */}
        <View className="p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
          <Text className="text-xl font-bold">Profile</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text className="text-base text-blue-600">back</Text>
          </Pressable>
        </View>

        {/* Detials */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="flex-1 px-1"
        >
          <View className="pt-1 flex-1">
            <Text>Profile</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
