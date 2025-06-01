import { renderHook, act } from '@testing-library/react-hooks';
import useQuestionnaireLogic from '../useQuestionnaireLogic';
import * as redux from 'react-redux';
import * as nav from '@react-navigation/native';
import { QUESTIONS } from '../../constants/questions';
import {
  answerQuestion,
  nextQuestion,
  previousQuestion,
  completeQuestionnaire,
} from '../../store/questionnaireSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('../../constants/questions', () => ({
  QUESTIONS: [
    {
      id: 1,
      text: "What is your investment experience level?",
      options: [
        { id: 1, text: "Novice - I have little to no investment experience", score: 1 },
        { id: 2, text: "Intermediate - I have some investment experience", score: 2 },
        { id: 3, text: "Advanced - I have extensive investment experience", score: 3 }
      ]
    },
    {
      id: 2,
      text: "How long do you plan to invest your money?",
      options: [
        { id: 1, text: "Less than 1 year", score: 1 },
        { id: 2, text: "1-5 years", score: 2 },
        { id: 3, text: "More than 5 years", score: 3 }
      ]
    },
    {
      id: 3,
      text: "How would you react to a 20% drop in your investment value?",
      options: [
        { id: 1, text: "Very concerned - I would sell immediately", score: 1 },
        { id: 2, text: "Somewhat concerned - I would consider selling", score: 2 },
        { id: 3, text: "Moderate - I would hold and monitor", score: 3 },
        { id: 4, text: "Comfortable - I would hold and possibly buy more", score: 4 },
        { id: 5, text: "Very comfortable - I would definitely buy more", score: 5 }
      ]
    },
    {
      id: 4,
      text: "What is your primary investment goal?",
      options: [
        { id: 1, text: "Preserve capital with minimal risk", score: 1 },
        { id: 2, text: "Balance between growth and safety", score: 2 },
        { id: 3, text: "Moderate growth with some risk", score: 3 },
        { id: 4, text: "Significant growth with higher risk", score: 4 },
        { id: 5, text: "Maximum growth with highest risk", score: 5 }
      ]
    },
    {
      id: 5,
      text: "How would you describe your financial situation?",
      options: [
        { id: 1, text: "Very unstable - I need to preserve what I have", score: 1 },
        { id: 2, text: "Somewhat unstable - I need to be careful", score: 2 },
        { id: 3, text: "Stable - I can take some risks", score: 3 },
        { id: 4, text: "Very stable - I can take significant risks", score: 4 },
        { id: 5, text: "Extremely stable - I can take maximum risks", score: 5 }
      ]
    }
  ],
}));

describe('useQuestionnaireLogic', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (redux.useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (nav.useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
  });

  function setupSelector(overrides = {}) {
    (redux.useSelector as unknown as jest.Mock).mockImplementation((fn) =>
      fn({
        questionnaire: {
          currentQuestionIndex: 0,
          answers: [],
          ...overrides,
        },
      })
    );
  }

  it('returns correct initial values', () => {
    setupSelector();
    const { result } = renderHook(() => useQuestionnaireLogic());
    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.totalQuestions).toBe(5);
    expect(result.current.currentQuestion).toEqual(QUESTIONS[0]);
    expect(result.current.isFirstQuestion).toBe(true);
    expect(result.current.isLastQuestion).toBe(false);
    expect(result.current.currentAnswer).toBeUndefined();
    expect(result.current.progress).toBeCloseTo(1 / 5);
  });

  it('detects last question', () => {
    setupSelector({ currentQuestionIndex: 4 });
    const { result } = renderHook(() => useQuestionnaireLogic());
    expect(result.current.isLastQuestion).toBe(true);
    expect(result.current.isFirstQuestion).toBe(false);
  });

  it('finds current answer', () => {
    setupSelector({
      answers: [{ questionId: 1, selectedOptionId: 2, score: 2 }],
    });
    const { result } = renderHook(() => useQuestionnaireLogic());
    expect(result.current.currentAnswer).toEqual({
      questionId: 1,
      selectedOptionId: 2,
      score: 2,
    });
  });

  it('handleAnswer dispatches answerQuestion', () => {
    setupSelector();
    const { result } = renderHook(() => useQuestionnaireLogic());
    act(() => {
      result.current.handleAnswer(2);
    });
    expect(mockDispatch).toHaveBeenCalledWith(
      answerQuestion({
        questionId: 1,
        selectedOptionId: 2,
        score: 2,
      })
    );
  });

  it('handleNext dispatches nextQuestion if not last', () => {
    setupSelector({ currentQuestionIndex: 0 });
    const { result } = renderHook(() => useQuestionnaireLogic());
    act(() => {
      result.current.handleNext();
    });
    expect(mockDispatch).toHaveBeenCalledWith(nextQuestion());
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('handleNext dispatches completeQuestionnaire and navigates if last', () => {
    setupSelector({ currentQuestionIndex: 4 });
    const { result } = renderHook(() => useQuestionnaireLogic());
    act(() => {
      result.current.handleNext();
    });
    expect(mockDispatch).toHaveBeenCalledWith(completeQuestionnaire());
    expect(mockNavigate).toHaveBeenCalledWith('Result');
  });

  it('handlePrevious dispatches previousQuestion', () => {
    setupSelector({ currentQuestionIndex: 1 });
    const { result } = renderHook(() => useQuestionnaireLogic());
    act(() => {
      result.current.handlePrevious();
    });
    expect(mockDispatch).toHaveBeenCalledWith(previousQuestion());
  });
}); 