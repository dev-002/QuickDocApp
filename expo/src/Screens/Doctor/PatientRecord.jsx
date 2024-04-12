import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import URL from "../../../test.api";

export default function PatientRecord({ navigation, route }) {
  let id = route.params;
  id = id.id
  const [patient, setPatient] = useState({});
  // useEffect(() => {
  //   async function PatinetFetch() {
  //     try {
  //       console.log(id);
  //       const response = await axios.post(URL.Doctor.fetchPatient, { id });
  //       console.log(response?.data);
  //       if (response.status == 200) {
  //         setPatient(response.data?.patient);
  //       }
  //     } catch (err) {
  //       console.log("Error in fetching Patient", err);
  //     }
  //   }
  //   PatinetFetch();
  // }, []);
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 px-1 bg-background">
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
            <View><Text>Name: </Text><Text>{id.name}</Text></View>
            <View><Text>Gender: </Text><Text>{id.gender == 1 ?"male": 'female'}</Text></View>
            <View><Text>mobile: </Text><Text>{id.mobile}</Text></View>
            <View><Text>Age: </Text><Text>{id.age}</Text></View>
            {/* <View><Text>Medical History: </Text><Text>{id?.medicalHistory}</Text></View> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
