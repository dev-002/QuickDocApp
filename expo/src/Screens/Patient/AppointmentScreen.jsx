import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppointmentScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <View>
        <Text className="text-3xl">AppointmentScreen</Text>
        <Button
          title="Back to Home"
          onPress={() => navigation.goBack()}
          className="my-5 w-1/2 mx-auto rounded-3xl"
        />
      </View>
    </SafeAreaView>
  );
}
