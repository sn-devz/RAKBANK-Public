import { Animated } from "react-native";

export interface ResultDescriptionProps {
  description: string;
  fadeAnim?: Animated.Value; // Optional animation value
  testID?: string;
}