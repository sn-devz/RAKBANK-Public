import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import QuestionCard from "../QuestionCard";
import { colors } from "../../../utils/colors";

describe("QuestionCard", () => {
  const mockQuestion = {
    id: 1,
    text: "What is your favorite color?",
    options: [
      { id: 1, text: "Red", score: 1 },
      { id: 2, text: "Blue", score: 2 },
    ],
  };

  it("renders without crashing", () => {
    const { getByText } = render(
      <QuestionCard
        question={mockQuestion}
        currentQuestionIndex={0}
        totalQuestions={5}
        testID="question-card"
      >
        <Text>Option 1</Text>
      </QuestionCard>
    );
    expect(getByText("Question 1 of 5")).toBeTruthy();
    expect(getByText("What is your favorite color?")).toBeTruthy();
  });

  it("displays the correct question text", () => {
    const { getByText } = render(
      <QuestionCard
        question={mockQuestion}
        currentQuestionIndex={0}
        totalQuestions={5}
        testID="question-card"
      >
        <Text>Option 1</Text>
      </QuestionCard>
    );
    expect(getByText("What is your favorite color?")).toBeTruthy();
  });

  it("displays the correct progress text", () => {
    const { getByText } = render(
      <QuestionCard
        question={mockQuestion}
        currentQuestionIndex={2}
        totalQuestions={5}
        testID="question-card"
      >
        <Text>Option 1</Text>
      </QuestionCard>
    );
    expect(getByText("Question 3 of 5")).toBeTruthy();
  });

  it("applies the correct styles", () => {
    const { getByTestId } = render(
      <QuestionCard
        question={mockQuestion}
        currentQuestionIndex={0}
        totalQuestions={5}
        testID="question-card"
      >
        <Text>Option 1</Text>
      </QuestionCard>
    );
    const card = getByTestId("question-card");
    expect(card.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: colors.background.main,
        borderRadius: 10,
        marginBottom: 20,
        padding: 20,
      })
    );
  });
});
