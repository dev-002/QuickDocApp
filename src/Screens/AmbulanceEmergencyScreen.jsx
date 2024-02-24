import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function AmbulanceEmergencyScreen({ navigation }) {
  const [countDown, setCountDown] = useState({ time: 10, cancel: false });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!countDown.cancel && countDown.time > 0) {
        setCountDown((prevData) => ({ ...prevData, time: prevData.time - 1 }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  function handleCancelAmbulace() {
    setCountDown((prevData) => ({ ...prevData, cancel: true }));
  }
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 px-1 bg-background">
        {/* Title */}
        <View className="mb-2 p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
          <Text className="text-3xl font-bold">Emergency</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-base text-blue-600">back</Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View className="mt-5 flex-1 items-center">
          <Image
            source={require("../../assets/images/Ambulance_Emergency.png")}
            className="h-[40%] w-[80%]"
          />

          {countDown.time > 0 ? (
            <Animated.View
              exiting={FadeOut.duration(1000).damping(12).springify()}
            >
              <View className="flex flex-row justify-center">
                <Text className="text-2xl">Time: {countDown.time}</Text>
                {countDown.cancel && (
                  <Text className="mx-2 p-2 bg-red-200 text-base text-red-700 text-bold rounded-xl">
                    {countDown.cancel && "canceled"}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                className="w-full"
                onPress={() => handleCancelAmbulace()}
              >
                <View
                  className={
                    (countDown.cancel ? "bg-black/40" : "bg-red-500") +
                    " mx-auto my-2 flex justify-center items-center rounded-full"
                  }
                >
                  <Text className="p-2 text-lg text-white text-center font-bold">
                    Cancel the Ambulance
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View
              entering={FadeIn.delay(500).duration(2000).damping(8).springify()}
              className="w-full"
            >
              <View className="my-2 flex justify-center items-center mx-auto bg-blue-500 rounded-full">
                <Text className="p-4 text-xl text-white text-center font-bold">
                  Ambulance is on the way...
                </Text>
              </View>
            </Animated.View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
