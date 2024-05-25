import { StyleSheet } from "react-native";
import {
  BUTTON_HEIGHT,
  FONT_BODY,
  BACKGROUND,
  SIDE_MARGIN,
} from "../constants/ui";

/**
 * A module for a global stylesheet.
 */
export default StyleSheet.create({
  button: {
    marginTop: 20,
    justifyContent: "center",
    width: "80%",
    height: BUTTON_HEIGHT,
    borderRadius: 30,
  },
  buttonContentStyle: {
    height: BUTTON_HEIGHT,
    borderRadius: 30,
  },
  buttonSmall: {
    includeFontPadding: false,
    borderRadius: 30,
  },
  chargerText: {
    fontSize: FONT_BODY,
  },
  textInput: {
    marginBottom: 20,
    width: "80%",
  },
  textInputPlain: {
    marginBottom: 20,
  },
  authContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerCentered: {
    flex: 1,
    alignItems: "center",
  },
  helperText: {
    marginLeft: 5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
    marginBottom: 16,
  },
  safeAreaNoMargin: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  filterContainer: {
    marginBottom: 20,
  },
  spinner: {
    zIndex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  divider: {
    marginTop: SIDE_MARGIN,
    marginBottom: SIDE_MARGIN,
  },
  fullHeight: {
    height: "100%",
  },
  cardView: {
    marginRight: 16,
    marginLeft: 16,
  },
  card: {
    marginTop: 16,
    marginBottom: 3,
  },
  cardItem: {
    marginBottom: 10,
  },
});
