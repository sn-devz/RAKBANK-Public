import { StyleSheet } from "react-native";
import { colors } from "utils/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.screen,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: colors.background.main,
    borderRadius: 20,
    padding: 28,
    marginBottom: 28,
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    alignItems: "center",
  },
  scoreCard: {
    width: "100%",
    backgroundColor: colors.background.main,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
});