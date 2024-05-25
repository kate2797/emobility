import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "../screens/auth/LandingScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import AppTab from "./AppTab";
import { ROUTES } from "../constants/routes";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.Landing}>
      <Stack.Screen
        name={ROUTES.Landing}
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.Register}
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.Login}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.AppTab}
        component={AppTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
