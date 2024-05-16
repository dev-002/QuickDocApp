import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SelectDropDown from "react-native-select-dropdown";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../../test.api";
import { useLoggedIn } from "../Context/useLoggedIn";

// Icon
import Hide from "../../assets/Icon/hide.png";
import Show from "../../assets/Icon/show.png";
import getScreen from "../utility/getScreen";
import { useFocusEffect } from "@react-navigation/native";

export default function LoginScreen({ navigation }) {
  const [isLogged, setIsLogged] = useContext(useLoggedIn);

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(true);
  const [error, setError] = useState();
  const [role, setRole] = useState(3);
  //1- admin 2- doctor 3- patient

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
  //       console.log("Hey", token, loggedUser, role);
  //       if (token && loggedUser && role)
  //         await navigation.replace(await getScreen());
  //     }
  //     check();
  //   }, [])
  // );

  async function handleSubmit() {
    // Check validation;
    if (mobile.trim() === "") {
      setError({ from: "email", msg: "Email is required!" });
    }
    if (password.trim() === "") {
      setError({ from: "password", msg: "Password is required!" });
      return;
    }
    try {
      const response = await axios.post(URL.Auth.login, {
        mobile,
        password,
        role,
      });
      console.log("LoginResponse: ", response.data);
      if (response.status == 200) {
        console.log(response.data, typeof response.data);
        let token = response.data.token;
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
      console.log("Error Signing in:", error);
      await AsyncStorage.removeItem("token").catch((err) => console.log(err));
      await AsyncStorage.removeItem("loggedUser").catch((err) =>
        console.log(err)
      );
      await AsyncStorage.removeItem("role").catch((err) => console.log(err));
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
            source={require("../../assets/images/Login.png")}
            className="h-28 w-40"
          />
        </View>

        <View className="my-2 w-full">
          <Text className="text-center text-3xl font-bold">Login</Text>

          {/* Inputs */}
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
            <SelectDropDown
              data={["Doctor", "Patient"]}
              onSelect={(selectedItem, index) => {
                setRole(index + 2);
              }}
              buttonTextAfterSelection={(selectedItem) => selectedItem}
              rowTextForSelection={(item) => item}
              defaultButtonText={role == 2 ? "Doctor" : "Patient"}
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
              Login
            </Text>
          </TouchableOpacity>
        </View>

        {/* Registe Route */}
        <View className="my-2 mx-auto">
          <TouchableOpacity onPress={() => navigation.replace("Signup")}>
            <Text className="text-base">
              Don't have an account?
              <Text className="text-base text-blue-500"> Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
