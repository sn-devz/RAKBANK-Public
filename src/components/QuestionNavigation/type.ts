import { Animated } from "react-native";

export interface QuestionNavigationProps {
    onPrevious: () => void;
    onNext: () => void;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
    hasAnswer: boolean;
    fadeAnim?: Animated.Value;
    testID?: string;
  }
  