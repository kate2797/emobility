import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./navigation/AuthStack";
import AppTab from "./navigation/AppTab";
import { ROUTES } from "./constants/routes";
import useCurrentUser from "./hooks/useCurrentUser";

/**
 * A JSX component representing the entire mobile application.
 */
export default function App() {
  const Stack = createStackNavigator();
  const [currentUser] = useCurrentUser(); // User auth logic

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUser ? (
          <Stack.Screen
            name={ROUTES.AppTab}
            component={AppTab}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name={ROUTES.AuthStack}
            component={AuthStack}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
