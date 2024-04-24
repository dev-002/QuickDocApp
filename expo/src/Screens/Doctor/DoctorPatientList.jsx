import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import URL from "../../../test.api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DoctorPatientList({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [patientList, setPatientList] = useState([]);

  async function fetchPatientList() {
    try {
      setLoading(true);
      const doctor = await JSON.parse(await AsyncStorage.getItem("loggedUser"));
      const response = await axios.get(URL.Doctor.fetchList, {
        headers: {
          doctorid: doctor._id,
        },
      });
      if (response.status == 200) {
        setPatientList(response.data?.list);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log("Error in fetching patient list", err);
    }
  }
  useEffect(() => {
    fetchPatientList();
  }, []);

  function handlePress(id) {
    navigation.navigate("DoctorPatientRecord", { id });
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 px-1 bg-background">
        {/* Title */}
        <View className="p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
          <Text className="text-xl font-bold">Patient List</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text className="text-base text-blue-600">back</Text>
          </Pressable>
        </View>

        {/* Detials */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="flex-1 px-1"
        >
          {loading ? (
            <ActivityIndicator size={"large"} animating={loading} />
          ) : (
            patientList.length > 0 &&
            patientList.map((patient) => (
              <View
                key={patient._id}
                className="my-2 p-1 border border-black/40 rounded-lg"
              >
                <Text className="text-lg font-base">Name: {patient.name}</Text>
                <Text className="text-lg font-base">
                  Mobile: {patient.mobile}
                </Text>
                <Text className="text-lg font-base">Age: {patient.age}</Text>
                <Text className="text-lg font-base">
                  Gender: {patient.gender == 1 ? "Male" : "Female"}
                </Text>
                <Text className="text-lg font-base">
                  Address: {patient.address}
                </Text>
                <TouchableOpacity
                  onPress={() => handlePress(patient._id)}
                  className="m-1 p-1 rounded-xl border bg-blue-300"
                >
                  <Text className="text-lg font-base text-center">
                    Get details
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
