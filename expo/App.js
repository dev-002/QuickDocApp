import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Context
import UseLoggedInContex from "./src/Context/useLoggedIn";

// Screens
import WelcomeScreen from "./src/Screens/WelcomeScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import SignupScreen from "./src/Screens/SignupScreen";
// Patient
import HomeScreen from "./src/Screens/Patient/HomeScreen";
import AppointmentScreen from "./src/Screens/Patient/AppointmentScreen";
import FormScreen from "./src/Screens/Patient/FormScreen";
import AppointmentListScreen from "./src/Screens/Patient/AppointmentListScreen";
import AmbulanceEmergencyScreen from "./src/Screens/Patient/AmbulanceEmergencyScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
// Doctor
import DoctorHomeScreen from "./src/Screens/Doctor/DoctorHomeScreen";
// Admin
import AdminScreen from "./src/Screens/Admin/AdminScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UseLoggedInContex>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          {/* Patient */}
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
          <Stack.Screen name="Profile" component={ProfileScreen} />

          {/* Doctor */}
          <Stack.Screen name="DoctorHome" component={DoctorHomeScreen} />

          {/* Admin */}
          <Stack.Screen name="Admin" component={AdminScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UseLoggedInContex>
  );
}
