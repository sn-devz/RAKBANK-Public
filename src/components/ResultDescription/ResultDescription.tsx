import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { styles } from "./style";
import { ResultDescriptionProps } from "./type";

const ResultDescription: React.FC<ResultDescriptionProps> = ({
  description,
  fadeAnim,
  testID,
}) => {
  const descriptionStyles = [
    styles.card,
    fadeAnim ? { opacity: fadeAnim } : {},
  ];

  return (
    <Animated.View style={descriptionStyles}>
      <Text style={styles.descriptionTitle}>What This Means</Text>
      <Text style={styles.descriptionText}>{description}</Text>
    </Animated.View>
  );
};

export default ResultDescription;
