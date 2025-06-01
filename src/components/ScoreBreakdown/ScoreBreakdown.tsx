import React from "react";
import { View, Animated } from "react-native";
import { Text } from "react-native-paper";
import { QUESTIONS } from "../../constants/questions";
import { styles } from "./style";
import { ScoreBreakdownProps } from "./type";

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({
  answers,
  totalScore,
  fadeAnim,
  testID,
}) => {
  const breakdownStyles = [
    styles.container,
    fadeAnim ? { opacity: fadeAnim } : {},
  ];

  return (
    <Animated.View style={breakdownStyles} testID={testID}>
      <Text style={styles.title}>Score Breakdown:</Text>
      {QUESTIONS.map((question) => {
        const userAnswer = answers.find(
          (ans) => ans.questionId === question.id
        );
        return (
          <View key={question.id} style={styles.row}>
            <Text
              style={styles.questionText}
            >{`Question ${question.id}:`}</Text>
            <Text style={styles.scoreText}>{`${
              userAnswer ? userAnswer.score : 0
            } points`}</Text>
          </View>
        );
      })}
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total Score:</Text>
        <Text style={styles.totalScoreText}>{`${totalScore} points`}</Text>
      </View>
    </Animated.View>
  );
};

export default ScoreBreakdown;
