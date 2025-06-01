import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    questionCard: {
      backgroundColor: colors.background.main,
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
    },
    progressText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text.secondary,
      marginBottom: 20,
      textAlign: "center",
      fontFamily: "System",
    },
    questionText: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      color: colors.text.primary,
      fontFamily: "System",
    },
    optionsContainer: {
      // No specific styles needed here for layout, children are handled by their own styles
    },
  });