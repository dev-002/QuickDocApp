import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import URL from "../../../test.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import ApplyLeaveComp from "./subcomponents/ApplyLeaveComp";
import Avatar from "../../../assets/Icon/profile.png";

export default function DoctorProfile({ navigation }) {
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(false);
  const [applyLeaveModal, setApplyLeaveModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async function () {
        const user = await JSON.parse(await AsyncStorage.getItem("loggedUser"));
        const response = await axios.get(URL.Doctor.updateProfile, {
          headers: { doctorId: user._id },
        });

        if (response.status === 200) {
          console.log("Response: ", response.data?.doctor);
          setDoctor({
            ...response.data?.doctor,
          });
          await AsyncStorage.setItem(
            "loggedUser",
            JSON.stringify(response.data?.doctor)
          );
        }
      })();
    }, [])
  );

  async function updateProfile() {
    try {
      setLoading(true);
      console.log("to be updated: ", doctor);
      const user = await JSON.parse(await AsyncStorage.getItem("loggedUser"));
      const response = await axios.put(
        URL.Doctor.updateProfile,
        { updateData: doctor },
        {
          headers: {
            doctorId: user._id,
          },
        }
      );
      if (response.status === 200) {
        setDoctor(response.data?.updatedDoctor);
        setLoading(false);
      }
    } catch (err) {
      Alert.alert("Error while fetching profile");
      console.err("Error while fetching profile ", err);
      setLoading(false);
    }
  }

  function handleChange(value, field) {
    switch (field) {
      case "name": {
        setDoctor((prevProfile) => ({ ...prevProfile, [field]: value }));
        break;
      }
      case "specialization": {
        setDoctor((prevProfile) => ({
          ...prevProfile,
          [field]: value,
        }));
        break;
      }
      case "experience": {
        setDoctor((prevProfile) => ({
          ...prevProfile,
          [field]: Number(value),
        }));
        break;
      }
      case "mobile": {
        setDoctor((prevProfile) => ({
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

  function getFormatedDate(date) {
    let today = new Date(date);
    return `${today.getDate()} / ${today.getMonth()} /${today.getFullYear()}`;
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
                value={doctor.name}
                placeholder="Name"
                className="my-1 p-1 border border-black/40 rounded-lg"
                onChangeText={(text) => handleChange(text, "name")}
              />
            </View>
          </View>

          {/* Basic Info */}
          <View className="my-2 flex flex-row justify-normal items-center">
            {/* Mobile */}
            <View className="w-1/2 flex flex-row justify-normal items-center">
              <Text className="w-1/3 text-lg">Mobile:</Text>
              <TextInput
                value={doctor.mobile?.toString()}
                inputMode="numeric"
                placeholder="Enter Mobile"
                className={"my-1 p-1 border border-black/40 rounded-lg"}
                onChangeText={(text) => handleChange(text, "mobile")}
              />
            </View>
            {/* Gender */}
            <View className="w-1/2 flex flex-row justify-normal items-center">
              <Text className="w-1/3 text-lg">Gender:</Text>
              <SelectDropdown
                data={["Male", "Female"]}
                onSelect={(selectedItem, index) => {
                  setDoctor((prevProfile) => ({
                    ...prevProfile,
                    gender: index + 1,
                  }));
                }}
                defaultValue={doctor.gender === 1 ? "Male" : "Female"}
                buttonStyle={{
                  width: "60%",
                  backgroundColor: "rgb(199 210 254)",
                  borderRadius: 10,
                }}
                buttonTextStyle={{ fontSize: 20 }}
              />
            </View>
          </View>

          {/* Experience */}
          <View className="my-2 flex flex-row justify-normal items-center">
            <View className="w-1/2 flex flex-row justify-normal items-center">
              <Text className="w-full text-lg">Experience:</Text>
              <TextInput
                value={doctor.experience?.toString()}
                inputMode="numeric"
                placeholder="Enter experience (in yrs)"
                className={"my-1 p-1 border border-black/40 rounded-lg"}
                onChangeText={(text) => handleChange(text, "experience")}
              />
            </View>
          </View>

          {/* Specialization */}
          <View className="my-2 flex flex-row justify-normal items-center">
            <View className="w-1/2 flex flex-row justify-normal items-center">
              <Text className="w-full text-lg">Specialization:</Text>
              <TextInput
                value={doctor.specialization}
                placeholder="Enter specialization"
                className={"my-1 p-1 border border-black/40 rounded-lg"}
                onChangeText={(text) => handleChange(text, "specialization")}
              />
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className="flex-1"
          >
            {doctor?.leaveDays?.length > 0 ? (
              doctor?.leaveDays?.map((leave, index) => (
                <View
                  key={index}
                  className="my-2 px-1 flex-row justify-between"
                >
                  <Text className="font-bold text-lg">Date:</Text>
                  <Text className="font-base text-lg">
                    {getFormatedDate(leave?.date)}
                  </Text>
                  <Text className="font-bold text-lg">Appointment Limit:</Text>
                  <Text className="font-base text-lg">{leave?.limit}</Text>
                </View>
              ))
            ) : (
              <View className="my-1">
                <Text className="text-xl font-bold">Leaves: </Text>
                <Text className="my-1 p-1 text-xl">No Leave Applied</Text>
              </View>
            )}

            {loading ? (
              <View className="my-1 py-2 bg-blue-400 rounded-xl">
                <ActivityIndicator size={"large"} animating={loading} />
              </View>
            ) : (
              <Pressable
                onPress={() => updateProfile()}
                className="my-1 py-2 bg-blue-400 rounded-xl"
              >
                <Text className="w-full mx-auto text-center text-lg text-white">
                  Update
                </Text>
              </Pressable>
            )}

            <Pressable
              onPress={() => setApplyLeaveModal(true)}
              className="my-1 py-2 bg-red-400 rounded-xl"
            >
              <Text className="w-full mx-auto text-center text-lg text-white">
                Apply for leave
              </Text>
            </Pressable>

            {applyLeaveModal && (
              <ApplyLeaveComp
                applyLeaveModal={applyLeaveModal}
                setApplyLeaveModal={setApplyLeaveModal}
              />
            )}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
