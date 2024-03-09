import { View, Text, Image, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

// Custom Components
import Header from "../../Components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DoctorHomeScreen() {
  const [profile, setProfile] = useState({});
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  useEffect(() => {
    let dat = new Date();
    setTime([dat.getHours(), dat.getMinutes()]);
    setDate([dat.getDate(), dat.getMonth(), dat.getFullYear()]);

    (async function () {
      let user = await AsyncStorage.getItem("loggedUser").catch((err) =>
        console.log(err)
      );
      user = JSON.parse(user);
      setProfile({
        ...user,
      });
    })();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 bg-background">
        <Header />
        <ScrollView showsVerticalScrollIndicator={false} className="px-2">
          {/* Doctor Home Page */}
          <View className="my-3 flex flex-row">
            {/* Doctor Avatar */}
            <View className="w-1/3 mx-auto">
              <Image
                source={require("../../../assets/Icon/Doctor_Avatar.jpeg")}
                className="h-20 w-20"
              />
            </View>

            {/* Todays Info */}
            <View className="w-2/3 mx-auto">
              <View className="mb-1 flex flex-row">
                <View>
                  <Text className="text-xl font-bold">Today:</Text>

                  <Text className="text-xl">
                    {date[0] + " /" + date[1] + " /" + date[2]}
                  </Text>
                </View>

                <View className="ml-5">
                  <Text className="text-xl font-bold">Time:</Text>

                  <Text className="text-xl">
                    {time[0] + ": " + time[1]} {time[0] < 12 ? "a.m." : "p.m."}
                  </Text>
                </View>
              </View>
              <Text className="text-xl">
                Welcome Dr. {profile && profile?.fullName?.split(" ")[0]}
              </Text>
            </View>
          </View>

          {/* Today's Appointment */}
          <View className="my-1">
            <Text className="font-bold text-xl">Today's Appointments:</Text>

            <View className="flex flex-row flex-wrap justify-around">
              <View className="w-[45%] my-2 px-2 py-2 bg-green-300 border border-black/50 rounded-xl">
                <Text className="text-center text-base">
                  10:00 AM - 12:00 PM
                </Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 bg-neutral-300 border border-black/50 rounded-xl">
                <Text className="text-center text-base">
                  12:00 PM - 2:00 PM
                </Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 bg-neutral-300 border border-black/50 rounded-xl">
                <Text className="text-center text-base">2:00 PM - 4:00 PM</Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 bg-orange-300 border border-black/50 rounded-xl">
                <Text className="text-center text-base">4:00 PM - 6:00 PM</Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 bg-orange-300 border border-black/50 rounded-xl">
                <Text className="text-center text-base">6:00 PM - 8:00 PM</Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 bg-orange-300 border border-black/50 rounded-xl">
                <Text className="text-center text-base">
                  9:00 PM - 11:00 PM
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <DoctorFooterMenu />
      </SafeAreaView>
    </>
  );
}

function DoctorFooterMenu({ navigation }) {
  return (
    <View className="fixed bottom-10 w-[80%] h-auto left-[10%] p-1 bg-background border border-black/50 rounded-full">
      <View className="flex flex-row justify-around items-center">
        <Pressable
          className="h-[40] w-[15%]"
          onPress={() => navigation.navigate("AppointmentList")}
        >
          <Image
            source={require("../../../assets/Icon/CheckUp.jpeg")}
            className="h-[40] w-[100%]"
          />
        </Pressable>
        <Pressable
          className="h-[40] w-[15%]"
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            source={require("../../../assets/Icon/profile.png")}
            className="h-[40] w-[80%]"
          />
        </Pressable>
        <Pressable
          className="h-[40] w-[15%]"
          onPress={() => navigation.navigate("AmbulanceEmergency")}
        >
          <Image
            source={require("../../../assets/Icon/Ambulance.jpeg")}
            className="h-[44] w-[100%]"
          />
        </Pressable>
      </View>
    </View>
  );
}
