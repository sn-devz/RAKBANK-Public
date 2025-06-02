import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import QuestionOption from "../../components/QuestionOption/QuestionOption";
import QuestionNavigation from "../../components/QuestionNavigation/QuestionNavigation";
import useQuestionnaireLogic from "../../hooks/useQuestionnaireLogic";
import { styles } from "./style";

const QuestionScreen: React.FC = () => {
  const {
    currentQuestionIndex,
    totalQuestions,
    currentQuestion,
    isFirstQuestion,
    isLastQuestion,
    currentAnswer,
    progress,
    handleAnswer,
    handleNext,
    handlePrevious,
  } = useQuestionnaireLogic();

  if (!currentQuestion) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} testID="question-screen">
      <ProgressBar progress={progress} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <QuestionCard
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          testID="question-card"
        >
          {currentQuestion.options.map((option) => (
            <QuestionOption
              key={option.id}
              option={option}
              isSelected={currentAnswer?.selectedOptionId === option.id}
              onSelect={handleAnswer}
              testID={`option-${option.id}`}
            />
          ))}
        </QuestionCard>
      </ScrollView>
      <QuestionNavigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        hasAnswer={!!currentAnswer}
        testID="question-navigation"
      />
    </SafeAreaView>
  );
};

export default QuestionScreen;
