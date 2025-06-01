import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./style";
import { OnboardingHeaderProps } from "./type";

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="finance"
          size={60}
          color="#fff"
          style={styles.topIcon}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </>
  );
};

export default OnboardingHeader;
