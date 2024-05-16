import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SelectDropDown from "react-native-select-dropdown";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Auth from "../../test.api";
import { useLoggedIn } from "../Context/useLoggedIn";
import getScreen from "../utility/getScreen";
import { useFocusEffect } from "@react-navigation/native";

// Icon
import Hide from "../../assets/Icon/hide.png";
import Show from "../../assets/Icon/show.png";

export default function SignupScreen({ navigation }) {
  const [isLogged, setIsLogged] = useContext(useLoggedIn);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState(3);
  //1- admin 2- doctor 3- patient
  const [gender, setGender] = useState(1);
  const [hide, setHide] = useState(true);
  const [error, setError] = useState({});

  // useFocusEffect(
  //   useCallback(() => {
  //     async function check() {
  //       const token = await AsyncStorage.setItem("token", token);
  //       const loggedUser = await AsyncStorage.setItem(
  //         "loggedUser",
  //         JSON.stringify(response.data?.user)
  //       );
  //       const role = await AsyncStorage.setItem(
  //         "role",
  //         String(response.data?.user?.role)
  //       );
  //       if (token && loggedUser && role)
  //         await navigation.replace(await getScreen());
  //     }
  //     check();
  //   }, [])
  // );

  async function handleSubmit() {
    // Check validation;
    if (name.trim() === "") {
      setError({ from: "name", msg: "Name is required!" });
      return;
    }
    if (mobile.trim() === "") {
      setError({ from: "mobile", msg: "mobile is required!" });
      return;
    }
    if (password.trim() === "") {
      setError({ from: "password", msg: "Password is required!" });
      return;
    }

    try {
      const response = await axios.post(Auth.Auth.register, {
        name,
        mobile,
        password,
        role: 3,
        gender,
      });
      if (response.status == 201) {
        let token = response.data?.token;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem(
          "loggedUser",
          JSON.stringify(response.data?.user)
        );
        await AsyncStorage.setItem("role", String(response.data?.user?.role));
        await setIsLogged(true);
        await navigation.replace(await getScreen());
      }
    } catch (error) {
      console.log("Error Signing in:", error, error?.err);
      await AsyncStorage.removeItem("token").catch((err) => console.log(err));
      await AsyncStorage.removeItem("loggedUser").catch((err) =>
        console.log(err)
      );
      await AsyncStorage.removeItem("role");
      await setIsLogged(false);
    }
  }

  return (
    <SafeAreaView className="p-1 flex-1 bg-background">
      <StatusBar style="dark" />
      <View className="flex-1 justify-center items-center">
        {/* Image */}
        <View className="my-2">
          <Image
            source={require("../../assets/images/Signup.png")}
            className="h-28 w-40"
          />
        </View>

        <View className="my-2 w-full">
          <Text className="text-center text-3xl font-bold">Sign Up</Text>

          {/* Inputs */}
          <View className="mx-auto my-2 w-2/3">
            <TextInput
              value={name}
              onChangeText={(name) => setName(name)}
              placeholder="Full Name"
              className="p-2 text-black text-base border border-black/50 rounded-lg"
            />
            {error && error?.from === "name" && (
              <Text className="text-xm text-red-600">{error?.msg}</Text>
            )}
          </View>

          <View className="mx-auto my-2 w-2/3">
            <TextInput
              value={mobile}
              onChangeText={(mobile) => setMobile(mobile)}
              inputMode="tel"
              placeholder="Enter mobile number"
              className="p-2 text-black text-base border border-black/50 rounded-lg"
            />
            {error && error?.from === "mobile" && (
              <Text className="text-xm text-red-600">{error?.msg}</Text>
            )}
          </View>

          <View className="mx-auto my-2 w-2/3">
            <TextInput
              value={password}
              onChangeText={(pass) => setPassword(pass)}
              secureTextEntry={hide}
              placeholder="Enter password"
              className="p-2 text-black text-base border border-black/50 rounded-lg"
            />
            <TouchableOpacity onPress={() => setHide(!hide)}>
              <Image
                source={hide ? Hide : Show}
                className="absolute h-8 w-8 bottom-2 right-2 opacity-50"
              />
            </TouchableOpacity>

            {error && error?.from === "password" && (
              <Text className="text-xm text-red-600">{error?.msg}</Text>
            )}
          </View>

          <View className="mx-auto my-2 w-2/3">
            {/* <SelectDropDown
              data={["Doctor", "Patient"]}
              onSelect={(selectedItem, index) => {
                setRole(index + 2);
              }}
              buttonTextAfterSelection={(selectedItem) => selectedItem}
              rowTextForSelection={(item) => item}
              defaultButtonText={role == 1 ? "Doctor" : "Patient"}
              buttonTextStyle={{ color: "black", fontWeight: 400 }}
              buttonStyle={{
                width: "100%",
                backgroundColor: "#f3fbfe",
                padding: 2,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "black",
                borderRadius: 100,
              }}
              dropdownStyle={{ borderRadius: 10 }}
              selectedRowStyle={{
                backgroundColor: "blue",
                borderRadius: 10,
              }}
              selectedRowTextStyle={{ color: "white" }}
            /> */}
            <Text className="w-full p-2 rounded border border-black/40 font-semibold">
              Patient
            </Text>
          </View>

          <View className="mx-auto my-2 w-2/3">
            <SelectDropDown
              data={["Male", "Female"]}
              onSelect={(selectedItem, index) => {
                setGender(index + 1);
              }}
              buttonTextAfterSelection={(selectedItem) => selectedItem}
              rowTextForSelection={(item) => item}
              defaultButtonText={gender == 1 ? "Male" : "Female"}
              buttonTextStyle={{ color: "black", fontWeight: 400 }}
              buttonStyle={{
                width: "100%",
                backgroundColor: "#f3fbfe",
                padding: 2,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "black",
                borderRadius: 100,
              }}
              dropdownStyle={{ borderRadius: 10 }}
              selectedRowStyle={{
                backgroundColor: "blue",
                borderRadius: 10,
              }}
              selectedRowTextStyle={{ color: "white" }}
            />
          </View>

          <TouchableOpacity
            className="mx-auto my-2 w-2/3"
            onPress={handleSubmit}
          >
            <Text
              className="p-2 text-xl text-center text-white text-bold bg-blue-600 rounded-xl"
              style={{ elevation: 5 }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Registe Route */}
        <View className="my-2 mx-auto">
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text className="text-base">
              Already have an account?
              <Text className="text-base text-blue-500"> Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
