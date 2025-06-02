import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ResultHeader from "components/ResultHeader/ResultHeader";
import ResultDescription from "components/ResultDescription/ResultDescription";
import ResultButtons from "components/ResultButtons/ResultButtons";
import ScoreBreakdown from "components/ScoreBreakdown/ScoreBreakdown";
import useResultData from "hooks/useResultData";
import { styles } from "./style";
import { ResultScreenNavigationProp } from "./type";

const ResultScreen = () => {
  const navigation = useNavigation<ResultScreenNavigationProp>();
  const { result, answers, fadeAnim, handleRestart } = useResultData();

  // Render null if no result, to match test expectation
  if (!result) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} testID="result-screen">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        testID="scroll-content"
      >
        <View style={styles.card}>
          <ResultHeader
            result={result}
            answers={answers}
            fadeAnim={fadeAnim}
            testID="result-header"
          />
          <ResultDescription
            description={result.description}
            fadeAnim={fadeAnim}
            testID="result-description"
          />
          <ResultButtons
            onTakeAgain={() => {
              handleRestart();
              navigation.navigate("Welcome");
            }}
            fadeAnim={fadeAnim}
            testID="result-buttons"
          />
        </View>
        <View style={styles.scoreCard}>
          <ScoreBreakdown
            answers={answers}
            totalScore={result.totalScore}
            testID="score-breakdown"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultScreen;
