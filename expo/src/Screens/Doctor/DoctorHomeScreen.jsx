import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import URL from "../../../test.api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom Components
import Header from "../../Components/Header";
import { useNavigation } from "@react-navigation/native";

export default function DoctorHomeScreen({ navigation }) {
  const [profile, setProfile] = useState({});
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [appointmentList, setAppointmentList] = useState({});
  const [patientList, setPatientList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAppointments() {
    const date = new Date();
    let today = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join(
      "-"
    );
    try {
      const response = await axios.post(URL.Appointment.todayAppointment, {
        doctorId: profile?._id,
        today,
        approved: true,
      });
      console.log(response?.data);
      if (response.status == 200) {
        // console.log(response.data);
        setAppointmentList(response.data?.appointmentList);
        setPatientList(response.data?.PatientList);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getPatientList() {
    const timeMap = {
      slot1: 12,
      slot2: 14,
      slot3: 16,
      slot4: 18,
      slot5: 20,
      slot6: 23,
    };
    const list = [];
    console.log("list: ", appointmentList);

    for (let slot in appointmentList) {
      console.log(slot);
      if (appointmentList[slot].length > 0) {
        appointmentList[slot].map((appointment) => {
          const hour = new Date().getHours();
          if (hour < timeMap["slot" + appointment.timeSlot]) list.push;
        });
      }
    }
    return list;
  }

  useEffect(() => {
    let dat = new Date();
    setTime([dat.getHours() % 12, dat.getMinutes()]);
    setDate([dat.getDate(), dat.getMonth(), dat.getFullYear()]);

    (async function () {
      let user = await AsyncStorage.getItem("loggedUser").catch((err) =>
        console.log(err)
      );
      user = JSON.parse(user);
      setProfile({
        ...user,
      });
    })();

    fetchAppointments();
  }, []);

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
                      {date[0] + " /" + date[1] + " /" + date[2]}
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
                {appointmentList?.slot1 || (
                  <View
                    className={`bg-${
                      appointmentList?.slot1
                        ? new Date().getHours() > 12
                          ? "green"
                          : "orange"
                        : "neutral"
                    }-300 w-[45%] my-2 px-2 py-2 border border-${
                      new Date().getHours() >= 10 && new Date().getHours() < 12
                        ? "red-500"
                        : "black/50"
                    } rounded-xl `}
                  >
                    <Text className="text-center text-base">
                      10:00 AM - 12:00 PM
                    </Text>
                  </View>
                )}

                {appointmentList?.slot2 || (
                  <View
                    className={`bg-${
                      appointmentList?.slot2
                        ? new Date().getHours() > 14
                          ? "green"
                          : "orange"
                        : "neutral"
                    }-300 w-[45%] my-2 px-2 py-2 border border-${
                      new Date().getHours() >= 12 && new Date().getHours() < 14
                        ? "red-500"
                        : "black/50"
                    } rounded-xl`}
                  >
                    <Text className="text-center text-base">
                      12:00 PM - 2:00 PM
                    </Text>
                  </View>
                )}

                {appointmentList?.slot3 || (
                  <View
                    className={`bg-${
                      appointmentList?.slot3
                        ? new Date().getHours() > 16
                          ? "green"
                          : "orange"
                        : "neutral"
                    }-300 w-[45%] my-2 px-2 py-2 border border-${
                      new Date().getHours() >= 14 && new Date().getHours() < 16
                        ? "red-500"
                        : "black/50"
                    } rounded-xl`}
                  >
                    <Text className="text-center text-base">
                      2:00 PM - 4:00 PM
                    </Text>
                  </View>
                )}

                {appointmentList?.slot4 || (
                  <View
                    className={`bg-${
                      appointmentList?.slot4
                        ? new Date().getHours() > 18
                          ? "green"
                          : "orange"
                        : "neutral"
                    }-300 w-[45%] my-2 px-2 py-2 border border-${
                      new Date().getHours() >= 16 && new Date().getHours() < 18
                        ? "red-500"
                        : "black/50"
                    } rounded-xl`}
                  >
                    <Text className="text-center text-base">
                      4:00 PM - 6:00 PM
                    </Text>
                  </View>
                )}

                {appointmentList?.slot5 || (
                  <View
                    className={`bg-${
                      appointmentList?.slot5
                        ? new Date().getHours() > 20
                          ? "green"
                          : "orange"
                        : "neutral"
                    }-300 w-[45%] my-2 px-2 py-2 border border-${
                      new Date().getHours() >= 18 && new Date().getHours() < 20
                        ? "red-500"
                        : "black/50"
                    } rounded-xl`}
                  >
                    <Text className="text-center text-base">
                      6:00 PM - 8:00 PM
                    </Text>
                  </View>
                )}
                {console.log("Slot 6:", appointmentList)}
                {appointmentList?.slot6 || (
                  <View
                    className={`bg-${
                      appointmentList?.slot6
                        ? new Date().getHours() > 23
                          ? "green"
                          : "orange"
                        : "neutral"
                    }-300 w-[45%] my-2 px-2 py-2 border border-${
                      new Date().getHours() >= 21 && new Date().getHours() < 23
                        ? "red-500"
                        : "black/50"
                    } rounded-xl`}
                  >
                    <Text className="text-center text-base">
                      9:00 PM - 11:00 PM
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Todays Patient List */}
            <View className="flex-1">
              <Text className="font-bold text-xl">Patient List:</Text>

              <View className="flex flex-wrap justify-around">
                <View className="mt-3">
                  {patientList &&
                    patientList.map((patient) => (
                      <View className="p-1 m-1 rounded-lg border border-black/40">
                        <Text>Name: {patient.name}</Text>
                        <Text>
                          Gender: {patient.gender == 1 ? "Male" : "Female"}
                        </Text>
                        <Text>Mobile: {patient.mobile}</Text>
                      </View>
                    ))}
                </View>

                {appointmentList && console.log(getPatientList())}
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

// {/* <ScrollView>
// {appointment_data &&
//   appointment_data?.map((appointment) => (
//     <TouchableOpacity
//       key={appointment?.id}
//       className="my-2 py-3 px-2 bg-indigo-100 border border-black/60 rounded-xl"
//       onPress={() =>
//         console.log(
//           `Doctor Appointment: \nid: ${appointment.id} \nname: ${appointment.name}`
//         )
//       }
//     >
//       <View className="flex flex-row justify-start items-center">
//         {/* Doctor Details */}
//         <View className="w-2/3 flex flex-row justify-normal items-center">
//           {/* Doctor Avatar */}
//           <View className="w-1/3 p-1 mr-2">
//             <Image
//               source={require("../../assets/Icon/Doctor_Avatar.jpeg")}
//               className="h-14 w-14 rounded-full"
//             />
//           </View>
//           {/* Doctor Detials */}
//           <View className="w-2/3 py-2">
//             <Text className="text-lg font-bold">{appointment?.name}</Text>
//             <Text className="text-base font-medium">
//               {appointment?.appointmentTime}
//             </Text>
//           </View>
//         </View>
//         {/* Status*/}
//         <View className="w-1/3 flex justify-center items-center">
//           {appointment.status ? (
//             <Text className="text-lg text-green-500">Completed</Text>
//           ) : (
//             <Text className="text-lg text-orange-500">Pending</Text>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   ))}
// </ScrollView> */}
