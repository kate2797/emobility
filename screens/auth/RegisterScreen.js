import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { TextInput, Provider, Checkbox } from "react-native-paper";
import DropDown from "react-native-paper-dropdown"; // Reference: https://www.npmjs.com/package/react-native-paper-dropdown
import Header from "../../components/Header";
import stylesheet from "../../styles/stylesheet";
import { GRAY, TEAL } from "../../constants/ui";
import useRegister from "../../hooks/useRegister";
import useCars from "../../hooks/useCars";
import ButtonLarge from "../../components/ButtonLarge";
import usePersistentStore from "../../stores/usePersistentStore";
import {
  emailHasErrors,
  passwordIsTooShort,
  someFieldsAreMissing,
} from "../../utils/auth-utils";
import Spinner from "../../components/Spinner";
import { createModalOneOption } from "../../utils/generic-utils";

/**
 * A JSX component representing Register Screen.
 */
export default function RegisterScreen({ navigation }) {
  // Local form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [chosenCar, setChosenCar] = useState(null);
  const [formError, setFormError] = useState("");

  // Local UI state
  const [showModelDropdown, setShowModelDropdown] = useState(false); // Control the dropdown logic
  const [showMakeDropdown, setShowMakeDropdown] = useState(false);
  const [isSecure, setIsSecure] = useState(true); // Allow for the password to be shown or hidden

  // Global state
  const setFilters = usePersistentStore((state) => state.setFilters); // Set the filters to persist at registration time

  // Hooks
  const [registerUser, isLoading, serviceError] = useRegister(); // Registration logic
  const [getMakeList, getModelListForMake, getCarDetails] = useCars();

  // Event handlers
  const handleRegisterFormSubmit = async () => {
    if (someFieldsAreMissing(fullName, email, password, make, model)) {
      setFormError("Fields cannot be blank"); // Validate input before moving on
    } else {
      registerUser(fullName, email, password, chosenCar);
    }
  };

  // Side effects
  useEffect(() => {
    // Run this effect when we got both model and make off the user
    if (make && model) {
      const { id, connectors } = getCarDetails(make, model); // Obtain car details based on what they selected
      setChosenCar({
        id: id,
        make,
        model,
        connectors: connectors,
      }); // Store the values collected from the form in local state
    }
  }, [make, model]); // Will run whenever any of these change

  useEffect(() => {
    // Run this effect when the state for `chosenCar` updates, React state updates are async, we must wait for it
    if (chosenCar) {
      // Once it updates, persist the state of the selection, to always get the latest update
      setFilters({
        connectors: chosenCar.connectors,
        speed: ["slow", "fast", "turbo"],
      });
    }
  }, [chosenCar]);

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
    <>
      <Provider>
        <Header title="Register" navigation={navigation} />
        <SafeAreaView edges={["top"]} style={stylesheet.safeArea}>
          <ScrollView>
            <View style={stylesheet.authContainer}>
              {/* Personal details input */}
              <View style={styles.dropdownContainer}>
                <TextInput
                  label="Full Name"
                  value={fullName}
                  onChangeText={(text) => setFullName(text)}
                  style={stylesheet.textInputPlain}
                  activeUnderlineColor={TEAL}
                />
                <TextInput
                  label={
                    emailHasErrors(email) ? "Email must include @" : "Email"
                  }
                  value={email}
                  error={emailHasErrors(email)}
                  onChangeText={setEmail}
                  style={stylesheet.textInputPlain}
                  activeUnderlineColor={TEAL}
                />
                <TextInput
                  label={
                    passwordIsTooShort(password)
                      ? "Password must have 6 characters"
                      : "Password"
                  }
                  secureTextEntry={isSecure}
                  value={password}
                  error={passwordIsTooShort(password)}
                  onChangeText={(password) => setPassword(password)}
                  right={
                    <TextInput.Icon
                      name="eye"
                      color={GRAY}
                      onPress={() => setIsSecure((prevState) => !prevState)}
                    />
                  }
                  style={stylesheet.textInputPlain}
                  activeUnderlineColor={TEAL}
                />
                {/* EV input */}
                <View style={styles.dropdown}>
                  <DropDown
                    label={"EV Make"}
                    mode="flat"
                    activeColor={TEAL}
                    value={make}
                    setValue={setMake}
                    visible={showMakeDropdown}
                    showDropDown={() => setShowMakeDropdown(true)}
                    onDismiss={() => setShowMakeDropdown(false)}
                    list={getMakeList()}
                  />
                </View>
                <View style={styles.dropdown}>
                  <DropDown
                    label={"EV Model"}
                    mode="flat"
                    activeColor={TEAL}
                    value={model}
                    setValue={setModel}
                    visible={showModelDropdown}
                    showDropDown={() => setShowModelDropdown(true)}
                    onDismiss={() => setShowModelDropdown(false)}
                    list={getModelListForMake(make)}
                  />
                </View>
                <Checkbox.Item
                  color={TEAL}
                  label="This EV is set as your default"
                  status={"checked"}
                  disabled={true}
                  labelStyle={{ textAlign: "center" }}
                />
              </View>
              <ButtonLarge
                text="Register"
                onPress={async () => await handleRegisterFormSubmit()}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownContainer: {
    width: "80%",
    justifyContent: "center",
  },
  dropdown: {
    marginBottom: 20,
  },
});
