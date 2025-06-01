import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    optionButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background.disabled,
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border.light,
      justifyContent: "space-between",
    },
    selectedOption: {
      backgroundColor: colors.background.selected,
      borderColor: colors.primary.main,
    },
    optionText: {
      fontSize: 16,
      color: colors.text.primary,
      flex: 1,
      marginRight: 10,
      fontFamily: "System",
    },
    selectedOptionText: {
      color: colors.primary.main,
      fontFamily: "System",
    },
    radioButton: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#ccc",
      justifyContent: "center",
      alignItems: "center",
    },
    radioButtonSelected: {
      borderColor: "#007AFF",
    },
    radioButtonInner: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#007AFF",
    },
  });