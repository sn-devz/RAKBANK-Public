import React from "react";
import { View, Text, StyleSheet, ColorValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RiskProfile } from "types";
import { styles } from "./style";
import { ResultLabelProps } from "./type";
import { getRiskProfileGradient } from "../../utils/colors";

const ResultLabel: React.FC<ResultLabelProps> = ({ riskProfile, testID }) => {
  const gradientColors = getRiskProfileGradient(riskProfile);

  return (
    <View style={styles.container} testID={testID}>
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text style={styles.text}>{riskProfile} Risk</Text>
      </LinearGradient>
    </View>
  );
};

export default ResultLabel;
