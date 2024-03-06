import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  let loggedUser;

  let tempDate = new Date();
  let date = getFormatedDate(tempDate.setDate(tempDate.getDate()));

  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState({
    role: 2,
    avatar: require("../../assets/Icon/profile.png"),
    firstName: "Devansh",
    LastName: "Gupta",
    age: 21,
    mobile: 1234567890,
    dob: date,
    gender: 0,
    // 0-male 1-female
    address: "on the planet Earth",
    medicalHistory: {
      existing: "None",
      allergies: "Dust",
      medications: "AntiAlergic",
    },
    emergencyContacts: [
      { name: "ABC", relationship: "Father", contact: 1234567890 },
      { name: "XYZ", relationship: "Mother", contact: 1234567890 },
    ],
  });

  useEffect(async () => {
    loggedUser = await AsyncStorage.getItem("loggedUser");
    console.log("User LoggedIn", loggedUser);
  }, []);

  return loggedUser ? (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 px-1 bg-background">
        {/* Title */}
        <View className="p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
          <Text className="text-xl font-bold">Profile</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-base text-blue-600">back</Text>
          </TouchableOpacity>
        </View>

        {/* Detials */}
        <ScrollView showsVerticalScrollIndicator={false} className="px-1">
          {/* Personal Details */}
          <View className="flex flex-row justify-between items-center">
            <TouchableOpacity className="h-[60%] bg-indigo-200 w-1/3 flex justify-center items-center border-2 border-black/40 rounded-3xl">
              <Image
                source={profile.avatar}
                className="h-12 w-12 rounded-full"
              />
            </TouchableOpacity>
            <View className="px-3 w-2/3">
              <TextInput
                value={profile.firstName}
                placeholder="First Name"
                className="my-1 p-1 border border-black/40 rounded-lg"
              />
              <TextInput
                value={profile.LastName}
                placeholder="Last Name"
                className="my-1 p-1 border border-black/40 rounded-lg"
              />
              <TextInput
                value={`${profile.age}`}
                inputMode="numeric"
                placeholder="Age"
                className="my-1 p-1 border border-black/40 rounded-lg"
              />
            </View>
          </View>

          {/* Basic Info */}
          <View className="my-2 flex flex-row justify-normal items-center">
            <View className="w-1/2">
              {modal ? (
                <Modal animationType="slide" transparent={true} visible={modal}>
                  <View className="flex-1 justify-center items-center">
                    <View className="py-6 px-12 w-[90%] m-20 bg-white rounded-2xl align-center">
                      <DatePicker
                        mode="calendar"
                        onDateChange={(newDate) => {
                          setProfile((prevProfile) => ({
                            ...prevProfile,
                            dob: newDate,
                          }));
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => setModal(false)}
                        className="flex justify-center items-center"
                      >
                        <Text className="py-1 px-2 text-xl text-white bg-black/70 rounded-2xl">
                          Set DOB
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              ) : (
                <View className="flex flex-row justify-normal items-center">
                  <Text className="font-bold text-lg">DOB:</Text>
                  <TouchableOpacity
                    className="ml-2 p-1 text-lg bg-indigo-200 rounded-xl"
                    onPress={() => setModal(true)}
                  >
                    <Text className="text-lg">{profile.dob}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View className="w-1/2 flex flex-row justify-normal items-center">
              <Text className="w-1/3 text-lg">Gender:</Text>
              <SelectDropdown
                data={["Male", "Female"]}
                onSelect={(selectedItem, index) => {
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    gender: index,
                  }));
                }}
                defaultValue={profile.gender === 0 ? "Male" : "Female"}
                buttonStyle={{
                  width: "60%",
                  backgroundColor: "rgb(199 210 254)",
                  borderRadius: 10,
                }}
                buttonTextStyle={{ fontSize: 20 }}
              />
            </View>
          </View>

          {/* Address */}
          <View className="my-2">
            <Text className="my-1 font-bold text-lg">Address:</Text>
            <TextInput
              multiline={true}
              value={profile.address}
              placeholder="Address"
              className="p-1 h-10 w-full border border-black/70 rounded-xl"
            />
          </View>

          {/* Medical History */}
          <View className="my-2">
            <View className="flex flex-row justify-around items-center">
              <Text className="w-1/3 font-bold text-md">
                Existing Medical History
              </Text>
              <TextInput
                value={profile.medicalHistory.existing}
                placeholder="Existing Medical History"
                className="w-2/3 my-1 p-1 border border-black/40 rounded-lg"
              />
            </View>
            <View className="flex flex-row justify-around items-center">
              <Text className="w-1/3 font-bold text-md">
                Existing Medical History
              </Text>
              <TextInput
                value={profile.medicalHistory.allergies}
                placeholder="Allergies History"
                className="w-2/3 my-1 p-1 border border-black/40 rounded-lg"
              />
            </View>
            <View className="flex flex-row justify-around items-center">
              <Text className="w-1/3 font-bold text-md">
                Existing Medical History
              </Text>
              <TextInput
                value={profile.medicalHistory.medications}
                placeholder="Medications History"
                className="w-2/3 my-1 p-1 border border-black/40 rounded-lg"
              />
            </View>
          </View>

          {/* Personal Contact */}
          <View className="my-2">
            <Text className="my-1 font-bold text-lg">Personal Contacts:</Text>

            {profile.emergencyContacts.map((contact, index) => (
              <View
                key={index}
                className="flex flex-row justify-around items-center"
              >
                <TextInput
                  value={contact.name}
                  placeholder="Contact Name"
                  className="w-[30%] my-2 p-1 border border-black/40 rounded-lg"
                />
                <TextInput
                  value={contact.relationship}
                  placeholder="Contact RelationShip"
                  className="w-[30%] my-2 p-1 border border-black/40 rounded-lg"
                />
                <TextInput
                  value={contact.contact.toString()}
                  placeholder="Contact"
                  inputMode="numeric"
                  className="w-[30%] my-2 p-1 border border-black/40 rounded-lg"
                />
              </View>
            ))}

            <View className="flex flex-row justify-around items-center">
              <Text className="w-1/3 font-bold text-md">
                Existing Medical History
              </Text>
              <TextInput
                value={profile.medicalHistory.allergies}
                placeholder="Allergies History"
                className="w-2/3 my-1 p-1 border border-black/40 rounded-lg"
              />
            </View>
            <View className="flex flex-row justify-around items-center">
              <Text className="w-1/3 font-bold text-md">
                Existing Medical History
              </Text>
              <TextInput
                value={profile.medicalHistory.medications}
                placeholder="Medications History"
                className="w-2/3 my-1 p-1 border border-black/40 rounded-lg"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  ) : (
    NotLoggedUserComp
  );
}

function NotLoggedUserComp() {
  return (
    <SafeAreaView>
      <View className="my-1 px-1">
        <Text className="text-lg mx-auto">Error: No user logged found</Text>
      </View>
    </SafeAreaView>
  );
}
