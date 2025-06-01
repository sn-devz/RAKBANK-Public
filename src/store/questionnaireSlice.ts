import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Answer, RiskProfileResult, QuestionnaireState } from '../types';
import { RISK_PROFILE_RANGES, RISK_PROFILE_DESCRIPTIONS } from '../constants/questions';

const calculateRiskProfile = (answers: Answer[]): RiskProfileResult => {
  const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
  
  let riskProfile: 'Low' | 'Medium' | 'High';
  if (totalScore <= RISK_PROFILE_RANGES.LOW.max) {
    riskProfile = 'Low';
  } else if (totalScore <= RISK_PROFILE_RANGES.MEDIUM.max) {
    riskProfile = 'Medium';
  } else {
    riskProfile = 'High';
  }

  return {
    totalScore,
    riskProfile,
    description: RISK_PROFILE_DESCRIPTIONS[riskProfile.toUpperCase() as keyof typeof RISK_PROFILE_DESCRIPTIONS],
  };
};

const initialState: QuestionnaireState = {
  answers: [],
  currentQuestionIndex: 0,
  isCompleted: false,
  result: null,
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    answerQuestion: (state, action: PayloadAction<Answer>) => {
      const existingAnswerIndex = state.answers.findIndex(
        a => a.questionId === action.payload.questionId
      );

      if (existingAnswerIndex >= 0) {
        state.answers[existingAnswerIndex] = action.payload;
      } else {
        state.answers.push(action.payload);
      }
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
    previousQuestion: (state) => {
      state.currentQuestionIndex = Math.max(0, state.currentQuestionIndex - 1);
    },
    completeQuestionnaire: (state) => {
      state.isCompleted = true;
      state.result = calculateRiskProfile(state.answers);
    },
    resetQuestionnaire: () => initialState,
  },
});

export const {
  answerQuestion,
  nextQuestion,
  previousQuestion,
  completeQuestionnaire,
  resetQuestionnaire,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer; 