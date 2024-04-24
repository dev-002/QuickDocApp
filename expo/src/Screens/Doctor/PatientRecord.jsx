import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import URL from "../../../test.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabBar from "./subcomponents/TabBar";

export default function PatientRecord({ navigation, route }) {
  let { id } = route.params;
  const [patient, setPatient] = useState({});
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    async function PatinetFetch() {
      try {
        const doctor = await JSON.parse(
          await AsyncStorage.getItem("loggedUser")
        );
        const response = await axios.post(
          URL.Doctor.fetchPatient,
          { id, activeTab },
          {
            headers: {
              doctorid: doctor?._id,
            },
          }
        );
        if (response.status == 200) {
          setPatient(response.data?.patient);
        }
      } catch (err) {
        console.log("Error in fetching Patient", err);
      }
    }
    PatinetFetch();
  }, []);
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 px-1">
        {/* Title */}
        <View className="p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
          <Text className="text-xl font-bold">Patient Record</Text>
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
          <View className="pt-1 flex-1">
            <View className="my-1 mb-5">
              <Text className="text-lg  font-bold">
                Name:{" "}
                <Text className="text-base font-normal">{patient.name}</Text>
              </Text>
            </View>
            <View className="my-1 mb-5">
              <Text className="text-lg  font-bold">
                Gender:{" "}
                <Text className="text-base font-normal">
                  {patient.gender == 1 ? "male" : "female"}
                </Text>
              </Text>
            </View>
            <View className="my-1 mb-5">
              <Text className="text-lg font-bold">
                Mobile:{" "}
                <Text className="text-base font-normal">{patient.mobile}</Text>
              </Text>
            </View>
            <View className="my-1 mb-5">
              <Text className="text-lg font-bold">
                Age:{" "}
                <Text className="text-base font-normal">
                  {patient.age ? patient.age : "No age specified"}
                </Text>
              </Text>
            </View>
            <View className="my-1 mb-5">
              <Text className="text-lg font-bold">Medical Record: </Text>
              {/* Appointments */}
              <TabBar
                data={["all", "specific"]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <View className="my-1">
                {patient?.medicalRecord?.length > 0 ? (
                  patient.medicalRecord.map((record) => (
                    <Text className="p-1 text-lg border-2 border-black/40 rounded-lg">
                      {record}
                    </Text>
                  ))
                ) : (
                  <Text className="text-xl">No Medical Record</Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
