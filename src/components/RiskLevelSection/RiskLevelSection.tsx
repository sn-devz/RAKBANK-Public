import React from "react";
import { View, Text } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { styles } from "./style";
import { RiskLevelProps } from "./type";
import { colors } from "../../utils/colors";
import { ONBOARDING_CONSTANTS } from "../../constants/onboarding";

const RiskLevelItem: React.FC<RiskLevelProps> = ({
  title,
  description,
  icon,
  color,
}) => {
  return (
    <View
      style={styles.riskLevelItem}
      testID={`risk-level-item-${title.toLowerCase()}`}
    >
      {/* Render the passed icon component */}
      {icon}
      <View style={styles.riskLevelTextContainer}>
        <Text style={styles.riskLevelTitle}>{title}</Text>
        <Text style={styles.riskLevelDescription}>{description}</Text>
      </View>
    </View>
  );
};

const RiskLevelSection: React.FC = () => {
  return (
    <View style={styles.riskLevelContainer} testID="risk-level-container">
      <RiskLevelItem
        title={ONBOARDING_CONSTANTS.RISK_LEVELS.LOW.TITLE}
        description={ONBOARDING_CONSTANTS.RISK_LEVELS.LOW.DESCRIPTION}
        icon={
          <Ionicons
            name="shield-checkmark-outline"
            size={24}
            color={colors.riskProfile.low.main}
          />
        }
        color={colors.riskProfile.low.main}
      />

      <RiskLevelItem
        title={ONBOARDING_CONSTANTS.RISK_LEVELS.MEDIUM.TITLE}
        description={ONBOARDING_CONSTANTS.RISK_LEVELS.MEDIUM.DESCRIPTION}
        icon={
          <MaterialCommunityIcons
            name="scale-balance"
            size={24}
            color={colors.riskProfile.medium.main}
          />
        }
        color={colors.riskProfile.medium.main}
      />

      <RiskLevelItem
        title={ONBOARDING_CONSTANTS.RISK_LEVELS.HIGH.TITLE}
        description={ONBOARDING_CONSTANTS.RISK_LEVELS.HIGH.DESCRIPTION}
        icon={
          <AntDesign
            name="arrowsalt"
            size={24}
            color={colors.riskProfile.high.main}
          />
        }
        color={colors.riskProfile.high.main}
      />
    </View>
  );
};

export default RiskLevelSection;
