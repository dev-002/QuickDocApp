import React, { useState } from "react";
import { View, Text } from "react-native";
import { Alert } from "react-native";
import SelectDropDown from "react-native-select-dropdown";
import URL from "../../../../test.api";
import axios from "axios";

export default function AppointmentCard({ app, index }) {
  const [status, setStatus] = useState(() =>
    app.status == "pending"
      ? 1
      : app.status == "approved"
      ? 2
      : app.status == "rejected"
      ? 3
      : 4
  );
  //1- pending 2- approved 3- rejected 4- completed

  async function statusUpdate(status) {
    try {
      const response = await axios.post(URL.Appointment.statusChange, {
        appointment_id: app?._id,
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
  return (
    <View className="mx-auto w-[80%] p-1 px-2 rounded-xl border">
      <Text className="text-lg ">Appointment {index + 1}</Text>
      <Text className="text-lg">Patient Name: {app.patientId?.name}</Text>
      <Text className="text-lg">
        Patient gender: {app.patientId?.gender === 1 ? "Male" : "Female"}
      </Text>
      <Text className="text-lg">Reason: {app.reason}</Text>
      <View>
        <Text className="justify-center text-lg">Status: </Text>
        <SelectDropDown
          data={["pending", "approved", "rejected", "completed"]}
          onSelect={(selectedItem, index) => {
            statusUpdate(selectedItem);
            setStatus(index + 1);
          }}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          defaultButtonText={
            status == 1
              ? "pending"
              : status == 2
              ? "approved"
              : status == 3
              ? "rejected"
              : "completed"
          }
          buttonTextStyle={{
            color:
              status === 1
                ? "orange"
                : status === 2
                ? "green"
                : status === 3
                ? "red"
                : "black",
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
        {/* <Text
          className={
            app.status === "pending"
              ? "text-orange-500"
              : app.status === "rejected"
              ? "text-red-500"
              : "text-green-500"
          }
        >
          {" "}
          {app.status}
        </Text> */}
      </View>
    </View>
  );
}
