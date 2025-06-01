import React from "react";
import { View, Text, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./style";
import { ResultHeaderProps } from "./type";
import { colors } from "../../utils/colors";
import * as constants from "../../constants/questions";
import ResultLabel from "../ResultLabel/ResultLabel";
import { RiskProfile } from "types";

const ResultHeader: React.FC<ResultHeaderProps> = ({
  result,
  answers,
  fadeAnim,
  testID,
}) => {
  if (!result) {
    return null;
  }

  const totalScore = result.totalScore;
  const maxScore = constants.QUESTIONS.reduce((sum, question) => {
    const maxOptionScore = Math.max(
      ...question.options.map((option) => option.score)
    );
    return sum + maxOptionScore;
  }, 0);

  const riskProfile = result.riskProfile as RiskProfile;

  const getScoreRangeText = (profile: RiskProfile) => {
    const range =
      constants.RISK_PROFILE_RANGES[
        profile.toUpperCase() as keyof typeof constants.RISK_PROFILE_RANGES
      ];
    return `Score Range: ${range.min}-${range.max} points`;
  };

  const headerStyles = fadeAnim
    ? [styles.container, { opacity: fadeAnim }]
    : styles.container;

  return (
    <Animated.View style={headerStyles} testID={testID}>
      <View style={styles.iconContainer}>
        <AntDesign
          name="arrowsalt"
          size={30}
          color={
            colors.riskProfile[
              riskProfile.toLowerCase() as keyof typeof colors.riskProfile
            ].main
          }
        />
      </View>
      <Text style={styles.title}>Your Risk Profile</Text>
      <ResultLabel riskProfile={riskProfile} testID="risk-profile-label" />
      <Text style={styles.scoreText}>
        {totalScore} / {maxScore}
      </Text>
      <Text style={styles.rangeText}>{getScoreRangeText(riskProfile)}</Text>
    </Animated.View>
  );
};

export default ResultHeader;
