import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { UseFadeAnimationProps, UseFadeAnimationReturn } from './type';

const useFadeAnimation = ({
  initialValue = 0,
  duration = 300,
  useNativeDriver = true,
}: UseFadeAnimationProps = {}): UseFadeAnimationReturn => {
  const fadeAnim = useRef(new Animated.Value(initialValue)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      useNativeDriver,
    }).start();
  };

  useEffect(() => {
    return () => {
      fadeAnim.stopAnimation();
    };
  }, [fadeAnim]);

  return {
    fadeAnim,
    fadeIn,
    fadeOut,
  };
};

export default useFadeAnimation; 