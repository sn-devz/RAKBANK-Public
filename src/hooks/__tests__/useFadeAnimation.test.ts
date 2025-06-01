import { renderHook, act } from '@testing-library/react-hooks';
import { Animated } from 'react-native';
import useFadeAnimation from '../useFadeAnimation';

jest.useFakeTimers();

// Helper type to access internal properties for testing
type AnimatedValueWithInternals = Animated.Value & {
  _value: number;
};

// Mock Animated.timing to immediately set the value and expose config
const originalTiming = Animated.timing;
beforeAll(() => {
  jest.spyOn(Animated, 'timing').mockImplementation((value, config) => {
    return {
      start: (cb?: () => void) => {
        // @ts-ignore
        value.setValue(config.toValue);
        // Attach config for test inspection
        (value as any)._lastConfig = config;
        if (cb) cb();
      },
    } as any;
  });
});
afterAll(() => {
  (Animated.timing as any).mockRestore?.();
});

describe('useFadeAnimation', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useFadeAnimation());
    
    expect(result.current.fadeAnim).toBeInstanceOf(Animated.Value);
    expect(result.current.fadeIn).toBeInstanceOf(Function);
    expect(result.current.fadeOut).toBeInstanceOf(Function);
    expect((result.current.fadeAnim as AnimatedValueWithInternals)._value).toBe(0);
  });

  it('should initialize with custom initial value', () => {
    const { result } = renderHook(() => useFadeAnimation({ initialValue: 0.5 }));
    
    expect((result.current.fadeAnim as AnimatedValueWithInternals)._value).toBe(0.5);
  });

  it('should fade in to value 1', () => {
    const { result } = renderHook(() => useFadeAnimation());
    
    act(() => {
      result.current.fadeIn();
    });

    expect((result.current.fadeAnim as AnimatedValueWithInternals)._value).toBe(1);
  });

  it('should fade out to value 0', () => {
    const { result } = renderHook(() => useFadeAnimation({ initialValue: 1 }));
    
    act(() => {
      result.current.fadeOut();
    });

    expect((result.current.fadeAnim as AnimatedValueWithInternals)._value).toBe(0);
  });

  it('should use custom duration', () => {
    const customDuration = 500;
    const { result } = renderHook(() => 
      useFadeAnimation({ duration: customDuration })
    );
    
    act(() => {
      result.current.fadeIn();
    });

    // @ts-ignore
    expect(result.current.fadeAnim._lastConfig.duration).toBe(customDuration);
    expect((result.current.fadeAnim as AnimatedValueWithInternals)._value).toBe(1);
  });

  it('should stop animation on unmount', () => {
    const { result, unmount } = renderHook(() => useFadeAnimation());
    
    act(() => {
      result.current.fadeIn();
    });

    // Spy on stopAnimation
    const stopAnimationSpy = jest.spyOn(result.current.fadeAnim, 'stopAnimation');

    unmount();

    expect(stopAnimationSpy).toHaveBeenCalled();
  });

  it('should handle multiple fade in/out calls', () => {
    const { result } = renderHook(() => useFadeAnimation());
    
    act(() => {
      result.current.fadeIn();
    });

    expect((result.current.fadeAnim as AnimatedValueWithInternals)._value).toBe(1);

    act(() => {
      result.current.fadeOut();
    });

    expect((result.current.fadeAnim as AnimatedValueWithInternals)._value).toBe(0);

    act(() => {
      result.current.fadeIn();
    });

    expect((result.current.fadeAnim as AnimatedValueWithInternals)._value).toBe(1);
  });

  it('should use native driver by default', () => {
    const { result } = renderHook(() => useFadeAnimation());
    
    act(() => {
      result.current.fadeIn();
    });

    // @ts-ignore
    expect(result.current.fadeAnim._lastConfig.useNativeDriver).toBe(true);
  });

  it('should respect useNativeDriver option', () => {
    const { result } = renderHook(() => 
      useFadeAnimation({ useNativeDriver: false })
    );
    
    act(() => {
      result.current.fadeIn();
    });

    // @ts-ignore
    expect(result.current.fadeAnim._lastConfig.useNativeDriver).toBe(false);
  });
}); 