import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { ProgressBarProps } from "./type";
import { styles } from "./style";

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = colors.progress.fill,
  backgroundColor = colors.progress.background,
  height = 8,
  testID,
}) => {
  return (
    <View
      style={[styles.container, { backgroundColor, height }]}
      testID={testID}
    >
      <View
        style={[
          styles.progress,
          {
            backgroundColor: color,
            width: `${Math.min(Math.max(progress * 100, 0), 100)}%`,
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;
