import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
import { QuestionCardProps } from "./type";

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  children,
  testID,
}) => {
  return (
    <View style={styles.questionCard} testID={testID}>
      <Text style={styles.progressText}>
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </Text>

      <Text style={styles.questionText}>{question.text}</Text>

      <View style={styles.optionsContainer}>{children}</View>
    </View>
  );
};

export default QuestionCard;
