import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  withTiming,
  useSharedValue,
  Easing,
} from "react-native-reanimated";
import URL from "../../../test.api";
import axios from "axios";
// Custom components
import CategoryList from "../../Components/CategoryList";
import DoctorCard from "../../Components/DoctorCard";
import Header from "../../Components/Header";
import FooterMenu from "../../Components/FooterMenu";

export default function HomeScreen() {
  const [docList, setDoctList] = useState([]);
  const [specialization, setSpecialization] = useState([]);

  useEffect(() => {
    async function fetchSpecialization() {
      try {
        const response = await axios.get(URL.Doctor.getSpecialization);
        // console.log("specialization", response.data);
        if (response.status == 200) {
          setSpecialization(response.data?.category);
        }
      } catch (err) {
        console.log(err);
      }
    }

    async function fetchDoctorList() {
      try {
        const response = await axios.get(URL.Doctor.getDoctors);
        // console.log(response?.data);
        if (response.status == 200) {
          setDoctList(response.data.doctorList);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchDoctorList();
    fetchSpecialization();
  }, []);
  const CategoryX = useSharedValue(360);

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
                source={require("../../../assets/Icon/Home_Screen.jpeg")}
                className="h-48 w-full"
              />
            </View>

            {/* Category */}
            {specialization && (
              <View>
                <Text className="font-bold text-xl py-3">Select Category</Text>
                <Animated.ScrollView horizontal style={{ left: CategoryX }}>
                  <CategoryList data={specialization} />
                </Animated.ScrollView>
              </View>
            )}

            {/* Top Rated Doctors */}
            <View>
              <Text className="font-bold text-xl py-3">Top Rated Doctors</Text>
              <ScrollView>
                {docList && <DoctorCard docList={docList} />}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
        <FooterMenu />
      </SafeAreaView>
    </>
  );
}
