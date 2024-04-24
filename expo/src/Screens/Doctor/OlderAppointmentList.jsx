import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Button,
} from "react-native";
import TabBar from "./subcomponents/TabBar";
import Search from "./subcomponents/Search";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import URL from "../../../test.api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OlderAppointmentList({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [appointmentList, setAppointmentList] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  // Search
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState(1);
  // 1 -patient 2- date

  // Fetch appointments
  async function fetchAppointment() {
    try {
      setLoading(true);
      const doctor = await JSON.parse(await AsyncStorage.getItem("loggedUser"));
      console.log("Doctor: ", doctor);
      const response = await axios.get(URL.Doctor.fetchAppointmentDate, {
        headers: {
          doctorid: doctor._id,
        },
        params: { status: activeTab, search, searchType },
      });
      if (response.status == 200) {
        setAppointmentList(response.data?.appointments);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      Alert.alert("Error in fetching Appointment Date");
      console.log("Error in fetching Appointment Date", err);
    }
  }

  useEffect(() => {
    fetchAppointment();
  }, [activeTab]);

  function formatDate(date) {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
  }

  function getStatus(status) {
    switch (status) {
      case "pending":
        return <Text className="text-orange-500">Pending</Text>;
      case "approved":
        return <Text className="text-green-500">Approved</Text>;
      case "rejected":
        return <Text className="text-red-500">Rejected</Text>;
      case "completed":
        return <Text className="text-grey-500">Completed</Text>;
    }
  }

  return (
    <SafeAreaView className="flex-1 px-2">
      <StatusBar style="dark" />
      {/* Nav View */}
      <View className="mb-2 p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
        <Text className="text-xl font-bold">Older Appointment List</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-base text-blue-600">back</Text>
        </TouchableOpacity>
      </View>

      {/* Detials */}

      <View className="flex-1 my-2">
        <View>
          <Search
            search={search}
            setSearch={setSearch}
            searchType={searchType}
            setSearchType={setSearchType}
            fetchAppointment={fetchAppointment}
          />
        </View>

        {/* Appointments */}
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
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
                  appointmentList?.map((appointment) => (
                    <TouchableOpacity
                      key={appointment._id}
                      className="my-2 mx-auto w-[80%] p-1 px-2 border-2 border-black/40 rounded-lg"
                    >
                      <Text className="text-base" numberOfLines={1}>
                        Date: {formatDate(appointment?.date)}
                      </Text>
                      <Text className="text-base">
                        Patient: {appointment?.patientId?.name}
                      </Text>
                      <Text className="text-base">
                        Patient gender:{" "}
                        {appointment?.patientId?.gender === 1
                          ? "Male"
                          : "Female"}
                      </Text>
                      <Text className="text-base">
                        Doctor: {appointment?.doctorId?.name}
                      </Text>
                      <Text className="text-base" numberOfLines={2}>
                        Reason: {appointment?.reason}
                      </Text>
                      <Text className="text-base">
                        Status: {getStatus(appointment?.status)}
                      </Text>
                      <Text className="text-base">
                        Reason: {appointment?.reason}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </>
          )
        )}
        <Button
          className="my-2"
          title="Home Screen"
          onPress={() => {
            navigation.goBack();
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
}
