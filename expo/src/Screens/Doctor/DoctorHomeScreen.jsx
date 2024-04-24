import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import URL from "../../../test.api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// Custom Components
import Header from "../../Components/Header";
import { useNavigation } from "@react-navigation/native";
import TimeSlots from "./subcomponents/TimeSlots";

export default function DoctorHomeScreen({ navigation }) {
  const [profile, setProfile] = useState({});
  const [date, setDate] = useState(() => new Date());
  const [time, setTime] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAppointments() {
    const today = new Date();
    try {
      setLoading(true);
      const response = await axios.post(
        URL.Appointment.todayAppointment,
        {
          today,
        },
        {
          headers: {
            doctorid: profile?._id,
          },
        }
      );
      console.log(response?.data);
      if (response.status == 200) {
        setAppointmentList(response.data?.appointmentList);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  function fetchSlotsPatient() {
    let slot = new Date();
    let list = appointmentList.filter((app) => {
      if (app.timeSlot == slot) return app?.patientId;
    });
    return list;
  }

  useFocusEffect(
    useCallback(() => {
      let dat = new Date();
      setTime([
        dat.getHours() === 12 ? 12 : dat.getHours() % 12,
        dat.getMinutes(),
      ]);

      (async function () {
        try {
          let user = await JSON.parse(await AsyncStorage.getItem("loggedUser"));
          setProfile({
            ...user,
          });
        } catch (err) {
          console.log("Error in Doctor Home Screen", err);
        }
      })();

      fetchAppointments();
    }, [])
  );

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 bg-background">
        <Header />
        {loading ? (
          <ActivityIndicator size="large" animating={loading} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} className="px-2">
            {/* Doctor Home Page */}
            <View className="my-3 flex flex-row">
              {/* Doctor Avatar */}
              <View className="w-1/3 mx-auto">
                <Image
                  source={require("../../../assets/Icon/Doctor_Avatar.jpeg")}
                  className="h-20 w-20"
                />
              </View>

              {/* Todays Info */}
              <View className="w-2/3 mx-auto">
                <View className="mb-1 flex flex-row">
                  <View>
                    <Text className="text-xl font-bold">Today:</Text>

                    <Text className="text-xl">
                      {date.getDate() +
                        " /" +
                        date.getMonth() +
                        " /" +
                        date.getFullYear()}
                    </Text>
                  </View>

                  <View className="ml-5">
                    <Text className="text-xl font-bold">Time:</Text>

                    <Text className="text-xl">
                      {time[0] + ": " + time[1]}{" "}
                      {new Date().getHours() < 12 ? "a.m." : "p.m."}
                    </Text>
                  </View>
                </View>
                <Text className="text-xl">
                  Welcome Dr. {profile && profile?.name?.split(" ")[0]}
                </Text>
              </View>
            </View>

            {/* Today's Appointment */}
            <View className="my-1">
              <Text className="font-bold text-xl">Today's Appointments:</Text>

              <View className="flex flex-row flex-wrap justify-around">
                <TimeSlots slot={"10-12"} appointmentList={appointmentList} />
                <TimeSlots slot={"12-14"} appointmentList={appointmentList} />
                <TimeSlots slot={"15-17"} appointmentList={appointmentList} />
                <TimeSlots slot={"17-19"} appointmentList={appointmentList} />
                <TimeSlots slot={"21-23"} appointmentList={appointmentList} />
              </View>
            </View>

            {/* Todays Patient List */}
            <View className="flex-1">
              <Text className="font-bold text-xl">Patient List:</Text>

              <View className="flex flex-wrap justify-around">
                <View className="mt-3">
                  {appointmentList &&
                    fetchSlotsPatient().map((patient) => (
                      <View className="p-1 m-1 rounded-lg border border-black/40">
                        <Text>Name: {patient.name}</Text>
                        <Text>
                          Gender: {patient.gender == 1 ? "Male" : "Female"}
                        </Text>
                        <Text>Mobile: {patient.mobile}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            async function statusUpdate() {
                              try {
                                const response = await axios.post(
                                  URL.Appointment.statusChange,
                                  {
                                    appointment_id: appointment?._id,
                                    status: "completed",
                                  }
                                );
                                if (response.status == 200) {
                                  Alert.alert("Appointment Completed");
                                }
                              } catch (err) {
                                console.log("Error: ", err);
                              }
                            }
                            // statusUpdate();
                          }}
                        >
                          <View className="rounded-xl bg-green-500">Tick</View>
                        </TouchableOpacity>
                      </View>
                    ))}
                </View>
              </View>
            </View>
          </ScrollView>
        )}

        <DoctorFooterMenu />
      </SafeAreaView>
    </>
  );
}

function DoctorFooterMenu() {
  const navigation = useNavigation();
  return (
    <View className="fixed bottom-10 w-[80%] h-auto left-[10%] p-1 bg-background border border-black/50 rounded-full">
      <View className="flex flex-row justify-around items-center">
        <Pressable
          className="h-[40] w-[15%]"
          onPress={() => navigation.navigate("DoctorAppointmentList")}
        >
          <Image
            source={require("../../../assets/Icon/CheckUp.jpeg")}
            className="h-[40] w-[100%]"
          />
        </Pressable>
        <Pressable
          className="h-[40] w-[15%]"
          onPress={() => navigation.navigate("DoctorProfile")}
        >
          <Image
            source={require("../../../assets/Icon/profile.png")}
            className="h-[40] w-[80%]"
          />
        </Pressable>
        <Pressable
          className="h-[40] w-[15%]"
          onPress={() => navigation.navigate("DoctorPatientList")}
        >
          <Image
            source={require("../../../assets/Icon/Ambulance.jpeg")}
            className="h-[44] w-[100%]"
          />
        </Pressable>
      </View>
    </View>
  );
}
