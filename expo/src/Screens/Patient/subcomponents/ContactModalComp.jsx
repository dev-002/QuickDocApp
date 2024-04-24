import React, { useState } from "react";
import { Modal, TextInput, Text, View, Pressable } from "react-native";

export default function ContactModalComp({
  setContactModal,
  contactModal,
  patient,
  setPatient,
}) {
  const [changeArr, setChangeArr] = useState(() => patient?.emergencyContacts);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={contactModal}
      onRequestClose={() => {
        setContactModal(false);
      }}
    >
      <View className="mt-20 flex-1 justify-center items-center">
        <View className="py-6 px-12 w-[90%] m-20 bg-white rounded-2xl align-center">
          <Text className="my-1 p-1 text-xl font-bold text-center">
            Emergency Contacts
          </Text>

          <TempComp
            setChangeArr={setChangeArr}
            changeArr={changeArr}
            index={0}
          />
          <TempComp
            setChangeArr={setChangeArr}
            changeArr={changeArr}
            index={1}
          />
          <TempComp
            setChangeArr={setChangeArr}
            changeArr={changeArr}
            index={2}
          />
          <Pressable
            className="my-1 bg-red-500 rounded-xl"
            onPress={() => {
              setPatient((prev) => ({ ...prev, emergencyContacts: changeArr }));
              setContactModal(false);
            }}
          >
            <Text className="p-2 mx-auto text-center text-lg text-white">
              close
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const TempComp = ({ setChangeArr, changeArr, index }) => {
  return (
    <View className="my-1 p-2 rounded-lg border-2">
      <View className="mb-2">
        <Text>Name :</Text>
        <TextInput
          placeholder="name"
          value={changeArr[index]?.name}
          onChangeText={(text) =>
            setChangeArr((prev) => {
              let newarr = [...prev];
              newarr[index] = { ...newarr[index], name: text };
              return newarr;
            })
          }
          className="w-full my-2 p-1 border-b rounded-lg"
        />
      </View>

      <View>
        <Text>mobile :</Text>
        <TextInput
          placeholder="no"
          inputMode="numeric"
          value={changeArr[index]?.contact?.toString()}
          onChangeText={(number) =>
            setChangeArr((prev) => {
              let newarr = [...prev];
              newarr[index] = {
                ...newarr[index],
                contact: Number(number),
              };
              return newarr;
            })
          }
          className="w-full my-2 p-1 border-b rounded-lg"
        />
      </View>
    </View>
  );
};
