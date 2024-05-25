import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import useGlobalStore from "../../stores/useGlobalStore";
import { db } from "../../config/firebase";
import { TextInput } from "react-native-paper";
import { TEAL } from "../../constants/ui";
import ButtonLarge from "../../components/ButtonLarge";
import { setUserBalance } from "../../services/firestore";
import { createModalOneOption } from "../../utils/generic-utils";
import {
  BALANCE_WARNING_INVALID,
  NETWORK_ERROR,
} from "../../constants/messages";

/**
 * A JSX component representing Funds Screen.
 */
export default function FundsScreen({ navigation }) {
  const user = useGlobalStore((state) => state.currentUser);
  const [balance, setBalance] = useState(0);
  const [topUp, setTopUp] = useState(null);
  const [serviceError, setServiceError] = useState("");

  // Side effects
  useEffect(() => {
    const unsubscribeFromFirestore = onSnapshot(
      doc(db, "users", user?.uid),
      (doc) => {
        setBalance(doc.get("balance"));
      },
      () => {
        setServiceError(NETWORK_ERROR);
      }
    );
    return () => {
      unsubscribeFromFirestore(); // Must unsubscribe from the live observer
    };
  }, []);

  // Event handlers
  const handleTopUp = async (topUp) => {
    setServiceError("");
    try {
      let isNotValidInput =
        isNaN(parseFloat(topUp)) ||
        topUp.includes(",") ||
        parseFloat(topUp) < 0; // Not a number, includes a comma
      if (isNotValidInput) {
        createModalOneOption("Warning", BALANCE_WARNING_INVALID);
      } else {
        let newBalance = parseFloat(topUp) + balance;
        await setUserBalance(user?.uid, newBalance);
      }
    } catch (error) {
      setServiceError(NETWORK_ERROR);
    } finally {
      setTopUp(""); // Clear the selection
    }
  };

  if (serviceError) {
    createModalOneOption("Error", serviceError);
  }

  return (
    <>
      <Header title="Manage Funds" navigation={navigation} />
      <View style={styles.container}>
        {balance !== undefined ? (
          <Text>Your current balance is £{balance}</Text>
        ) : null}
        <View style={styles.fundsContainer}>
          <TextInput
            label="£"
            value={topUp}
            onChangeText={(amount) => setTopUp(amount)}
            style={styles.fundsInput}
            activeUnderlineColor={TEAL}
          />
          <ButtonLarge text="Top-up" onPress={() => handleTopUp(topUp)} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
  },
  fundsContainer: {
    marginTop: 40,
    alignItems: "center",
    width: "103%",
  },
  fundsInput: {
    marginBottom: 5,
    width: "80%",
  },
  balance: {
    marginBottom: 10,
  },
});
