import { Animated } from "react-native";

export interface ResultButtonsProps {
    onTakeAgain: () => void;
    onContinue?: () => void; // Optional continue action
    fadeAnim?: Animated.Value; // Optional animation value
    testID?: string;
  }