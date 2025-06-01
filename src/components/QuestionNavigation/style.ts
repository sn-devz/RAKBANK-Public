import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  previousButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  previousText: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: "System",
  },
  nextButton: {
    borderRadius: 8,
    overflow: "hidden",
  },
  nextButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  nextButtonText: {
    color: colors.text.white,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
    fontFamily: "System",
  },
});