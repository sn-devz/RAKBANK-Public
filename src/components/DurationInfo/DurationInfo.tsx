import React from "react";
import { Text } from "react-native";
import { styles } from "./style";
import { DurationInfoProps } from "./type";
import { ONBOARDING_CONSTANTS } from "../../constants/onboarding";

const DurationInfo: React.FC<DurationInfoProps> = ({ questionCount }) => {
  const durationText =
    questionCount === 1
      ? ONBOARDING_CONSTANTS.DURATION_INFO.SINGLE
      : ONBOARDING_CONSTANTS.DURATION_INFO.MULTIPLE.replace(
          "{count}",
          questionCount.toString()
        );

  return <Text style={styles.durationText}>{durationText}</Text>;
};

export default DurationInfo;
