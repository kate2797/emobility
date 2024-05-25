import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../screens/MapScreen";
import StationScreen from "../screens/detail/StationScreen";
import ChargerScreen from "../screens/detail/ChargerScreen";
import FilterScreen from "../screens/detail/FilterScreen";
import { ROUTES } from "../constants/routes";

const Stack = createStackNavigator(); // Stack navigator for this set of screens

export default function MapStack() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.Map}>
      <Stack.Screen
        name={ROUTES.Map}
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.Filter}
        component={FilterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.Station}
        component={StationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.Charger}
        component={ChargerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
