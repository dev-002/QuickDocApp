import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  withTiming,
  useSharedValue,
  Easing,
} from "react-native-reanimated";

// Custom components
import CategoryList from "../Components/CategoryList";
import DoctorCard from "../Components/DoctorCard";
import Header from "../Components/Header";
import FooterMenu from "../Components/FooterMenu";

export default function HomeScreen() {
  const CategoryX = useSharedValue(360);

  const dummy_data = [
    { id: 1, title: "Bones Spcecialist" },
    { id: 2, title: "Skin Spcecialist" },
    { id: 3, title: "Heart Spcecialist" },
  ];
  const dummy_doc = [
    { id: 1, name: "Doctor 1", specialization: "Skin", available: true },
    { id: 2, name: "Doctor 2", specialization: "Heart", available: false },
    { id: 3, name: "Doctor 3", specialization: "Bones", available: true },
  ];

  useEffect(() => {
    CategoryX.value = 360;
    setTimeout(() => {
      CategoryX.value = withTiming(0, {
        duration: 1000,
        easing: Easing.ease,
      });
    });
  }, []);
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
              <Animated.ScrollView horizontal style={{ left: CategoryX }}>
                <CategoryList data={dummy_data} />
              </Animated.ScrollView>
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
