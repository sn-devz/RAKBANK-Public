import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "navigation/AppNavigator";
import { Animated } from "react-native";
import { Answer, RiskProfileResult } from "types";

export interface UseFadeAnimationProps {
    initialValue?: number;
    duration?: number;
    useNativeDriver?: boolean;
  }
  
  export interface UseFadeAnimationReturn {
    fadeAnim: Animated.Value;
    fadeIn: () => void;
    fadeOut: () => void;
  }
  
  export interface QuestionScreenNavigationProp extends StackNavigationProp<RootStackParamList, "Question"> {}

  export  interface UseResultData {
    result: RiskProfileResult | null;
    answers: Answer[];
    maxScore: number;
    getScoreRangeText: (riskProfile: string) => string;
    fadeAnim: Animated.Value;
    handleRestart: () => void;
  }