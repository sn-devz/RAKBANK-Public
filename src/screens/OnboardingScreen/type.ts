import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "navigation/AppNavigator";

export type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Question"
>;
