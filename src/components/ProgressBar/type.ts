import { ColorValue } from "react-native";

export interface ProgressBarProps {
  progress: number; // progress should be a value between 0 and 1
  color?: ColorValue; // Optional color for solid fill (fallback)
  fillColors?: readonly [ColorValue, ColorValue, ...ColorValue[]]; // Optional colors for gradient fill
  backgroundColor?: ColorValue; // Optional background color
  gradientStart?: { x: number; y: number }; // Optional gradient start point
  gradientEnd?: { x: number; y: number }; // Optional gradient end point
  height?: number;
  testID?: string;
}

