import { useDispatch, useSelector } from 'react-redux';
import { Animated } from 'react-native';
import { RootState } from '../store';
import { QUESTIONS, RISK_PROFILE_RANGES } from '../constants/questions';
import { useEffect, useState } from 'react';
import { RiskProfileResult, Answer } from '../types';
import { resetQuestionnaire } from '../store/questionnaireSlice';
import { UseResultData } from './type';


const useResultData = (): UseResultData => {
  const { result, answers } = useSelector((state: RootState) => state.questionnaire);
  const dispatch = useDispatch();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Start fade-in animation on component mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleRestart = () => {
    dispatch(resetQuestionnaire());
  };

  const maxScore = QUESTIONS.reduce((sum, question) => {
    // For each question, find the maximum score among its options
    const maxOptionScore = Math.max(...question.options.map(option => option.score));
    return sum + maxOptionScore;
  }, 0);

  const getScoreRangeText = (riskProfile: string) => {
    const range = RISK_PROFILE_RANGES[riskProfile.toUpperCase() as keyof typeof RISK_PROFILE_RANGES];
    if (!range) return '';
    return `Score Range: ${range.min}-${range.max} points`;
  };

  return {
    result,
    answers,
    maxScore,
    getScoreRangeText,
    fadeAnim,
    handleRestart,
  };
};

export default useResultData; 