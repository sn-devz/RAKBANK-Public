import React from "react";
import { View, Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import QuestionScreen from "../QuestionScreen";
import { QuestionOption } from "../../../types";

// Define prop types for mocked components
type MockQuestionOptionProps = {
  option: { id: number; text: string; score: number };
  isSelected: boolean;
  onSelect: (id: number) => void;
  testID: string;
};

type MockQuestionNavigationProps = {
  onNext: () => void;
  onPrevious: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  hasAnswer: boolean;
  testID: string;
};

// Mock useQuestionnaireLogic
const mockHandleAnswer = jest.fn();
const mockHandleNext = jest.fn();
const mockHandlePrevious = jest.fn();

jest.mock("../../../hooks/useQuestionnaireLogic", () => () => ({
  currentQuestionIndex: 1,
  totalQuestions: 3,
  currentQuestion: {
    id: 2,
    text: "What is your favorite color?",
    options: [
      { id: 1, text: "Red", score: 1 },
      { id: 2, text: "Blue", score: 2 },
    ],
  },
  isFirstQuestion: false,
  isLastQuestion: false,
  currentAnswer: { questionId: 2, selectedOptionId: 1, score: 1 },
  progress: 0.5,
  handleAnswer: mockHandleAnswer,
  handleNext: mockHandleNext,
  handlePrevious: mockHandlePrevious,
}));

// Mock child components to simplify testing
jest.mock("../../../components/QuestionOption/QuestionOption", () => {
  const React = require("react");
  const { View, Text } = require("react-native");
  return ({
    option,
    isSelected,
    onSelect,
    testID,
  }: MockQuestionOptionProps) => (
    <View testID={testID} onPress={() => onSelect(option.id)}>
      <Text>{option.text}</Text>
      {isSelected && <View testID={`${testID}-selected`} />}
    </View>
  );
});

jest.mock("../../../components/QuestionNavigation/QuestionNavigation", () => {
  const React = require("react");
  const { View } = require("react-native");
  return ({
    onNext,
    onPrevious,
    isFirstQuestion,
    isLastQuestion,
    hasAnswer,
    testID,
  }: MockQuestionNavigationProps) => (
    <View testID={testID}>
      <View testID="previous-button" onPress={onPrevious} />
      <View testID="next-button" onPress={onNext} />
    </View>
  );
});

describe("QuestionScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all main components", () => {
    const { getByTestId, getByText } = render(<QuestionScreen />);
    expect(getByTestId("question-screen")).toBeTruthy();
    expect(getByTestId("question-card")).toBeTruthy();
    expect(getByTestId("option-1")).toBeTruthy();
    expect(getByTestId("option-2")).toBeTruthy();
    expect(getByTestId("question-navigation")).toBeTruthy();
    expect(getByText("What is your favorite color?")).toBeTruthy();
  });

  it("shows selected option correctly", () => {
    const { getByTestId } = render(<QuestionScreen />);
    expect(getByTestId("option-1-selected")).toBeTruthy();
    expect(() => getByTestId("option-2-selected")).toThrow();
  });

  it("calls handleAnswer when an option is pressed", () => {
    const { getByTestId } = render(<QuestionScreen />);
    fireEvent.press(getByTestId("option-2"));
    expect(mockHandleAnswer).toHaveBeenCalledWith(2);
  });

  it("calls handleNext when next button is pressed", () => {
    const { getByTestId } = render(<QuestionScreen />);
    fireEvent.press(getByTestId("next-button"));
    expect(mockHandleNext).toHaveBeenCalled();
  });

  it("calls handlePrevious when previous button is pressed", () => {
    const { getByTestId } = render(<QuestionScreen />);
    fireEvent.press(getByTestId("previous-button"));
    expect(mockHandlePrevious).toHaveBeenCalled();
  });

  it("handles null currentQuestion", () => {
    // Override the mock for this test only
    jest.resetModules();
    jest.doMock("../../../hooks/useQuestionnaireLogic", () => () => ({
      currentQuestion: null,
      currentQuestionIndex: 0,
      totalQuestions: 0,
      isFirstQuestion: true,
      isLastQuestion: true,
      currentAnswer: null,
      progress: 0,
      handleAnswer: mockHandleAnswer,
      handleNext: mockHandleNext,
      handlePrevious: mockHandlePrevious,
    }));
    const QuestionScreenWithNull = require("../QuestionScreen").default;
    const { queryByTestId } = render(<QuestionScreenWithNull />);
    expect(queryByTestId("question-screen")).toBeNull();
    jest.dontMock("../../../hooks/useQuestionnaireLogic");
  });
});
