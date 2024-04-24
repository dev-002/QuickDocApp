import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
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
import CategoryList from "./subcomponents/CategoryList";
import DoctorCard from "./subcomponents/DoctorCard";
import Header from "../../Components/Header";
import FooterMenu from "../../Components/FooterMenu";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [docList, setDoctList] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [activeSpec, setActiveSpec] = useState("all");
  const CategoryX = useSharedValue(360);

  useFocusEffect(
    useCallback(() => {
      CategoryX.value = 360;
      setTimeout(() => {
        CategoryX.value = withTiming(0, {
          duration: 1000,
          easing: Easing.ease,
        });
      });
      async function fetchSpecialization() {
        try {
          const response = await axios.get(URL.Doctor.getSpecialization);
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
          if (response.status == 200) {
            setDoctList(response.data?.doctorList);
          }
        } catch (err) {
          console.log(err);
        }
      }

      fetchDoctorList();
      fetchSpecialization();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      async function fetchSpecificSpec() {
        try {
          setLoading(true);
          const patient = await JSON.parse(
            await AsyncStorage.getItem("loggedUser")
          );
          const response = await axios.get(
            URL.Profile.getSpecificScpecialization,
            {
              headers: { patientId: patient._id },
              params: {
                specialization: activeSpec,
              },
            }
          );
          if (response.status === 200) {
            setDoctList(response.data?.doctorList);
            setLoading(false);
          }
        } catch (err) {
          console.log("Error fetching category", err);
          Alert.alert(`Error fetching ${activeSpec} Doctors`);
          setLoading(false);
        }
      }
      fetchSpecificSpec();
    }, [activeSpec])
  );
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 px-1 bg-background">
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

            {loading ? (
              <ActivityIndicator size={"large"} animating={loading} />
            ) : (
              <>
                {/* Category */}
                {specialization && (
                  <View>
                    <Text className="font-bold text-xl py-3">
                      Select Category
                    </Text>
                    <Animated.ScrollView horizontal style={{ left: CategoryX }}>
                      <CategoryList
                        setActiveSpec={setActiveSpec}
                        activeSpec={activeSpec}
                        data={specialization}
                      />
                    </Animated.ScrollView>
                  </View>
                )}

                {/* Top Rated Doctors */}
                <View>
                  <Text className="font-bold text-xl py-3">
                    Top Rated Doctors
                  </Text>
                  <ScrollView>
                    {docList && <DoctorCard docList={docList} />}
                  </ScrollView>
                </View>
              </>
            )}
          </View>
        </ScrollView>
        <FooterMenu />
      </SafeAreaView>
    </>
  );
}
