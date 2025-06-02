import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { QUESTIONS } from "../constants/questions";
import { Answer } from "../types";
import { RootState } from "../store";
import {
  answerQuestion,
  nextQuestion,
  previousQuestion,
  completeQuestionnaire,
} from "../store/questionnaireSlice";

import { QuestionScreenNavigationProp } from './type';

const useQuestionnaireLogic = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<QuestionScreenNavigationProp>();
  
  const { currentQuestionIndex, answers } = useSelector(
    (state: RootState) => state.questionnaire
  );

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUESTIONS.length;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  
  const currentAnswer = answers.find(
    (answer) => answer.questionId === currentQuestion.id
  );

  const progress = (currentQuestionIndex + 1) / totalQuestions;

  const handleAnswer = (selectedOptionId: number) => {
    const option = currentQuestion.options.find(
      (opt) => opt.id === selectedOptionId
    );
    if (option) {
      dispatch(
        answerQuestion({
          questionId: currentQuestion.id,
          selectedOptionId,
          score: option.score,
        })
      );
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      dispatch(completeQuestionnaire());
      navigation.navigate("Result");
    } else {
      dispatch(nextQuestion());
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      dispatch(previousQuestion());
    }
  };

  return {
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
  };
};

export default useQuestionnaireLogic; 