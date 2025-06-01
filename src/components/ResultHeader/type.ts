import { Animated } from "react-native";
import { Answer, RiskProfileResult } from "types";

export interface ResultHeaderProps {
    result: RiskProfileResult | null;
    answers: Answer[];
    fadeAnim: Animated.Value;
    testID?: string;
  }
  