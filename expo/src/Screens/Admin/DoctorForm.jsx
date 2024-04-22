import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import SelectDropdown from "react-native-select-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import URL from "../../../test.api";

const DoctorForm = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState(1);
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddDoctor = async () => {
    try {
      if (checkfunc()) {
        setLoading(true);
        const response = await axios.post(URL.Admin.doctorSignup, {
          role: 1,
          doctor: {
            name,
            password,
            mobile: Number(mobile),
            gender,
            experience: Number(experience),
            specialization,
          },
        });
        if (response.status === 201) {
          setLoading(false);
          Alert.alert("Doctor Added Successfully");
          navigation.goBack();
        }
      } else throw new Error("Enter every detail");
    } catch (err) {
      setLoading(false);
      Alert.alert("Error in adding Doctor");
      console.log("Error in adding Doctor: ", err);
    }
    console.log("Adding doctor:", name, specialization);
  };

  function checkfunc() {
    if (
      check &&
      name != "" &&
      mobile != "" &&
      experience != "" &&
      specialization != ""
    )
      return true;
    else false;
  }

  const handleNumericChange = (text, setFunc) => {
    // Remove any non-numeric characters
    const formattedMobile = text.replace(/[^0-9]/g, "");
    // Limit to 10 digits
    if (formattedMobile.length <= 10) {
      setFunc(formattedMobile);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-2">
      <StatusBar style="dark" />
      {/* Nav View */}
      <View className="mb-2 p-2 flex flex-row justify-between items-center border-b-2 border-b-black/60 ">
        <Text className="text-xl font-bold">Add New Doctor</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-base text-blue-600">back</Text>
        </TouchableOpacity>
      </View>

      {/* Doctor Signup */}
      {loading ? (
        <ActivityIndicator size={"large"} animating={loading} />
      ) : (
        <View className="my-2 flex-1">
          <View className="my-1 p-2 border-b border-black/30 rounded-lg shadow-lg">
            <Text className="text-lg">Name:</Text>
            <TextInput
              placeholder="Doctor Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View className="my-1 p-2 border-b border-black/30 rounded-lg shadow-lg">
            <Text className="text-lg">Password:</Text>
            <TextInput
              placeholder="Set Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Text className="text-lg">Repeat Password:</Text>
            <TextInput
              placeholder="Repeat Password"
              onChangeText={(text) => setCheck(text == password)}
            />
          </View>
          <View className="my-1 p-2 border-b border-black/30 rounded-lg shadow-lg">
            <Text className="text-lg">Mobile:</Text>
            <TextInput
              placeholder="Mobile"
              value={mobile}
              keyboardType="numeric"
              onChangeText={(text) => handleNumericChange(text, setMobile)}
              maxLength={10}
            />
          </View>
          <View className="my-1 p-2 border-b border-black/30 rounded-lg shadow-lg">
            <Text className="text-lg">Gender:</Text>
            <SelectDropdown
              data={["Male", "Female"]}
              onSelect={(selected, index) => {
                setGender(index + 1);
              }}
            />
          </View>
          <View className="my-1 p-2 border-b border-black/30 rounded-lg shadow-lg">
            <Text className="text-lg">Experience:</Text>
            <TextInput
              placeholder="Experience"
              keyboardType="numeric"
              value={experience}
              onChangeText={(text) => handleNumericChange(text, setExperience)}
              maxLength={10} // Limit to 10 characters
            />
          </View>
          <View className="my-1 p-2 border-b border-black/30 rounded-lg shadow-lg">
            <Text className="text-lg">Specialization:</Text>
            <TextInput
              placeholder="Specialization"
              value={specialization}
              onChangeText={(text) => setSpecialization(text)}
            />
          </View>
          <Button
            className="my-2"
            disabled={!check}
            title="Add"
            onPress={handleAddDoctor}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DoctorForm;
