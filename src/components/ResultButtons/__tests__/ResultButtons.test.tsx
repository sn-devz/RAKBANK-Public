import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Animated } from "react-native";
import ResultButtons from "../ResultButtons";
import { LinearGradient } from "expo-linear-gradient";

describe("ResultButtons", () => {
  const mockOnTakeAgain = jest.fn();
  const mockOnContinue = jest.fn();

  beforeEach(() => {
    mockOnTakeAgain.mockClear();
    mockOnContinue.mockClear();
  });

  it("renders without crashing", () => {
    const { getByText } = render(
      <ResultButtons onTakeAgain={mockOnTakeAgain} testID="result-buttons" />
    );
    expect(getByText("Take Assessment Again")).toBeTruthy();
  });

  it("calls onTakeAgain when Take Assessment Again button is pressed", () => {
    const { getByText } = render(
      <ResultButtons onTakeAgain={mockOnTakeAgain} testID="result-buttons" />
    );
    fireEvent.press(getByText("Take Assessment Again"));
    expect(mockOnTakeAgain).toHaveBeenCalled();
  });

  it("renders continue button when onContinue prop is provided", () => {
    const { getByText } = render(
      <ResultButtons
        onTakeAgain={mockOnTakeAgain}
        onContinue={mockOnContinue}
        testID="result-buttons"
      />
    );
    expect(getByText("Continue Account Setup")).toBeTruthy();
  });

  it("does not render continue button when onContinue prop is not provided", () => {
    const { queryByText } = render(
      <ResultButtons onTakeAgain={mockOnTakeAgain} testID="result-buttons" />
    );
    expect(queryByText("Continue Account Setup")).toBeNull();
  });

  it("calls onContinue when Continue Account Setup button is pressed", () => {
    const { getByText } = render(
      <ResultButtons
        onTakeAgain={mockOnTakeAgain}
        onContinue={mockOnContinue}
        testID="result-buttons"
      />
    );
    fireEvent.press(getByText("Continue Account Setup"));
    expect(mockOnContinue).toHaveBeenCalled();
  });

  it("applies fade animation when fadeAnim prop is provided", () => {
    const fadeAnim = new Animated.Value(0.5);
    const { getByTestId } = render(
      <ResultButtons
        onTakeAgain={mockOnTakeAgain}
        fadeAnim={fadeAnim}
        testID="result-buttons"
      />
    );
    const container = getByTestId("result-buttons");
    const style = Array.isArray(container.props.style)
      ? container.props.style
      : [container.props.style];
    // Check that at least one style object has an opacity property
    const hasOpacity = style.some(
      (s: any) => s && Object.prototype.hasOwnProperty.call(s, "opacity")
    );
    expect(hasOpacity).toBe(true);
  });

  it("renders LinearGradient with correct colors", () => {
    const { UNSAFE_getByType } = render(
      <ResultButtons onTakeAgain={mockOnTakeAgain} testID="result-buttons" />
    );
    const gradient = UNSAFE_getByType(LinearGradient);
    expect(gradient.props.colors).toEqual(["#4c669f", "#3b5998", "#192f6a"]);
  });

  it("applies correct styles to Continue Account Setup button", () => {
    const { getByText } = render(
      <ResultButtons
        onTakeAgain={mockOnTakeAgain}
        onContinue={mockOnContinue}
        testID="result-buttons"
      />
    );
    const button = getByText("Continue Account Setup");
    const style = Array.isArray(button.props.style)
      ? button.props.style
      : [button.props.style];

    const hasContinueButtonStyle = style.some(
      (s: any) => s && s.color === "#007AFF" && s.fontSize === 16
    );
    expect(hasContinueButtonStyle).toBe(true);
  });
});
