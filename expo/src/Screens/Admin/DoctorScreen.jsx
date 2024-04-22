import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import URL from "../../../test.api";

const DoctorScreen = ({ navigation }) => {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDoctorList() {
      try {
        setLoading(true);
        const response = await axios.get(URL.Admin.fetchDoctorList);
        if (response.status === 200) {
          setLoading(false);
          setDoctorList(response.data?.doctorList);
        }
      } catch (err) {
        setLoading(false);
        Alert.alert("Error in fetching doctor list");
        console.log("Error in Fetching: ", err);
      }
    }
    fetchDoctorList();
  }, []);

  return (
    <SafeAreaView className="flex-1 px-2">
      <StatusBar style="dark" />
      {/* Nav View */}
      <View className="mb-2 p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
        <Text className="text-xl font-bold">Doctors Screen</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-base text-blue-600">back</Text>
        </TouchableOpacity>
      </View>

      <Text className="mb-2 font-xl font-semibold">Doctor List: </Text>
      {loading ? (
        <ActivityIndicator animating={loading} size={"large"} />
      ) : doctorList.length > 0 ? (
        <ScrollView>
          {doctorList.map((doc) => (
            <View
              key={doc._id}
              className="m-1 p-2 border border-black/20 shadow-xl rounded-lg"
            >
              <Text>Name: {doc?.name}</Text>
              <Text>Gender: {doc?.gender == 1 ? "Male" : "Female"}</Text>
              <Text>Mobile: {doc?.mobile}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>No Doctor Added</Text>
      )}

      <TouchableOpacity
        className="my-1 p-2 bg-blue-300 rounded-xl"
        onPress={() => navigation.navigate("AdminDoctorSignup")}
      >
        <Text className="text-center font-base text-lg"> Add Doctor</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DoctorScreen;
