import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.text.primary,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 5,
    color: colors.text.primary,
  },
  rangeText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
});