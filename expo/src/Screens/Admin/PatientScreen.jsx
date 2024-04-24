import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import URL from "../../../test.api";

export default function AdminPatientScreen({ navigation }) {
  const [patientList, setPatientList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchpatientList() {
      try {
        setLoading(true);
        const response = await axios.get(URL.Admin.fetchPatientList);
        if (response.status === 200) {
          setLoading(false);
          setPatientList(response.data?.patientList);
        }
      } catch (err) {
        setLoading(false);
        Alert.alert("Error in fetching doctor list");
        console.log("Error in Fetching: ", err);
      }
    }
    fetchpatientList();
  }, []);

  return (
    <SafeAreaView className="flex-1 px-2">
      <StatusBar style="dark" />
      {/* Nav View */}
      <View className="mb-2 p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
        <Text className="text-xl font-bold">Patient Screen</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-base text-blue-600">back</Text>
        </TouchableOpacity>
      </View>

      <Text className="mb-2 font-xl font-semibold">Patient List: </Text>
      {loading ? (
        <ActivityIndicator animating={loading} size={"large"} />
      ) : patientList.length > 0 ? (
        <ScrollView>
          {patientList.map((patinet) => (
            <View
              key={patinet._id}
              className="m-1 p-2 border border-black/20 shadow-xl rounded-lg"
            >
              <Text>Name: {patinet?.name}</Text>
              <Text>Gender: {patinet?.gender == 1 ? "Male" : "Female"}</Text>
              <Text>Mobile: {patinet?.mobile}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>No Doctor Added</Text>
      )}
    </SafeAreaView>
  );
}
