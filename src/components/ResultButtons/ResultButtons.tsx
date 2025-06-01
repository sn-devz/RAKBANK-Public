import React from "react";
import { Text, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./style";
import { ResultButtonsProps } from "./type";
import { colors, getButtonGradient } from "../../utils/colors";

const ResultButtons: React.FC<ResultButtonsProps> = ({
  onTakeAgain,
  onContinue,
  fadeAnim,
  testID,
}) => {
  return (
    <Animated.View
      style={[styles.buttonsContainer, fadeAnim ? { opacity: fadeAnim } : {}]}
      testID={testID}
    >
      <TouchableOpacity
        style={styles.takeAgainButtonContainer}
        onPress={onTakeAgain}
      >
        <LinearGradient
          colors={getButtonGradient()}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={styles.buttonText}>Take Assessment Again</Text>
        </LinearGradient>
      </TouchableOpacity>

      {onContinue && (
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueButtonText}>Continue Account Setup</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default ResultButtons;
