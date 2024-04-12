import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

export default function DoctorAppointmentCard({ appointment_data }) {
  console.log(appointment_data)
  return (
    <ScrollView>
      {appointment_data &&
        appointment_data?.map((appointment) => (
          <TouchableOpacity
            key={appointment?.id}
            className="my-2 py-3 px-2 bg-indigo-100 border border-black/60 rounded-xl"
            onPress={() =>
              console.log(
                `Doctor Appointment: \nid: ${appointment.id} \nname: ${appointment.name}`
              )
            }
          >
            <View className="flex flex-row justify-start items-center">
              {/* Doctor Details */}
              <View className="w-2/3 flex flex-row justify-normal items-center">
                {/* Doctor Avatar */}
                <View className="w-1/3 p-1 mr-2">
                  <Image
                    source={require("../../assets/Icon/Doctor_Avatar.jpeg")}
                    className="h-14 w-14 rounded-full"
                  />
                </View>
                {/* Doctor Detials */}
                <View className="w-2/3 py-2">
                  <Text className="text-lg font-bold">
                    {appointment?.doctorId?.name}
                  </Text>
                  <Text className="text-base font-medium">
                    {appointment?.timeSlot}
                  </Text>
                </View>
              </View>
              {/* Status*/}
              <View className="w-1/3 flex justify-center items-center">
                {/* {appointment.status ? (
                  <Text className="text-lg text-green-500">Completed</Text>
                ) : (
                  <Text className="text-lg text-orange-500">Pending</Text>
                )} */}
                <Text>
                {appointment.status}{" "}
                </Text>
              </View>
              <View className="w-1/3 flex justify-center items-center">
                <Text>
                {appointment.reason}{" "}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}
