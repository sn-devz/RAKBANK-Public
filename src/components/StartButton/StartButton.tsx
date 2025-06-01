import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./style";
import { StartButtonProps } from "./type";
import { ONBOARDING_CONSTANTS } from "../../constants/onboarding";

const StartButton: React.FC<StartButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.startButtonContainer} onPress={onPress}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.startButtonGradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text style={styles.startButtonText}>
          {ONBOARDING_CONSTANTS.BUTTON_TEXT}
        </Text>
        <AntDesign name="arrowright" size={18} color="#fff" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default StartButton;
