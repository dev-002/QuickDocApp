import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const AppointmentList = () => {
  // Fetch appointments from your backend (e.g., Firebase, Express.js, MongoDB)
  const appointments = [
    { id: 1, patientName: "John Doe", time: "10:00 AM" },
    { id: 2, patientName: "Jane Smith", time: "11:30 AM" },
    // ...more appointments
  ];

  return (
    <SafeAreaView className="flex-1 px-2">
      <StatusBar style="dark" />
      {/* Nav View */}
      <View className="mb-2 p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
        <Text className="text-xl font-bold">Appointments</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-base text-blue-600">back</Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* Appointments */}
        {appointments.map((appointment) => (
          <View
            key={appointment.id}
            className="my-2 p-2 border border-black/40 rounded-lg shadow-lg"
          >
            <Text>Patient: {appointment.patientName}</Text>
            <Text>Time: {appointment.time}</Text>
          </View>
        ))}
        <Text>Total Appointments: {appointments.length}</Text>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentList;
