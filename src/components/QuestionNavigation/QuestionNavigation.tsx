import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./style";
import { QuestionNavigationProps } from "./type";
import { colors, getButtonGradient } from "../../utils/colors";

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  onPrevious,
  onNext,
  isFirstQuestion,
  isLastQuestion,
  fadeAnim,
  testID,
  hasAnswer,
}) => {
  return (
    <Animated.View
      style={[styles.container, fadeAnim ? { opacity: fadeAnim } : {}]}
      testID={testID}
    >
      <TouchableOpacity
        onPress={onPrevious}
        disabled={isFirstQuestion}
        style={[styles.previousButton, isFirstQuestion && { opacity: 0.5 }]}
        testID="previous-button"
      >
        <AntDesign
          name="arrowleft"
          size={18}
          color={isFirstQuestion ? colors.text.disabled : colors.text.secondary}
        />
        <Text
          style={[
            styles.previousText,
            {
              color: isFirstQuestion
                ? colors.text.disabled
                : colors.text.secondary,
            },
          ]}
        >
          Previous
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onNext}
        style={[styles.nextButton, !hasAnswer && { opacity: 0.5 }]}
        disabled={!hasAnswer}
        testID="next-button"
      >
        <LinearGradient
          colors={getButtonGradient()}
          style={styles.nextButtonGradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={styles.nextButtonText}>
            {isLastQuestion ? "Complete" : "Next"}
          </Text>
          <AntDesign name="arrowright" size={18} color={colors.text.white} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default QuestionNavigation;
