import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
import useLogout from "../hooks/useLogout";
import useGlobalStore from "../stores/useGlobalStore";
import ButtonLarge from "../components/ButtonLarge";
import UserAvatar from "../components/UserAvatar";
import { ROUTES } from "../constants/routes";
import Spinner from "../components/Spinner";
import { createModalOneOption } from "../utils/generic-utils";

/**
 * A JSX component representing Account Screen.
 */
export default function AccountScreen({ navigation }) {
  const user = useGlobalStore((state) => state.currentUser);
  const [logoutUser, isLoading, serviceError] = useLogout(); // Hook with logout logic

  // Async- and error-handlers
  if (isLoading) {
    return <Spinner />;
  }

  if (serviceError) {
    createModalOneOption("Error", serviceError);
  }

  return (
    <>
      <Header title="Account" />
      <View style={styles.container}>
        {user ? <UserAvatar displayName={user.displayName} /> : null}
        <ButtonLarge
          text="Manage funds"
          onPress={() => navigation.navigate(ROUTES.Funds)}
        />
        <ButtonLarge
          text="Bookmarked stations"
          onPress={() => navigation.navigate(ROUTES.Bookmarks)}
        />
        <ButtonLarge text="Logout" onPress={async () => await logoutUser()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
