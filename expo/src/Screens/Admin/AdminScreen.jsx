import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import URL from "../../../test.api";

const AdminDashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState({});

  useEffect(() => {
    async function fetchAnalytic() {
      try {
        setLoading(true);
        const response = await axios.get(URL.Admin.fetchAnalytic);
        if (response.status === 200) {
          setLoading(false);
          setCount({
            doctor: response.data?.docCount,
            patient: response.data?.patientCount,
          });
        }
      } catch (err) {
        setLoading(false);
        console.log("error in fetchAnalytic", err);
      }
    }
    fetchAnalytic();
  }, []);

  async function handleLogout() {
    await AsyncStorage.removeItem("token").catch((err) => console.log(err));
    await AsyncStorage.removeItem("loggedUser").catch((err) =>
      console.log(err)
    );

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  }

  return (
    <SafeAreaView className="flex-1 px-2">
      <StatusBar style="dark" />
      {/* Nav View */}
      <View className="mb-2 p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
        <Text className="text-xl font-bold">Admin Dashboard</Text>

        <TouchableOpacity
          onPress={() => handleLogout()}
          className="relative bg-red-600 rounded-xl"
          style={{ left: 0 }}
        >
          <Text className="px-2 text-center text-lg text-white">Log out</Text>
        </TouchableOpacity>
      </View>

      {/* Screen View */}
      <View>
        {loading ? (
          <ActivityIndicator size={"large"} animating={loading} />
        ) : (
          <View className="my-2">
            <Text className="text-xl font-base">
              Patients Registerd: {count?.patient}{" "}
            </Text>
            <Text className="text-xl font-base">
              Doctors Registerd: {count?.doctor}{" "}
            </Text>
          </View>
        )}

        <View className="my-2 flex justify-center">
          <TouchableOpacity
            className="my-1 p-2 bg-blue-300 rounded-xl"
            onPress={() => navigation.navigate("AdminAppointmentList")}
          >
            <Text className="text-center font-base text-lg">
              View Appointments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="my-1 p-2 bg-blue-300 rounded-xl"
            onPress={() => navigation.navigate("AdminDoctorScreen")}
          >
            <Text className="text-center font-base text-lg"> Doctor List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdminDashboard;
