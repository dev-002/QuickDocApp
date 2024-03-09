import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import DoctorAppointmentCard from "../../Components/DoctorAppointmentCard";

export default function AppointmentListScreen({ navigation }) {
  const appointment_data = [
    { id: 1, name: "Doctor 1", appointmentTime: "8:10 PM", status: true },
    { id: 2, name: "Doctor 2", appointmentTime: "5:40 PM", status: false },
    { id: 3, name: "Doctor 3", appointmentTime: "11:10 AM", status: false },
    { id: 4, name: "Doctor 2", appointmentTime: "9:20 AM", status: true },
  ];
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
          <DoctorAppointmentCard appointment_data={appointment_data} />
        </View>
      </SafeAreaView>
    </>
  );
}
