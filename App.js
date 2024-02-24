import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Screens
import WelcomeScreen from "./src/Screens/WelcomeScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import AppointmentScreen from "./src/Screens/AppointmentScreen";
import FormScreen from "./src/Screens/FormScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import SignupScreen from "./src/Screens/SignupScreen";
import AppointmentListScreen from "./src/Screens/AppointmentListScreen";
import AmbulanceEmergencyScreen from "./src/Screens/AmbulanceEmergencyScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Appointments" component={AppointmentScreen} />
        <Stack.Screen name="AppointmentForm" component={FormScreen} />
        <Stack.Screen
          name="AppointmentList"
          component={AppointmentListScreen}
        />
        <Stack.Screen
          name="AmbulanceEmergency"
          component={AmbulanceEmergencyScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
