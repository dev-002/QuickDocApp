import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  let loggedUser = null;

  let tempDate = new Date();
  let date = getFormatedDate(tempDate.setDate(tempDate.getDate()));

  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    (async function () {
      await AsyncStorage.getItem("loggedUser").then((data) => {
        loggedUser = JSON.parse(data);
        setProfile({
          ...loggedUser,
          avatar: require("../../assets/Icon/profile.png"),
          age: null,
          dob: null,
          address: "",
          medicalHistory: {
            existing: "None",
            allergies: "Dust",
            medications: "AntiAlergic",
          },
          emergencyContacts: [
            { name: "papa", contact: 8755742123, relationship: "Father" },
          ],
        });
      });
    })();
  }, []);

  async function handleLogout() {
    await AsyncStorage.removeItem("token").catch((err) => console.log(err));
    await AsyncStorage.removeItem("loggedUser").catch((err) =>
      console.log(err)
    );
    await AsyncStorage.removeItem("role").catch((err) => console.log(err));

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  }

  async function handleUpdate() {}

  function handleChange(value, field, field2) {
    switch (field) {
      case "fullName": {
        setProfile((prevProfile) => ({ ...prevProfile, [field]: value }));
        break;
      }
      case "age": {
        setProfile((prevProfile) => ({
          ...prevProfile,
          [field]: Number(value),
        }));
        break;
      }
      case "address": {
        setProfile((prevProfile) => ({
          ...prevProfile,
          [field]: value,
        }));
        break;
      }
      case "medicalHistory": {
        console.log(`${field}.${field2}`, field[field2]);
        setProfile((prevProfile) => ({
          ...prevProfile,
          [field[field2]]: value,
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
              <Image
                source={profile.avatar}
                className="h-12 w-12 rounded-full"
              />
            </Pressable>
            <View className="px-3 w-2/3">
              <TextInput
                value={profile.fullName}
                placeholder="Full Name"
                className="my-1 p-1 border border-black/40 rounded-lg"
                onChangeText={(text) => handleChange(text, "fullName")}
              />
              <TextInput
                value={profile.age?.toString()}
                inputMode="numeric"
                placeholder="Enter Age"
                className={"my-1 p-1 border border-black/40 rounded-lg"}
                onChangeText={(text) => handleChange(text, "age")}
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
                      <Pressable
                        onPress={() => setModal(false)}
                        className="flex justify-center items-center"
                      >
                        <Text className="py-1 px-2 text-xl text-white bg-black/70 rounded-2xl">
                          Set DOB
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              ) : (
                <View className="flex flex-row justify-normal items-center">
                  <Text className="font-bold text-lg">DOB:</Text>
                  <Pressable
                    className="ml-2 p-1 text-lg bg-indigo-200 rounded-xl"
                    onPress={() => setModal(true)}
                  >
                    <Text
                      className={`${
                        profile.dob ? "" : "text-black/40 "
                      } text-lg`}
                    >
                      {profile.dob ? `${profile.dob}` : "Enter DOB"}
                    </Text>
                  </Pressable>
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
                    gender: index + 1,
                  }));
                }}
                defaultValue={profile.gender === 1 ? "Male" : "Female"}
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
                value={profile.address}
                placeholder="Enter the address"
                className={`p-1 h-10 w-full border border-black/70 rounded-xl`}
                onChangeText={(text) => handleChange(text, "address")}
              />
            </View>

            {/* Medical History */}
            <View className="my-2">
              <View className="flex flex-row justify-around items-center">
                <Text className="w-1/3 font-bold text-md">
                  Existing Medical History
                </Text>
                <TextInput
                  value={profile.medicalHistory?.existing}
                  placeholder="Existing Medical History"
                  className="w-2/3 my-1 p-1 border border-black/40 rounded-lg"
                  onChangeText={(text) =>
                    handleChange(text, "medicalHistory", "existing")
                  }
                />
              </View>
              <View className="flex flex-row justify-around items-center">
                <Text className="w-1/3 font-bold text-md">
                  Existing Allergies
                </Text>
                <TextInput
                  value={profile.medicalHistory?.allergies}
                  placeholder="Allergies History"
                  className="w-2/3 my-1 p-1 border border-black/40 rounded-lg"
                  onChangeText={(text) =>
                    handleChange(text, "medicalHistory", "allergies")
                  }
                />
              </View>
              <View className="flex flex-row justify-around items-center">
                <Text className="w-1/3 font-bold text-md">
                  Existing Medications
                </Text>
                <TextInput
                  value={profile.medicalHistory?.medications}
                  placeholder="Medications History"
                  className="w-2/3 my-1 p-1 border border-black/40 rounded-lg"
                  onChangeText={(text) =>
                    handleChange(text, "medicalHistory", "medications")
                  }
                />
              </View>
            </View>

            {/* Personal Contact */}
            <View className="my-2">
              <Text className="my-1 font-bold text-lg">Personal Contacts:</Text>

              {profile?.emergencyContacts?.length > 0 ? (
                profile.emergencyContacts.map((contact, index) => (
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
                      value={contact.contact?.toString()}
                      placeholder="Contact"
                      inputMode="numeric"
                      className="w-[30%] my-2 p-1 border border-black/40 rounded-lg"
                    />
                  </View>
                ))
              ) : (
                <View>
                  <Text className="bg-red-900 text-lg text-center rounded-md">
                    No Emergency Contacts added
                  </Text>
                </View>
              )}
            </View>

            <Pressable
              onPress={() => handleLogout()}
              className="my-1 py-2 bg-red-600 rounded-xl"
            >
              <Text className="w-full mx-auto text-center text-lg text-white">
                Log out
              </Text>
            </Pressable>

            <Pressable
              onPress={() => handleUpdate()}
              className={`my-1 py-2 bg-blue-400 rounded-xl`}
            >
              <Text className="w-full mx-auto text-center text-lg text-white">
                Save
              </Text>
            </Pressable>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
