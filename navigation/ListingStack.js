import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "../constants/routes";
import StationScreen from "../screens/detail/StationScreen";
import ListingScreen from "../screens/ListingScreen";

const Stack = createStackNavigator();

export default function ListingStack() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.Listing}>
      <Stack.Screen
        name={ROUTES.Listing}
        component={ListingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.Station}
        component={StationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
