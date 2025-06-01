import { Animated } from "react-native";
import { Answer } from "types";

export interface ScoreBreakdownProps {
    answers: Answer[];
    totalScore: number;
    fadeAnim?: Animated.Value; // Optional animation value
    testID?: string;
  }
  