import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import QuestionNavigation from "../QuestionNavigation";

describe("QuestionNavigation", () => {
  let mockOnPrevious: jest.Mock;
  let mockOnNext: jest.Mock;

  beforeEach(() => {
    mockOnPrevious = jest.fn();
    mockOnNext = jest.fn();
  });

  it("renders without crashing", () => {
    const { getByTestId } = render(
      <QuestionNavigation
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        isFirstQuestion={false}
        isLastQuestion={false}
        hasAnswer={true}
        testID="question-navigation"
      />
    );
    expect(getByTestId("question-navigation")).toBeTruthy();
  });

  it("calls onPrevious when Previous button is pressed", () => {
    const { getByTestId } = render(
      <QuestionNavigation
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        isFirstQuestion={false}
        isLastQuestion={false}
        hasAnswer={true}
        testID="question-navigation"
      />
    );
    fireEvent.press(getByTestId("previous-button"));
    expect(mockOnPrevious).toHaveBeenCalled();
  });

  it("calls onNext when Next button is pressed", () => {
    const { getByTestId } = render(
      <QuestionNavigation
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        isFirstQuestion={false}
        isLastQuestion={false}
        hasAnswer={true}
        testID="question-navigation"
      />
    );
    fireEvent.press(getByTestId("next-button"));
    expect(mockOnNext).toHaveBeenCalled();
  });

  it("does not call onPrevious when Previous button is disabled (first question) and has disabled style", () => {
    const { getByTestId } = render(
      <QuestionNavigation
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        isFirstQuestion={true}
        isLastQuestion={false}
        hasAnswer={true}
        testID="question-navigation"
      />
    );
    const previousButton = getByTestId("previous-button");
    fireEvent.press(previousButton);
    expect(mockOnPrevious).not.toHaveBeenCalled();
    // Check for disabled style (opacity)
    const style = Array.isArray(previousButton.props.style)
      ? previousButton.props.style
      : [previousButton.props.style];
    const hasDisabledStyle = style.some((s: any) => s && s.opacity === 0.5);
    expect(hasDisabledStyle).toBe(true);
  });

  it("does not call onNext when Next button is disabled (no answer) and has disabled style", () => {
    const { getByTestId } = render(
      <QuestionNavigation
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        isFirstQuestion={false}
        isLastQuestion={false}
        hasAnswer={false}
        testID="question-navigation"
      />
    );
    const nextButton = getByTestId("next-button");
    fireEvent.press(nextButton);
    expect(mockOnNext).not.toHaveBeenCalled();
    // Check for disabled style (opacity)
    const style = Array.isArray(nextButton.props.style)
      ? nextButton.props.style
      : [nextButton.props.style];
    const hasDisabledStyle = style.some((s: any) => s && s.opacity === 0.5);
    expect(hasDisabledStyle).toBe(true);
  });

  it("displays 'Complete' on the Next button for the last question", () => {
    const { getByText } = render(
      <QuestionNavigation
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        isFirstQuestion={false}
        isLastQuestion={true}
        hasAnswer={true}
        testID="question-navigation"
      />
    );
    expect(getByText("Complete")).toBeTruthy();
  });
});
