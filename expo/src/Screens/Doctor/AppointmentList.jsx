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
import AppointmentCard from "./subcomponents/AppointmentCard";

export default function AllAppointmentList({ navigation }) {
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
      let date = new Date();
      setLoading(true);
      const doctor = await JSON.parse(await AsyncStorage.getItem("loggedUser"));
      const response = await axios.get(URL.Doctor.fetchAppointmentDate, {
        headers: {
          doctorId: doctor._id,
        },
        params: { date, status: activeTab, search, searchType },
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
        <TabBar
          data={[
            "all",
            "pending",
            "approved",
            "rejected",
            "completed",
            "canceled",
          ]}
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
                  appointmentList?.map((appointment) => (
                    <AppointmentCard
                      key={appointment?._id}
                      appointment={appointment}
                    />
                  ))}
              </ScrollView>
            </>
          )
        )}
        <Button
          className="my-2"
          title="Older Appointments"
          onPress={() => navigation.navigate("DoctorAppointmentListOlder")}
        />
      </View>
    </SafeAreaView>
  );
}
