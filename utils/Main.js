import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper"; // Reference: https://callstack.github.io/react-native-paper/getting-started.html
import { StatusBar } from "expo-status-bar";
import { name as appName } from "../app.json";
import App from "../App";

/**
 * A JSX component to register the application with Expo and the UI theme provider.
 */
function Main() {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
