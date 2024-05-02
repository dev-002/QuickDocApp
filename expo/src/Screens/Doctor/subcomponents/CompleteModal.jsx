import axios from "axios";
import React, { useState } from "react";
import { Modal, TextInput, Text, View, Pressable, Alert } from "react-native";
import URL from "../../../../test.api";

export default function CompleteModal({
  patient_id,
  patientName,
  doctor_id,
  appointment_id,
  completeModal,
  setCompleteModal,
}) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState("");

  async function completeAppointment() {
    try {
      setLoading(true);
      const response = await axios.post(
        URL.Doctor.completeAppointment,
        {
          status: "completed",
          record: {
            patinetId: patient_id,
            appointmentId: appointment_id,
            doctorID: doctor_id,
            detail,
          },
        },
        {
          headers: {
            patientId: patient_id,
          },
        }
      );
      if (response.status == 201) {
        Alert.alert("Appointment Completed");
        setCompleteModal(false);
      }
    } catch (err) {
      Alert.alert("Error while completing Appointment");
      console.log("Error while completing Appointment", err);
      setLoading(false);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={completeModal}
      onRequestClose={() => {
        setCompleteModal(false);
      }}
    >
      <View className="mt-20 flex-1 justify-center items-center">
        <View className="py-6 px-12 w-[90%] m-20 bg-white rounded-2xl align-center">
          <Text className="my-1 p-1 text-xl font-bold text-center">
            Record Appointment
          </Text>

          <View className="my-1">
            <Text className="text-lg">Patient: {patientName} </Text>
          </View>

          <View>
            <TextInput
              placeholder="detail"
              onChangeText={(text) => setDetail(text)}
              className="py-2 px-1 my-1 text-lg"
              multiline={true}
            />
          </View>
          <Pressable
            className="my-1 bg-green-600 rounded-xl"
            onPress={() => {
              completeAppointment();
            }}
          >
            <Text className="p-2 mx-auto text-center text-lg text-white">
              Complete
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
