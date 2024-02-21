import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryList from "../Components/CategoryList";
import DoctorCard from "../Components/DoctorCard";
import Header from "../Components/Header";
import FooterMenu from "../Components/FooterMenu";

export default function HomeScreen() {
  const dummy_data = [
    { title: "Category 01" },
    { title: "Category 11" },
    { title: "Category 21" },
  ];
  const dummy_doc = [
    { id: 1, name: "Doctor 1", specialization: "Skin", available: true },
    { id: 2, name: "Doctor 2", specialization: "Heart", available: false },
    { id: 3, name: "Doctor 3", specialization: "Bones", available: true },
  ];

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 bg-background">
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Home Page */}
          <View>
            {/* Home Icon */}
            <View>
              <Image
                source={require("../../assets/Icon/Home_Screen.jpeg")}
                className="h-48 w-full"
              />
            </View>

            {/* Category */}
            <View>
              <Text className="font-bold text-xl py-3">Select Category</Text>
              <ScrollView horizontal>
                <CategoryList data={dummy_data} />
              </ScrollView>
            </View>

            {/* Top Rated Doctors */}
            <View>
              <Text className="font-bold text-xl py-3">Top Rated Doctors</Text>
              <ScrollView>
                <DoctorCard docList={dummy_doc} />
              </ScrollView>
            </View>
          </View>
        </ScrollView>
        <FooterMenu />
      </SafeAreaView>
    </>
  );
}
