import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import QuestionOption from "../QuestionOption";
import { colors } from "../../../utils/colors";

describe("QuestionOption", () => {
  const mockOption = {
    id: 1,
    text: "Test Option",
    score: 5,
  };

  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("renders without crashing", () => {
    const { getByText } = render(
      <QuestionOption
        option={mockOption}
        isSelected={false}
        onSelect={mockOnSelect}
        testID="test-option"
      />
    );
    expect(getByText("Test Option")).toBeTruthy();
  });

  it("calls onSelect with correct option id and score when pressed", () => {
    const { getByTestId } = render(
      <QuestionOption
        option={mockOption}
        isSelected={false}
        onSelect={mockOnSelect}
        testID="test-option"
      />
    );
    fireEvent.press(getByTestId("test-option"));
    expect(mockOnSelect).toHaveBeenCalledWith(mockOption.id, mockOption.score);
  });

  it("applies selected styles when isSelected is true", () => {
    const { getByTestId } = render(
      <QuestionOption
        option={mockOption}
        isSelected={true}
        onSelect={mockOnSelect}
        testID="test-option"
      />
    );
    const optionButton = getByTestId("test-option");
    const style = Array.isArray(optionButton.props.style)
      ? optionButton.props.style
      : [optionButton.props.style];

    const hasSelectedStyle = style.some(
      (s: any) => s && s.backgroundColor === colors.background.selected
    );
    expect(hasSelectedStyle).toBe(true);
  });

  it("applies unselected styles when isSelected is false", () => {
    const { getByTestId } = render(
      <QuestionOption
        option={mockOption}
        isSelected={false}
        onSelect={mockOnSelect}
        testID="test-option"
      />
    );
    const optionButton = getByTestId("test-option");
    const style = Array.isArray(optionButton.props.style)
      ? optionButton.props.style
      : [optionButton.props.style];

    const hasUnselectedStyle = style.some(
      (s: any) => s && s.backgroundColor === colors.background.disabled
    );
    expect(hasUnselectedStyle).toBe(true);
  });

  it("displays the correct option text", () => {
    const { getByText } = render(
      <QuestionOption
        option={mockOption}
        isSelected={false}
        onSelect={mockOnSelect}
        testID="test-option"
      />
    );
    expect(getByText(mockOption.text)).toBeTruthy();
  });

  it("shows radio button inner circle when selected", () => {
    const { getByTestId } = render(
      <QuestionOption
        option={mockOption}
        isSelected={true}
        onSelect={mockOnSelect}
        testID="test-option"
      />
    );
    expect(getByTestId("test-option-inner")).toBeTruthy();
  });

  it("does not show radio button inner circle when not selected", () => {
    const { queryByTestId } = render(
      <QuestionOption
        option={mockOption}
        isSelected={false}
        onSelect={mockOnSelect}
        testID="test-option"
      />
    );
    expect(queryByTestId("test-option-inner")).toBeNull();
  });
});
