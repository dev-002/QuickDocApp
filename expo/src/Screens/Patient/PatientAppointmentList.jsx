import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Button,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import TabBar from "./subcomponents/TabBar";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import URL from "../../../test.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppointmentCard from "./subcomponents/AppointmentCard";

export default function AllAppointmentList({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [appointmentList, setAppointmentList] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");

  // Fetch appointments
  useFocusEffect(
    useCallback(() => {
      async function fetchAppointment() {
        try {
          let patient = JSON.parse(await AsyncStorage.getItem("loggedUser"));
          const response = await axios.get(URL.Profile.getAppointments, {
            headers: {
              patientId: patient._id,
            },
            params: { status: activeTab },
          });
          if (response.status == 200) {
            setAppointmentList(response.data?.appointmentList);
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
          Alert.alert("Error in fetching Appointment Date");
          console.log("Error in fetching Appointment", err);
        }
      }
      fetchAppointment();
    }, [activeTab])
  );

  return (
    <SafeAreaView className="flex-1 px-2">
      <StatusBar style="dark" />
      {/* Nav View */}
      <View className="mb-2 p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
        <Text className="text-xl font-bold">Appointment List</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-base text-blue-600">back</Text>
        </TouchableOpacity>
      </View>

      {/* Detials */}

      <View className="flex-1 my-2">
        {/* Appointments */}
        <TabBar
          data={["pending", "approved", "rejected", "completed", "canceled"]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {loading ? (
          <ActivityIndicator size={"large"} animating={loading} />
        ) : (
          appointmentList && (
            <>
              <Text className="my-1 text-lg">
                Total Appointments: {appointmentList.length}
              </Text>
              {/* Render other content based on the activeTab */}
              <ScrollView className="mb-5">
                {appointmentList.length > 0 &&
                  appointmentList.map((appointment) => (
                    <AppointmentCard
                      key={appointment?._id}
                      appointment={appointment}
                    />
                  ))}
              </ScrollView>
            </>
          )
        )}
      </View>
    </SafeAreaView>
  );
}
