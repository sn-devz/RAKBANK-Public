import React from "react";
import { View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { QUESTIONS } from "../../constants/questions";
import { ONBOARDING_CONSTANTS } from "../../constants/onboarding";
import OnboardingHeader from "../../components/OnboardingHeader/OnboardingHeader";
import RiskLevelSection from "../../components/RiskLevelSection/RiskLevelSection";
import StartButton from "../../components/StartButton/StartButton";
import DurationInfo from "../../components/DurationInfo/DurationInfo";
import { styles } from "./style";
import { OnboardingScreenNavigationProp } from "./type";

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const handleStartAssessment = () => {
    navigation.navigate("Question");
  };

  return (
    <SafeAreaView style={styles.container} testID="onboarding-container">
      <View style={styles.content}>
        <OnboardingHeader
          title={ONBOARDING_CONSTANTS.TITLE}
          subtitle={ONBOARDING_CONSTANTS.SUBTITLE}
        />
        <DurationInfo questionCount={QUESTIONS.length} />
        <RiskLevelSection />
        <StartButton onPress={handleStartAssessment} />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
