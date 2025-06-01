import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  riskLevelContainer: {
    width: "100%",
    marginBottom: 40,
  },
  riskLevelItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  riskLevelTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  riskLevelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 5,
  },
  riskLevelDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});