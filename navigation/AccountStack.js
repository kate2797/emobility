import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "../constants/routes";
import LandingScreen from "../screens/auth/LandingScreen";
import AccountScreen from "../screens/AccountScreen";
import FundsScreen from "../screens/detail/FundsScreen";
import BookmarksScreen from "../screens/detail/BookmarksScreen";
import StationScreen from "../screens/detail/StationScreen";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.Account}>
      <Stack.Screen
        name={ROUTES.Account}
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.Landing}
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.Funds}
        component={FundsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.Bookmarks}
        component={BookmarksScreen}
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
