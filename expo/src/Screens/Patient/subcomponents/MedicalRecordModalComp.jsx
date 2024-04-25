import React from "react";
import { Modal, TextInput, Text, View, Pressable } from "react-native";

export default function MedicalRecordModalComp({
  setMedicalRecordModal,
  medicalRecordModal,
  record,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={medicalRecordModal}
      onRequestClose={() => {
        setMedicalRecordModal(false);
      }}
    >
      <View className="mt-20 flex-1 justify-center items-center">
        <View className="py-6 px-12 w-[90%] m-20 bg-white rounded-2xl align-center">
          <Text className="my-1 p-1 text-xl font-bold text-center">
            Emergency Contacts
          </Text>

          {record?.length > 0 ? (
            record?.map((record, index) => (
              <View key={index} className="m-1 p-1 border rounded-xl">
                <View className="my-1 p-1 border-b border-b-black/50">
                  <Text className="text-lg font-bold">Doctor: </Text>
                  <Text>
                    Name: <Text>{record?.doctorID?.name}</Text>{" "}
                  </Text>
                  <Text>
                    Specialization:
                    <Text>{record?.doctorID?.specialication}</Text>
                  </Text>
                </View>

                <View className="my-1 p-1">
                  <Text className="text-lg font-bold">Details: </Text>
                  <Text>{record?.details}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text className="text-xl text-center">No Medical Record</Text>
          )}

          <Pressable
            className="my-1 bg-red-500 rounded-xl"
            onPress={() => {
              setMedicalRecordModal(false);
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
