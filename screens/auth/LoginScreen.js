import { useState } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-paper";
import Header from "../../components/Header";
import stylesheet from "../../styles/stylesheet";
import { GRAY, TEAL } from "../../constants/ui";
import useLogin from "../../hooks/useLogin";
import ButtonLarge from "../../components/ButtonLarge";
import { someFieldsAreMissing } from "../../utils/auth-utils";
import Spinner from "../../components/Spinner";
import { createModalOneOption } from "../../utils/generic-utils";

/**
 * A JSX component representing Login Screen.
 */
export default function LoginScreen({ navigation }) {
  // Local state and hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true); // Allow for the password to be shown or
  const [formError, setFormError] = useState("");
  const [loginUser, isLoading, serviceError] = useLogin(); // Login logic hook

  // Event handlers
  const handleLoginFormSubmit = async () => {
    someFieldsAreMissing(email, password)
      ? setFormError("Fields cannot be blank")
      : loginUser(email, password);
  };

  // Async- and error-handlers
  if (isLoading) {
    return <Spinner />;
  }

  if (serviceError) {
    createModalOneOption("Error", serviceError);
  }

  if (formError) {
    createModalOneOption("Error", formError);
    setFormError("");
  }

  return (
    <KeyboardAvoidingView style={stylesheet.fullHeight}>
      <Header title="Login" navigation={navigation} />
      <View style={stylesheet.authContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={stylesheet.textInput}
          activeUnderlineColor={TEAL}
        />
        <TextInput
          label="Password"
          secureTextEntry={isSecure}
          value={password}
          onChangeText={(password) => setPassword(password)}
          right={
            <TextInput.Icon
              name="eye"
              color={GRAY}
              onPress={() => setIsSecure((prevState) => !prevState)}
            />
          }
          style={stylesheet.textInput}
          activeUnderlineColor={TEAL}
        />
        <ButtonLarge
          text="Login"
          onPress={async () => await handleLoginFormSubmit()}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
