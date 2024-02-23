import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
// Icon
import Hide from "../../assets/Icon/hide.png";
import Show from "../../assets/Icon/show.png";

export default function LoginScreen(props) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(false);
  const [error, setError] = useState();

  async function handleSubmit() {
    // Check validation;
    if (mobile.trim() === "") {
      setError({ from: "email", msg: "Email is required!" });
      return;
    }
    if (password.trim() === "") {
      setError({ from: "password", msg: "Password is required!" });
      return;
    }

    // Process the request
    console.log(mobile, password);
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
          <TouchableOpacity onPress={() => props.navigation.replace("Signup")}>
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
