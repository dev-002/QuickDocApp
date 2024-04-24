import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import SelectDropDown from "react-native-select-dropdown";
import URL from "../../../../test.api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function AppointmentCard2({ appointment }) {
  const navigation = useNavigation();
  const [status, setStatus] = useState(appointment?.status);

  async function statusUpdate(status) {
    try {
      const response = await axios.post(URL.Appointment.statusChange, {
        appointment_id: appointment?._id,
        status,
        approved: false,
      });
      if (response.status == 200) {
        Alert.alert("Status Update Successfull");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  function handlePress(id) {
    navigation.navigate("DoctorPatientRecord", { id });
  }

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
    }
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => handlePress(appointment?.patientId?._id)}
        className="my-2 mx-auto w-[80%] p-1 px-2 border-2 border-black/40 rounded-lg"
      >
        <Text className="text-lg" numberOfLines={1}>
          Date: {formatDate(appointment?.date)}
        </Text>
        <Text className="text-lg">Patient: {appointment?.patientId?.name}</Text>
        <Text className="text-lg">
          Patient gender:{" "}
          {appointment?.patientId?.gender === 1 ? "Male" : "Female"}
        </Text>
        <Text className="text-lg">Doctor: {appointment?.doctorId?.name}</Text>
        <Text className="text-lg">
          Status: {getStatus(appointment?.status)}
        </Text>
        <Text className="text-lg" numberOfLines={2}>
          Reason: {appointment?.reason}
        </Text>

        <View>
          <Text className="justify-center text-lg">Status: </Text>
          <SelectDropDown
            data={["pending", "approved", "rejected", "completed"]}
            onSelect={(selectedItem) => {
              statusUpdate(selectedItem);
              setStatus(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
            defaultButtonText={status}
            buttonTextStyle={{
              fontWeight: 400,
            }}
            buttonStyle={{
              width: "100%",
              backgroundColor: "#f3fbfe",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "black",
              borderRadius: 10,
            }}
            dropdownStyle={{
              borderRadius: 10,
            }}
            selectedRowStyle={{
              backgroundColor: "skyblue",
              borderRadius: 10,
            }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}
