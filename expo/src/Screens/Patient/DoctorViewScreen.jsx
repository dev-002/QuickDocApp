import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "react-native-vector-icons";
import Doctor_Avatar from "../../../assets/Icon/Doctor_Avatar.jpeg";
import axios from "axios";
import URL from "../../../test.api";

export default function DoctorViewScreen({ route }) {
  const navigation = useNavigation();

  const [doc, setDoc] = useState({});
  const [loading, setLoading] = useState(false);

  const data = route?.params?.doc;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function fetchDocDetails() {
        try {
          setLoading(true);
          console.log(process.env.IP, URL.Doctor.fetchAppointmentDate);
          const response = await axios.get(URL.Doctor.fetchDocDetails, {
            headers: {
              doctorid: data._id,
            },
          });
          console.log(response.data);
          if (response.status === 200) {
            setDoc(response.data?.doc);
            setInterval(() => setLoading(false), 2000);
          }
        } catch (err) {
          console.log("Error fetching Details", err);
          Alert.alert("Error fetching Details");
          setInterval(() => setLoading(false), 2000);
        }
      }

      fetchDocDetails();
    }, [])
  );

  function getDate(dateArr) {
    let leave = [];
    dateArr.map((date) => {
      let today = new Date();
      let leaveDate = new Date(date);
      if (
        today.getDate() <= leaveDate.getDate() &&
        today.getMonth <= leaveDate.getMonth()
      )
        leave.push(
          `${leaveDate.getDate()}-${leaveDate.getMonth()}-${leaveDate.getFullYear()}`
        );
    });
    return leave;
  }

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <ScrollView className="flex-1 px-4 py-6">
        {loading ? (
          <ActivityIndicator size={"large"} animating={loading} />
        ) : (
          <View className="relative bg-white shadow-lg">
            <Image
              source={
                doc?.profile
                  ? {
                      uri: doc?.profile,
                    }
                  : Doctor_Avatar
              }
              className="w-full h-60 object-cover rounded-2xl"
            />
            <View className="mb-2 w-full border-b-2" />

            <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="w-10 h-10 rounded-md items-center justify-center bg-white"
              >
                <FontAwesome5 name="chevron-left" size={24} color="#06B2BE" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Name and Experienc */}
        <View className="flex-row inset-x-0 justify-between px-6">
          <View className="flex-row space-x-2 items-center">
            <Text className="text-3xl font-bold text-[#067559]">
              {doc?.name}
            </Text>
          </View>
          <View className="px-2 py-1 my-auto rounded-md bg-teal-100 items-center">
            <Text>
              <Text className="font-bold">Experience (in yrs):</Text>{" "}
              {doc?.experience}
            </Text>
          </View>
        </View>

        {/* Mobile and gender and specialization */}
        <View className="mt-6">
          <Text className="text-[#428288] text-[24px] font-bold">
            +91 {doc?.mobile}
          </Text>

          <View className=" flex-row justify-between items-center space-x-2">
            {doc?.gender ? (
              <>
                <View className="ml-5 flex-row items-center justify-evenly">
                  <View className="w-10 h-10 rounded-xl bg-[#a7dcdc] items-center justify-center shadow-md">
                    <MaterialIcons
                      name={doc?.gender == 1 ? "male" : "female"}
                      size={24}
                      color="black"
                    />
                  </View>
                  <View>
                    <Text className="text-black text-lg font-bold">
                      {" "}
                      {doc?.gender == 1 ? "Male" : "Female"}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <Text className="text-base text-gray-500">
                Gender Not Specified{" "}
              </Text>
            )}
            <View className="mr-5 ">
              <Text className="text-[#515151] text-base font-bold">
                Speciallization:
              </Text>
              <Text className="text-[#428288] text-[24px] font-bold">
                {doc?.specialization}
              </Text>
            </View>
          </View>
        </View>

        {/* Rating */}
        <View className="mt-4 flex-row items-center justify-between">
          {doc?.rating && (
            <View className=" flex-row items-center space-x-2">
              {[...Array(5)].map((_, index) => (
                <View className="w-10 h-10 rounded-xl bg-red-100 items-center justify-center shadow-md">
                  <FontAwesome
                    key={index}
                    name={
                      index < Math.floor(doc.rating)
                        ? "star"
                        : index === Math.floor(doc.rating) &&
                          doc.rating % 1 !== 0
                        ? "star-half-o"
                        : "star-o"
                    }
                    size={24}
                    color="#D58574"
                  />
                </View>
              ))}
              <View>
                <Text className="text-[#515151] font-bold text-xl">
                  {doc?.rating}
                </Text>
                <Text className="text-[#515151] font-bold tex-base">
                  Ratings
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Medical Practice */}
        <Text className="text-[#515151] text-base font-bold">
          Previous Medical Practice:
        </Text>
        {doc?.medical_practice?.length > 0 ? (
          <View className="flex-row items-center justify-evenly">
            {doc?.medical_practice?.map((p, i) => (
              <Text
                key={i}
                className="mx-1 p-1 mt-4 tracking-wide text-base font-semibold bg-[#23c2bd] text-white rounded-lg"
              >
                {p}
              </Text>
            ))}
          </View>
        ) : (
          <Text className="text-base">No Previous Medical Practice</Text>
        )}

        <View className="flex-row items-center space-x-2 mt-2">
          <MaterialIcons name="access-time-filled" size={25} color="#8C9EA6" />
          {doc?.leaveDays?.length > 0 ? (
            getDate(doc?.leaveDays).map((a, i) => (
              <Text
                key={i}
                className="mx-1 p-1 bg-[#23c2bd] text-white text-base rounded-lg"
              >
                {a}{" "}
              </Text>
            ))
          ) : (
            <Text>No leaves Applied </Text>
          )}
        </View>

        <View className=" space-y-2 mt-4 bg-gray-100 rounded-2xl px-4 py-2">
          <View className="items-center flex-row space-x-5">
            <FontAwesome name="phone" size={24} color="#428288" />
            {
              <Text key={doc?.mobile} className="text-lg">
                +91 {doc?.mobile}
              </Text>
            }
          </View>

          {doc?.area?.length > 0 && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="map-pin" size={24} color="#428288" />
              <Text className="text-lg">{doc?.area[0]} (Primary)</Text>
            </View>
          )}

          <View className="my-4 p-3 rounded-lg bg-[#06B2BE] items-center justify-center">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AppointmentForm", { doctor: doc })
              }
            >
              <Text className="text-2xl font-semibold uppercase tracking-wider text-gray-100">
                Book Appointment Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
