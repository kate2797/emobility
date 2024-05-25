import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BookingHistoryScreen from "../screens/BookingHistoryScreen";
import MapStack from "./MapStack";
import AccountStack from "./AccountStack";
import ListingStack from "./ListingStack";
import { ROUTES } from "../constants/routes";

const Tab = createMaterialBottomTabNavigator(); // Reference: https://reactnavigation.org/docs/material-bottom-tab-navigator/

export default function AppTab() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.MapStack}
      barStyle={{ backgroundColor: "#0F5156" }}
      labeled={false}
      options={{
        headerForceInset: { top: "never", bottom: "never" },
      }}
    >
      <Tab.Screen
        name={ROUTES.MapStack}
        component={MapStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.ListingStack}
        component={ListingStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.Bookings}
        component={BookingHistoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-today"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.AccountStack}
        component={AccountStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
