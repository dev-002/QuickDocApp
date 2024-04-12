import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const DoctorForm = ({ navigation }) => {
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [gender, setGender] = useState(1);
  const [experience, setExperience] = useState(NaN);

  const handleAddDoctor = () => {
    console.log("Adding doctor:", doctorName, specialization);
  };

  return (
    <View>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Add New Doctor</Text>
      <TextInput
        placeholder="Doctor Name"
        value={doctorName}
        onChangeText={setDoctorName}
      />
      <TextInput
        placeholder="Specialization"
        value={specialization}
        onChangeText={setSpecialization}
      />
      <SelectDropdown
        data={["Male", "Female"]}
        onSelect={(selected, index) => {
          setGender(index + 1);
        }}
      />
      <TextInput
        placeholder="Experience"
        value={experience}
        onChangeText={setExperience}
      />
      <Button title="Add" onPress={handleAddDoctor} />
    </View>
  );
};

export default DoctorForm;
