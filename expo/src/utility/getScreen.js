import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getScreen() {
  const role = await AsyncStorage.getItem("role");
  console.log("Role: ", role);

  if (role == 1) return "AdminHome";
  else if (role == 2) return "DoctorHome";
  else if (role == 3) return "Home";
  else return "Login";
}
