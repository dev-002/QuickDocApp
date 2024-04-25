import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import URL from "../../../test.api";
import ContactModalComp from "./subcomponents/ContactModalComp";
import Avatar from "../../../assets/Icon/profile.png";
import MedicalRecordModalComp from "./subcomponents/MedicalRecordModalComp";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState({});
  const [contactModal, setContactModal] = useState(false);
  const [medicalRecordModal, setMedicalRecordModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function fetchPatient() {
        try {
          setLoading(true);
          let patient = await JSON.parse(
            await AsyncStorage.getItem("loggedUser")
          );
          const response = await axios.get(URL.Profile.getProfile, {
            headers: { patientId: patient._id },
          });
          if (response.status === 200) {
            await AsyncStorage.setItem(
              "loggedUser",
              JSON.stringify(response.data?.patient)
            );
            setPatient({
              ...response.data?.patient,
            });
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
          Alert.alert("Error fetching patient profile");
          console.log("Error fetching patient profile", err);
        }
      }
      fetchPatient();
    }, [])
  );

  async function handleUpdate() {
    try {
      setLoading(true);
      const response = await axios.put(
        URL.Profile.getProfile,
        { updateData: patient },
        {
          headers: {
            patientId: patient._id,
          },
        }
      );
      if (response.status === 200) {
        Alert.alert("Profile Update Successfull");
        setPatient(response.data?.updatedPatient);
        setLoading(false);
      }
    } catch (err) {
      Alert.alert("Error updateing Profile");
      console.log("Error updateing Profile", err);
      setLoading(false);
    }
  }

  function handleChange(value, field) {
    switch (field) {
      case "name": {
        setPatient((prevProfile) => ({ ...prevProfile, [field]: value }));
        break;
      }
      case "age": {
        setPatient((prevProfile) => ({
          ...prevProfile,
          [field]: Number(value),
        }));
        break;
      }
      case "address": {
        setPatient((prevProfile) => ({
          ...prevProfile,
          [field]: value,
        }));
        break;
      }
      default: {
        console.log("Error");
      }
    }
  }
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 px-1 bg-background">
        {/* Title */}
        <View className="p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
          <Text className="text-xl font-bold">Profile</Text>
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
          {/* Personal Details */}
          <View className="flex flex-row justify-between items-center">
            <Pressable className="h-[60%] bg-indigo-200 w-1/3 flex justify-center items-center border-2 border-black/40 rounded-3xl">
              <Image source={Avatar} className="h-12 w-12 rounded-full" />
            </Pressable>
            <View className="px-3 w-2/3">
              <TextInput
                value={patient.name}
                placeholder="Full Name"
                className="my-1 p-1 border border-black/40 rounded-lg"
                onChangeText={(text) => handleChange(text, "name")}
              />
            </View>
          </View>

          {/* Basic Info */}
          <View className="my-2 flex flex-row justify-normal items-center">
            {/* Age */}
            <View className="w-1/2 flex flex-row justify-normal items-center">
              <Text className="w-1/3 text-lg">Age:</Text>
              <TextInput
                value={patient.age?.toString()}
                inputMode="numeric"
                placeholder="Enter Age"
                className={"my-1 p-1 border border-black/40 rounded-lg"}
                onChangeText={(text) => handleChange(text, "age")}
              />
            </View>
            {/* Gender */}
            <View className="w-1/2 flex flex-row justify-normal items-center">
              <Text className="w-1/3 text-lg">Gender:</Text>
              <SelectDropdown
                data={["Male", "Female"]}
                onSelect={(selectedItem, index) => {
                  setPatient((prevProfile) => ({
                    ...prevProfile,
                    gender: index + 1,
                  }));
                }}
                defaultValue={patient.gender === 1 ? "Male" : "Female"}
                buttonStyle={{
                  width: "60%",
                  backgroundColor: "rgb(199 210 254)",
                  borderRadius: 10,
                }}
                buttonTextStyle={{ fontSize: 20 }}
              />
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className="flex-1"
          >
            {/* Address */}
            <View className="my-2">
              <Text className="my-1 font-bold text-lg">Address:</Text>
              <TextInput
                multiline={true}
                value={patient?.address?.toString()}
                placeholder="Enter the address"
                className={`p-1 h-10 w-full border border-black/70 rounded-xl`}
                onChangeText={(text) => handleChange(text, "address")}
              />
            </View>

            {/* Personal Contact */}
            <View className="my-2">
              <Text className="my-1 font-bold text-lg">
                Emergency Contacts:
              </Text>

              {patient?.emergencyContacts?.length > 0 ? (
                patient.emergencyContacts.map((contact, index) => (
                  <View
                    key={index}
                    className="flex flex-row justify-around items-center"
                  >
                    {contact?.name && contact?.contact && (
                      <>
                        <Text className="w-[30%] font-bold my-2 p-1 border border-black/40 rounded-lg">
                          Name:{" "}
                          <Text className="text-base font-light">
                            {contact?.name}
                          </Text>
                        </Text>
                        <Text className="w-[30%] font-bold my-2 p-1 border border-black/40 rounded-lg">
                          Mobile:{" "}
                          <Text className="text-base font-light">
                            {contact?.contact?.toString()}
                          </Text>
                        </Text>
                      </>
                    )}
                  </View>
                ))
              ) : (
                <View className="my-2">
                  <Text className="py-2 bg-red-900 text-lg text-center rounded-md text-white">
                    No Emergency Contacts added
                  </Text>
                </View>
              )}
              <Pressable
                onPress={() => {
                  setContactModal(true);
                }}
                className="my-1 py-2 bg-blue-400 rounded-xl"
              >
                <Text className="w-full mx-auto text-center text-lg text-white">
                  Add Emergency Contact
                </Text>
              </Pressable>
            </View>

            {contactModal && (
              <ContactModalComp
                contactModal={contactModal}
                setContactModal={setContactModal}
                patient={patient}
                setPatient={setPatient}
              />
            )}

            {loading ? (
              <View className="my-1 py-2 bg-blue-400 rounded-xl">
                <ActivityIndicator size={"large"} animating={loading} />
              </View>
            ) : (
              <Pressable
                onPress={() => handleUpdate()}
                className="my-1 py-2 bg-blue-400 rounded-xl"
              >
                <Text className="w-full mx-auto text-center text-lg text-white">
                  Update
                </Text>
              </Pressable>
            )}

            <Pressable
              onPress={() => setMedicalRecordModal(true)}
              className="my-1 py-2 bg-blue-400 rounded-xl"
            >
              <Text className="w-full mx-auto text-center text-lg text-white">
                Show Medical Records
              </Text>
            </Pressable>

            <MedicalRecordModalComp
              setMedicalRecordModal={setMedicalRecordModal}
              medicalRecordModal={medicalRecordModal}
              record={patient?.medicalRecords}
            />
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
