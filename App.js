import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/Screens/WelcomeScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import AppointmentScreen from "./src/Screens/AppointmentScreen";
import FormScreen from "./src/Screens/FormScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Appointments" component={AppointmentScreen} />
        <Stack.Screen name="AppointmentForm" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
