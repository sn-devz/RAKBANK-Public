import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  buttonsContainer: {
    width: "100%",
  },
  takeAgainButtonContainer: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  buttonGradient: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.text.white,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "System",
  },
  continueButton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary.main,
    marginBottom: 30,
  },
  continueButtonText: {
    color: colors.primary.main,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "System",
  },
});