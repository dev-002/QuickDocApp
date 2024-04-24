import { View, Text } from "react-native";
import React from "react";

export default function TimeSlots({ navigation, slot, appointmentList }) {
  function handleSlotCheck(slot) {
    const time = new Date().getHours();

    let appointmentList2 = appointmentList.filter(
      (app) => app?.timeSlot == slot
    );

    if (appointmentList2.length > 0) {
    } else return "neutral";

    if (time > slot?.split("-")[0]) return "green";
    else return "orange";
  }

  return (
    <View
      className={`bg-${handleSlotCheck(slot)}-300 w-[45%] my-2 px-2 py-2 ${
        new Date().getHours() >= Number(slot.split("-")[0]) &&
        new Date().getHours() < Number(slot.split("-")[1])
          ? "border-2 border-blue-700"
          : "border border-black/50"
      } rounded-xl `}
    >
      <Text className="text-center text-base">
        {`${slot.split("-")[0] == 12 ? "12" : slot.split("-")[0] % 12} ${
          Number(slot.split("-")[0]) < 12 ? "AM" : "PM"
        }`}{" "}
        -{" "}
        {`${slot.split("-")[1] == 12 ? "12" : slot.split("-")[1] % 12} ${
          Number(slot.split("-")[1]) < 12 ? "AM" : "PM"
        }`}
      </Text>
    </View>
  );
}
