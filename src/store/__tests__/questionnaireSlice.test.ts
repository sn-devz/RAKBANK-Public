import questionnaireReducer, {
  answerQuestion,
  nextQuestion,
  previousQuestion,
  completeQuestionnaire,
  resetQuestionnaire,
} from '../questionnaireSlice';
import { QuestionnaireState, Answer, RiskProfile } from '../../types';
import { RISK_PROFILE_RANGES, RISK_PROFILE_DESCRIPTIONS } from '../../constants/questions';

describe('questionnaireSlice', () => {
  const initialState: QuestionnaireState = {
    answers: [],
    currentQuestionIndex: 0,
    isCompleted: false,
    result: null,
  };

  describe('reducers', () => {
    it('should handle initial state', () => {
      expect(questionnaireReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle answerQuestion - new answer', () => {
      const answer: Answer = {
        questionId: 1,
        selectedOptionId: 1,
        score: 2,
      };

      const nextState = questionnaireReducer(initialState, answerQuestion(answer));
      expect(nextState.answers).toHaveLength(1);
      expect(nextState.answers[0]).toEqual(answer);
    });

    it('should handle answerQuestion - update existing answer', () => {
      const existingAnswer: Answer = {
        questionId: 1,
        selectedOptionId: 1,
        score: 2,
      };

      const updatedAnswer: Answer = {
        questionId: 1,
        selectedOptionId: 2,
        score: 3,
      };

      const stateWithAnswer = questionnaireReducer(initialState, answerQuestion(existingAnswer));
      const nextState = questionnaireReducer(stateWithAnswer, answerQuestion(updatedAnswer));

      expect(nextState.answers).toHaveLength(1);
      expect(nextState.answers[0]).toEqual(updatedAnswer);
    });

    it('should handle nextQuestion', () => {
      const nextState = questionnaireReducer(initialState, nextQuestion());
      expect(nextState.currentQuestionIndex).toBe(1);
    });

    it('should handle previousQuestion', () => {
      const stateWithIndex = {
        ...initialState,
        currentQuestionIndex: 2,
      };
      const nextState = questionnaireReducer(stateWithIndex, previousQuestion());
      expect(nextState.currentQuestionIndex).toBe(1);
    });

    it('should not go below 0 for previousQuestion', () => {
      const nextState = questionnaireReducer(initialState, previousQuestion());
      expect(nextState.currentQuestionIndex).toBe(0);
    });

    it('should handle completeQuestionnaire with Low risk profile', () => {
      const answers: Answer[] = [
        { questionId: 1, selectedOptionId: 1, score: 2 },
        { questionId: 2, selectedOptionId: 1, score: 2 },
        { questionId: 3, selectedOptionId: 1, score: 2 },
      ];

      const stateWithAnswers = {
        ...initialState,
        answers,
      };

      const nextState = questionnaireReducer(stateWithAnswers, completeQuestionnaire());

      expect(nextState.isCompleted).toBe(true);
      expect(nextState.result).toBeDefined();
      expect(nextState.result?.riskProfile).toBe('Low');
      expect(nextState.result?.totalScore).toBe(6);
      expect(nextState.result?.description).toBe(RISK_PROFILE_DESCRIPTIONS.LOW);
    });

    it('should handle completeQuestionnaire with Medium risk profile', () => {
      const answers: Answer[] = [
        { questionId: 1, selectedOptionId: 2, score: 3 },
        { questionId: 2, selectedOptionId: 2, score: 3 },
        { questionId: 3, selectedOptionId: 2, score: 3 },
        { questionId: 4, selectedOptionId: 2, score: 3 },
      ];

      const stateWithAnswers = {
        ...initialState,
        answers,
      };

      const nextState = questionnaireReducer(stateWithAnswers, completeQuestionnaire());

      expect(nextState.isCompleted).toBe(true);
      expect(nextState.result).toBeDefined();
      expect(nextState.result?.riskProfile).toBe('Medium');
      expect(nextState.result?.totalScore).toBe(12);
      expect(nextState.result?.description).toBe(RISK_PROFILE_DESCRIPTIONS.MEDIUM);
    });

    it('should handle completeQuestionnaire with High risk profile', () => {
      const answers: Answer[] = [
        { questionId: 1, selectedOptionId: 3, score: 3 },
        { questionId: 2, selectedOptionId: 3, score: 3 },
        { questionId: 3, selectedOptionId: 4, score: 4 },
        { questionId: 4, selectedOptionId: 4, score: 4 },
        { questionId: 5, selectedOptionId: 4, score: 4 },
      ];

      const stateWithAnswers = {
        ...initialState,
        answers,
      };

      const nextState = questionnaireReducer(stateWithAnswers, completeQuestionnaire());

      expect(nextState.isCompleted).toBe(true);
      expect(nextState.result).toBeDefined();
      expect(nextState.result?.riskProfile).toBe('High');
      expect(nextState.result?.totalScore).toBe(18);
      expect(nextState.result?.description).toBe(RISK_PROFILE_DESCRIPTIONS.HIGH);
    });

    it('should handle resetQuestionnaire', () => {
      const stateWithData = {
        ...initialState,
        answers: [{ questionId: 1, selectedOptionId: 2, score: 2 }],
        currentQuestionIndex: 2,
        isCompleted: true,
        result: {
          totalScore: 2,
          riskProfile: 'Medium' as RiskProfile,
          description: 'Test description',
        },
      };

      const nextState = questionnaireReducer(stateWithData, resetQuestionnaire());
      expect(nextState).toEqual(initialState);
    });
  });
}); 