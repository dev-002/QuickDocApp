import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import DoctorAppointmentCard from "../../Components/DoctorAppointmentCard";
import axios from "axios";
import URL from "../../../test.api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppointmentListScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    async function fetchAppointment() {
      try {
        let profile = await AsyncStorage.getItem("loggedUser");
        profile = JSON.parse(profile);
        const response = await axios.post(URL.Profile.getAppointments, {
          id: profile._id,
        });
        console.log(response.data)
        if (response.status == 200) {
          setAppointments(response.data?.appointmentList);
        }
      } catch (err) {
        console.log("Error fetching appointments: ", err);
      }
    }
    fetchAppointment();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 px-1">
        {/* Title */}
        <View className="mb-2 p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
          <Text className="text-xl font-bold">Appointments</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-base text-blue-600">back</Text>
          </TouchableOpacity>
        </View>

        {/* Appointment List */}
        <View className="pt-1 flex-1">
          <DoctorAppointmentCard appointment_data={appointments} />
        </View>
      </SafeAreaView>
    </>
  );
}
