import React, { useState } from "react";
import {
  Modal,
  TextInput,
  Text,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import axios from "axios";
import URL from "../../../../test.api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ApplyLeaveComp({
  applyLeaveModal,
  setApplyLeaveModal,
}) {
  const [date, setDate] = useState();
  const [limit, setLimit] = useState(15);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1));

  function isSame(a, b) {
    a = new Date(a);
    b = new Date(b);
    console.log(`a: ${a} type: ${typeof a} b: ${b} type: ${typeof b}`);
    if (
      a?.getdate() === b?.getDate() &&
      a?.getMonth() === b?.getMonth() &&
      a?.getFullYear() === b?.getFullYear()
    )
      return true;
    else return false;
  }

  async function applyFunc() {
    try {
      setLoading(true);
      let doctor = await JSON.parse(await AsyncStorage.getItem("loggedUser"));
      console.log(`date: ${date} limit: ${limit}`);
      let leave;
      if (doctor?.leaveDays?.length == 0) {
        leave = [{ date, limit }];
      } else {
        const existingEntryIndex = doctor?.leaveDays?.findIndex((entry) => {
          entry.date = new Date(entry.date);
          return isSame(entry.date, date);
        });

        if (existingEntryIndex !== -1) {
          // If an entry exists, update it
          doctor.leaveDays[existingEntryIndex].limit = limit;
        } else {
          // If no entry exists, push a new entry
          doctor.leaveDays.push({ date, limit });
        }
        leave = [...doctor?.leaveDays];
      }

      const response = await axios.post(
        URL.Doctor.applyLeave,
        { leave: ld },
        {
          headers: {
            doctorid: doctor._id,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        Alert.alert("Leave Applied Successfully");
        setApplyLeaveModal(false);
      }
    } catch (err) {
      Alert.alert("Error applying for leave");
      console.log("Error applying for leave ", err);
      setLoading(false);
    }
    setApplyLeaveModal(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={applyLeaveModal}
      onRequestClose={() => {
        setApplyLeaveModal(false);
      }}
    >
      <View className="mt-20 flex-1 justify-center items-center">
        <View className="py-6 px-4 w-[90%] m-20 bg-white rounded-2xl align-center">
          <Text className="my-1 p-1 text-xl font-bold text-center">
            Apply for Leave
          </Text>

          {/* Leave */}
          <DatePicker
            mode="calendar"
            selected={date}
            minimumDate={startDate}
            onDateChange={(propDate) => setDate(propDate)}
          />

          {/* Limit */}
          <View className="my-2 flex-row justify-space">
            <Text className="mx-2 text-lg">Appointment Limit: </Text>
            <TextInput
              placeholder="appointment limit"
              value={limit.toString()}
              keyboardAppearance="dark"
              keyboardType="numeric"
              className="text-lg text-center border-b"
              onChangeText={(text) => setLimit(Number(text))}
            />
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              animating={loading}
              className="text-2xl flex-1 item-center jusitfy-center"
            />
          ) : (
            <Pressable
              className="my-1 bg-blue-500 rounded-xl"
              onPress={() => applyFunc()}
            >
              <Text className="p-2 mx-auto text-center text-lg text-white">
                Apply
              </Text>
            </Pressable>
          )}
          <Pressable
            className="my-1 bg-red-500 rounded-xl"
            onPress={() => setApplyLeaveModal(false)}
          >
            <Text className="p-2 mx-auto text-center text-lg text-white">
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
