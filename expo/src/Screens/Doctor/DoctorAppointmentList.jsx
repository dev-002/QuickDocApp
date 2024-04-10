import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import URL from "../../../test.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppointmentCard from "./subcomponents/AppointmentCard";

export default function DoctorAppointmentList({ navigation }) {
  const [appointments, setAppointments] = useState({});
  const [fetch, setFetch] = useState({ loading: false, err: null });

  useEffect(() => {
    async function getUser() {
      user = await AsyncStorage.getItem("loggedUser").catch((err) =>
        console.log(err)
      );
      user = JSON.parse(user);
      return user;
    }

    async function fetchAppointment() {
      try {
        setFetch((f) => {
          return { ...f, loading: true };
        });
        const date = new Date();
        let today = [
          date.getDate() + 1,
          date.getMonth() + 1,
          date.getFullYear(),
        ].join("-");

        let user = await getUser();
        const response = await axios.post(URL.Appointment.todayAppointment, {
          doctorId: user?._id,
          today,
        });
        if (response.status === 200) {
          setAppointments(response.data?.appointmentSlot);
          setFetch((f) => {
            return { ...f, loading: false };
          });
        }
      } catch (err) {
        console.log("Error: ", err);
        setFetch({ loading: false, err });
      }
    }

    fetchAppointment();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 px-1 bg-background">
        {/* Title */}
        <View className="p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
          <Text className="text-xl font-bold">Appointment List</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text className="text-base text-blue-600">back</Text>
          </Pressable>
        </View>

        {/* Detials */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="my-2 flex-1 px-1"
        >
          <View className="pt-1 flex-1">
            {/* {fetch.loading ? (
              fetch.err ? (
                <Text>Error: {fetch.err} </Text>
              ) : */}
            {appointments && (
              <View>
                <View>
                  <Text className="my-2 text-xl font-bold">Slot 1:</Text>
                  {appointments.slot1?.length > 0 ? (
                    appointments.slot1.map((app, index) => (
                      <AppointmentCard key={app?._id} app={app} index={index} />
                    ))
                  ) : (
                    <Text className="mx-auto text-xl">Empty</Text>
                  )}
                </View>
                <View>
                  <Text className="my-2 text-xl font-bold">Slot 2:</Text>
                  {appointments.slot2?.length > 0 ? (
                    appointments.slot2.map((app, index) => (
                      <AppointmentCard key={app?._id} app={app} index={index} />
                    ))
                  ) : (
                    <Text className="mx-auto text-xl">Empty</Text>
                  )}
                </View>
                <View>
                  <Text className="my-2 text-xl font-bold">Slot 3:</Text>
                  {appointments.slot3?.length > 0 ? (
                    appointments.slot3.map((app, index) => (
                      <AppointmentCard key={app?._id} app={app} index={index} />
                    ))
                  ) : (
                    <Text className="mx-auto text-xl">Empty</Text>
                  )}
                </View>
                <View>
                  <Text className="my-2 text-xl font-bold">Slot 4:</Text>
                  {appointments.slot4?.length > 0 ? (
                    appointments.slot4.map((app, index) => (
                      <AppointmentCard key={app?._id} app={app} index={index} />
                    ))
                  ) : (
                    <Text className="mx-auto text-xl">Empty</Text>
                  )}
                </View>
                <View>
                  <Text className="my-2 text-xl font-bold">Slot 5:</Text>
                  {appointments.slot5?.length > 0 ? (
                    appointments.slot5.map((app, index) => (
                      <AppointmentCard key={app?._id} app={app} index={index} />
                    ))
                  ) : (
                    <Text className="mx-auto text-xl">Empty</Text>
                  )}
                </View>
                <View>
                  <Text className="my-2 text-xl font-bold">Slot 6:</Text>
                  {appointments.slot6?.length > 0 ? (
                    appointments.slot6.map((app, index) => (
                      <AppointmentCard key={app?._id} app={app} index={index} />
                    ))
                  ) : (
                    <Text className="mx-auto text-xl">Empty</Text>
                  )}
                </View>
              </View>
            )}
            {/* }) : (
              <ActivityIndicator animating={fetch.loading} size="large" />
            )} */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
