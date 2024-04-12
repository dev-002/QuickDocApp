import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { LinearGradient } from "expo-linear-gradient";

export default function FormScreen({ route }) {
  const { doctor: doc } = route.params;
  const navigation = useNavigation();

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1));

  const [dateModal, setDateModal] = useState(false);
  const [date, setDate] = useState();
  const [patient, setPatient] = useState({});

  function handleDateChange(propDate) {
    setDate(propDate);
  }

  useEffect(() => {
    async function fetchLoggedUser() {
      setPatient(await AsyncStorage.getItem("loggedUser"));
    }
    fetchLoggedUser();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 px-1">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/Icon/Back.jpeg")}
            className="absolute top-5 h-5 w-[10%]"
          />
        </TouchableOpacity>
        <View className="pt-1 flex-1">
          {/* Doctor Details */}
          <View className="flex justify-center items-center">
            <Image
              source={require("../../../assets/Icon/Doctor_Avatar.jpeg")}
              className="h-20 w-20 rounded-full"
            />

            <Text className="mx-auto my-2 text-2xl font-bold">{doc?.name}</Text>

            <Text className="p-2 bg-green-300 text-green-800 text-base font-bold rounded-xl">
              {doc?.specialization} Doctor
            </Text>
          </View>

          {/* Slot Details */}
          <View className="">
            {/* Date Select */}
            <Text className="my-1 text-lg font-bold">Select Date</Text>

            {!dateModal && (
              <TouchableOpacity
                className="w-1/2 mx-auto"
                onPress={() => setDateModal(true)}
              >
                <Text className="py-1 px-2 text-center text-xl text-white bg-black/70 rounded-2xl">
                  Open
                </Text>
              </TouchableOpacity>
            )}

            <Modal animationType="slide" transparent={true} visible={dateModal}>
              <View className="mt-20 flex-1 justify-center items-center">
                <View className="py-6 px-12 w-[90%] m-20 bg-white rounded-2xl align-center">
                  <DatePicker
                    mode="calendar"
                    selected={date}
                    minimumDate={startDate}
                    onDateChange={handleDateChange}
                  />
                  <TouchableOpacity
                    className="flex justify-center items-center"
                    onPress={() => setDateModal(false)}
                  >
                    <Text className="py-1 px-2 text-xl text-white bg-black/70 rounded-2xl">
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {/* Available Slots */}
            <Text className="my-1 text-lg font-bold">Available Slots</Text>

            <View className="flex flex-row flex-wrap justify-around">
              <View className="w-[45%] my-2 px-2 py-2 border border-black/50 rounded-xl">
                <Text className="text-center text-base">
                  10:00 AM - 12:00 PM
                </Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 border border-black/50 rounded-xl">
                <Text className="text-center text-base">
                  12:00 PM - 2:00 PM
                </Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 border border-black/50 rounded-xl">
                <Text className="text-center text-base">2:00 PM - 4:00 PM</Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 border border-black/50 rounded-xl">
                <Text className="text-center text-base">4:00 PM - 6:00 PM</Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 border border-black/50 rounded-xl">
                <Text className="text-center text-base">6:00 PM - 8:00 PM</Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 border border-black/50 rounded-xl">
                <Text className="text-center text-base">
                  9:00 PM - 11:00 PM
                </Text>
              </View>
            </View>
          </View>

          {/* Patient Details */}
          <View className="">
            {/* Patient Name */}
            <Text className="my-1 text-lg font-bold">Patient Name</Text>

            <View className="mx-5 my-1 px-2 py-2 border border-black/50 rounded-xl">
              <Text className="px-2 py-1">value={patient.name}</Text>
            </View>

            {/* Patient Gender */}
            <Text className="my-1 text-lg font-bold">Patient Gender</Text>
            <View className="flex flex-row justify-around">
              {patient.gender == 1 ? (
                <TouchableOpacity className="p-1 border border-black/60 rounded-xl">
                  <Image
                    source={require("../../../assets/Icon/Male.jpeg")}
                    className="p-2 h-10 w-10"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity className="p-1 border border-black/60 rounded-xl">
                  <Image
                    source={require("../../../assets/Icon/Female.jpeg")}
                    className="p-2 h-10 w-10"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <TouchableOpacity className="mt-5">
            <LinearGradient
              colors={["#46b3ff", "#0067af", "#35005b"]}
              className="p-2 align-center rounded-xl"
            >
              <Text className="py-1 px-2 text-lg self-center text-white">
                Book Now
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
