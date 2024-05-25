import { Avatar, List } from "react-native-paper";
import { StyleSheet } from "react-native";

/**
 * A JSX component representing a user's avatar.
 */
export default function UserAvatar({ displayName }) {
  return (
    <>
      {displayName && (
        <>
          <Avatar.Text
            size={64}
            label={displayName.charAt(0)}
            style={styles.avatar}
          />
          <List.Subheader style={styles.avatar}>{displayName}</List.Subheader>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginBottom: 15,
  },
});
