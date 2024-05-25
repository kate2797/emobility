import { View } from "react-native";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import stylesheet from "../../styles/stylesheet";
import { ROUTES } from "../../constants/routes";
import ButtonLarge from "../../components/ButtonLarge";

/**
 * A JSX component representing Landing Screen.
 */
export default function LandingScreen({ navigation }) {
  return (
    <View>
      <Header title="Plugmatic" />
      <View style={stylesheet.authContainer}>
        <Logo subtitle="Find and book charge points in your area" />
        <ButtonLarge
          text="Login"
          onPress={() => navigation.navigate(ROUTES.Login)}
        />
        <ButtonLarge
          text="Register"
          onPress={() => navigation.navigate(ROUTES.Register)}
        />
      </View>
    </View>
  );
}
