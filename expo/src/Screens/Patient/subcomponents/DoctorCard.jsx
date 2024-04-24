import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function DoctorCard({ docList }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  function handleAppointDoc(doc) {
    navigation.navigate("AppointmentForm", { doctor: doc });
  }

  function getDoctorAvailability(doc) {
    if (doc?.leaveDays.length == 0) return true;

    let today = new Date().setHours(0, 0, 0, 0);

    if (doc?.leaveDays?.some((d) => isSameDate(d.date, today))) {
      let date2 = doc?.leaveDays?.find((d) => isSameDate(d.date, today));
      if (date2 && date2?.limit === 0) {
        return false;
      }
    }
    return true;

    function isSameDate(date1, date2) {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    }
  }

  return docList
    .reduce((rows, doctor, index) => {
      if (index % 2 === 0) {
        rows.push([]);
      }
      rows[rows.length - 1].push(doctor);
      return rows;
    }, [])
    .map((row, rowIndex) => {
      return (
        <View key={rowIndex + row} className="flex flex-row justify-between">
          {row.map((doc) => {
            useFocusEffect(
              useCallback(() => {
                doc.available = getDoctorAvailability(doc);
                setLoading(false);
              }, [])
            );

            return loading ? (
              <ActivityIndicator
                className="flex-1 justify-center items-center"
                key={doc._id}
                size={"large"}
                animating={loading}
              />
            ) : (
              <Animated.View
                entering={FadeInDown.springify()
                  .duration(5000)
                  .delay(100)
                  .damping(12)}
                key={doc?._id}
                className="w-[45%] m-2 p-2 flex justify-center items-center border border-gray-600 rounded-2xl"
              >
                {/* Doctor Avatar */}
                <View className="mb-1">
                  <Image
                    source={require("../../../../assets/Icon/Doctor_Avatar.jpeg")}
                    className="h-20 w-20 rounded-full"
                  />
                </View>

                {/* Doctor Name */}
                <View className="mb-1">
                  <Text className="font-bold text-xl">{doc.name}</Text>
                </View>

                {/* Specialization */}
                <View className="mb-1">
                  <Text className="text-green-800 text-lg">
                    {doc.specialization} Specialist
                  </Text>
                </View>

                {/* Available */}
                <View className="mb-1">
                  <Text
                    className={
                      `${doc.available ? "text-green-800" : "text-red-500"}` +
                      " text-lg"
                    }
                  >
                    {doc.available ? "Available" : "Leave"}
                  </Text>
                </View>

                {/* Appoint Button */}
                {doc.available ? (
                  <TouchableOpacity onPress={() => handleAppointDoc(doc)}>
                    <LinearGradient
                      colors={["#46b3ff", "#0067af", "#49007d"]}
                      className="p-2 align-center rounded-xl"
                    >
                      <Text className="py-1 px-2 text-sm self-center text-white">
                        Book Appointment
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <LinearGradient
                    colors={["#c0c0c0", "#464646"]}
                    className="p-2 align-center rounded-xl"
                  >
                    <Text className="py-1 px-2 text-sm self-center text-white">
                      No Appointment Available
                    </Text>
                  </LinearGradient>
                )}
              </Animated.View>
            );
          })}
        </View>
      );
    });
}
