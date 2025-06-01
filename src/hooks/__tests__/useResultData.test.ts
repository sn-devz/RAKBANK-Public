import { renderHook, act } from '@testing-library/react-hooks';
import useResultData from '../useResultData';
import * as redux from 'react-redux';
import { Animated } from 'react-native';
import { QUESTIONS, RISK_PROFILE_RANGES } from '../../constants/questions';
import { resetQuestionnaire } from '../../store/questionnaireSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../constants/questions', () => ({
  QUESTIONS: [
    { id: 1, text: 'Q1', options: [{ id: 1, text: 'A1', score: 2 }, { id: 2, text: 'A2', score: 5 }] },
    { id: 2, text: 'Q2', options: [{ id: 3, text: 'B1', score: 3 }, { id: 4, text: 'B2', score: 4 }] },
  ],
  RISK_PROFILE_RANGES: {
    LOW: { min: 0, max: 3 },
    MEDIUM: { min: 4, max: 7 },
    HIGH: { min: 8, max: 10 },
  },
}));
jest.mock('../../store/questionnaireSlice', () => ({
  resetQuestionnaire: jest.fn(() => ({ type: 'RESET_QUESTIONNAIRE' })),
}));

describe('useResultData', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (redux.useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  function setupSelector(overrides = {}) {
    (redux.useSelector as unknown as jest.Mock).mockImplementation((fn) =>
      fn({
        questionnaire: {
          result: { riskProfile: 'MEDIUM', totalScore: 6, description: 'desc' },
          answers: [
            { questionId: 1, selectedOptionId: 2, score: 5 },
            { questionId: 2, selectedOptionId: 4, score: 4 },
          ],
          ...overrides,
        },
      })
    );
  }

  it('returns correct initial values from redux', () => {
    setupSelector();
    const { result } = renderHook(() => useResultData());
    expect(result.current.result).toEqual({ riskProfile: 'MEDIUM', totalScore: 6, description: 'desc' });
    expect(result.current.answers).toEqual([
      { questionId: 1, selectedOptionId: 2, score: 5 },
      { questionId: 2, selectedOptionId: 4, score: 4 },
    ]);
  });

  it('calculates maxScore correctly', () => {
    setupSelector();
    const { result } = renderHook(() => useResultData());
    // maxScore = max(2,5) + max(3,4) = 5 + 4 = 9
    expect(result.current.maxScore).toBe(9);
  });

  it('getScoreRangeText returns correct text for known profile', () => {
    setupSelector();
    const { result } = renderHook(() => useResultData());
    expect(result.current.getScoreRangeText('medium')).toBe('Score Range: 4-7 points');
    expect(result.current.getScoreRangeText('LOW')).toBe('Score Range: 0-3 points');
    expect(result.current.getScoreRangeText('HIGH')).toBe('Score Range: 8-10 points');
  });

  it('getScoreRangeText returns empty string for unknown profile', () => {
    setupSelector();
    const { result } = renderHook(() => useResultData());
    expect(result.current.getScoreRangeText('UNKNOWN')).toBe('');
  });

  it('fadeAnim is an instance of Animated.Value and animates on mount', () => {
    setupSelector();
    const { result } = renderHook(() => useResultData());
    expect(result.current.fadeAnim).toBeInstanceOf(Animated.Value);
  });

  it('handleRestart dispatches resetQuestionnaire', () => {
    setupSelector();
    const { result } = renderHook(() => useResultData());
    act(() => {
      result.current.handleRestart();
    });
    expect(mockDispatch).toHaveBeenCalledWith(resetQuestionnaire());
  });
}); 