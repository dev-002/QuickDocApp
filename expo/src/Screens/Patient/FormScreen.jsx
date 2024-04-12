import React, { useState, useEffect } from "react";
import { View, Text, Image, Modal, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { LinearGradient } from "expo-linear-gradient";
import URL from "../../../test.api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FormScreen({ route }) {
  const { doctor: doc } = route.params;
  const navigation = useNavigation();

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1));

  const [dateModal, setDateModal] = useState(false);
  const [date, setDate] = useState();
  const [patient, setPatient] = useState({});
  const [timeSlot, setTimeSlot] = useState("");
  const [reason, setReason ] = useState("");

  function handleDateChange(propDate) {
    setDate(propDate);
  }

  async function handleSubmit() {
    try {
      const response = await axios.post(URL.Appointment.appointmentReqest, {
        patientId: patient._id, doctorId: doc._id, date, timeSlot, reason
      });
      console.log(response.data);
      if (response.status == 201) {
        navigation.replace("Appointments");
      }
    } catch (err) {
      console.log("Error in Appointment Submit: ", err);
    }
  }

  useEffect(() => {
    async function fetchLoggedUser() {
      let user = await AsyncStorage.getItem("loggedUser");
      user = await JSON.parse(user);
      setPatient(user);
    }
    fetchLoggedUser();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 px-1">
        <TouchableOpacity onPress={() => navigation?.goBack()}>
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
            {date && <Text className="text-center">{date}</Text>}

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
                <Text className="text-center text-base" onPress={()=>setTimeSlot("1")}>
                  10:00 AM - 12:00 PM
                </Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 border border-black/50 rounded-xl">
                <Text className="text-center text-base" onPress={()=>setTimeSlot("2")}>
                  12:00 PM - 2:00 PM
                </Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 border border-black/50 rounded-xl">
                <Text className="text-center text-base" onPress={()=>setTimeSlot("3")}>2:00 PM - 4:00 PM</Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 border border-black/50 rounded-xl">
                <Text className="text-center text-base" onPress={()=>setTimeSlot("4")}>4:00 PM - 6:00 PM</Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 border border-black/50 rounded-xl">
                <Text className="text-center text-base" onPress={()=>setTimeSlot("5")}>6:00 PM - 8:00 PM</Text>
              </View>
              <View className="w-[45%] my-2 px-2 py-2 border border-black/50 rounded-xl">
                <Text className="text-center text-base" onPress={()=>setTimeSlot("6")}>
                  9:00 PM - 11:00 PM
                </Text>
              </View>
            </View>
          </View>

          <View className="m-1">
            <Text className="text-lg font-bold">Reason: </Text>
            <TextInput placeholder="Enter reason"
            value={reason}
            onChangeText={(text)=>setReason(text)}
            className=""
            />
          </View>

          {/* Patient Details */}
          <View className="mt-2">
            <View className="flex flex-row justify-around">
              <Text className="my-1 font-bold">Patient Name</Text>
              <Text className="px-2 text-lg py-1">{patient.name}</Text>

              <Text className="my-1 font-bold">Patient Gender</Text>
              {patient.gender == 1 ? (
                <Image
                  source={require("../../../assets/Icon/Male.jpeg")}
                  className="p-2 h-10 w-10"
                />
              ) : (
                <Image
                  source={require("../../../assets/Icon/Female.jpeg")}
                  className="p-2 h-10 w-10"
                />
              )}
            </View>
          </View>

          <TouchableOpacity className="mt-5">
            <LinearGradient
              colors={["#46b3ff", "#0067af", "#35005b"]}
              className="p-2 align-center rounded-xl"
            >
              <Text
                className="py-1 px-2 text-lg self-center text-white"
                onPress={() => handleSubmit()}
              >
                Book Now
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
