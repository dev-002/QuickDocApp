import axios from "axios";
import React from "react";
import { Alert, Text, TouchableOpacity } from "react-native";

export default function AppointmentCard2({ appointment }) {
  function formatDate(date) {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
  }

  function getStatus(status) {
    switch (status) {
      case "pending":
        return <Text className="text-orange-500">Pending</Text>;
      case "approved":
        return <Text className="text-green-500">Approved</Text>;
      case "rejected":
        return <Text className="text-red-500">Rejected</Text>;
      case "completed":
        return <Text className="text-grey-500">Completed</Text>;
      case "canceled":
        return <Text className="text-red-500">Completed</Text>;
    }
  }

  function getSlot(slot) {
    switch (slot) {
      case "10-12":
        return <Text className="text-orange-500">10 AM - 12 PM</Text>;
      case "12-14":
        return <Text className="text-green-500">12 PM - 2 PM</Text>;
      case "15-17":
        return <Text className="text-red-500">3 PM - 5 PM</Text>;
      case "17-19":
        return <Text className="text-grey-500">5 PM - 7 PM</Text>;
      case "21-23":
        return <Text className="text-orange-500">9 PM - 11 PM</Text>;
    }
  }

  async function cancelApp(_id) {
    try {
      setLoading(true);
      const response = await axios.put(
        URL.Patient.cancelApp,
        { status: "canceled" },
        {
          patientId: appointment?.patientId,
        }
      );
      if (response.status === 200) {
        setLoading(false);
        Alert.alert("Appointment Canceled");
      }
    } catch (err) {
      console.log("Error while canceling Appointment", err);
      Alert.alert("Error while canceling Appointment");
      setLoading(false);
    }
  }
  return (
    <>
      <View className="my-2 mx-auto w-[80%] p-1 px-2 border-2 border-black/40 rounded-lg">
        <Text className="text-lg" numberOfLines={1}>
          Date: {formatDate(appointment?.date)}
        </Text>

        <Text className="text-lg">Doctor: {appointment?.doctorId?.name}</Text>

        <Text className="text-lg">
          Patient gender:{" "}
          {appointment?.doctorId?.gender === 1 ? "Male" : "Female"}
        </Text>

        <Text className="text-lg">
          Slot: {appointment?.timeSlot} {getSlot(appointment?.timeSlot)}
        </Text>

        <Text className="text-lg">
          Status: {getStatus(appointment?.status)}
        </Text>

        <Text className="text-lg" numberOfLines={2}>
          Reason: {appointment?.reason}
        </Text>
        <TouchableOpacity
          onPress={() => cancelApp(appointment._id)}
          className="border border-red-500 relative right-8"
        >
          <Text className="text-lg text-red-300">Cancel</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
