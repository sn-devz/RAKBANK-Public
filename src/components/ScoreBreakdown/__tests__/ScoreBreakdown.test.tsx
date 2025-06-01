import React from "react";
import { render } from "@testing-library/react-native";
import { Animated } from "react-native";
import ScoreBreakdown from "../ScoreBreakdown";
import { QUESTIONS } from "../../../constants/questions";
import { Answer } from "../../../types";

// Mock data for testing
const mockAnswers: Answer[] = [
  { questionId: 1, score: 5, selectedOptionId: 1 },
  { questionId: 2, score: 3, selectedOptionId: 1 },
  { questionId: 3, score: 4, selectedOptionId: 1 },
];

const mockTotalScore = 12;

describe("ScoreBreakdown", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <ScoreBreakdown answers={mockAnswers} totalScore={mockTotalScore} />
    );
    expect(getByText("Score Breakdown:")).toBeTruthy();
  });

  it("displays all questions and their scores", () => {
    const { getAllByText } = render(
      <ScoreBreakdown answers={mockAnswers} totalScore={mockTotalScore} />
    );

    QUESTIONS.forEach((question, index) => {
      const answer = mockAnswers.find((a) => a.questionId === question.id);
      const questionTexts = getAllByText(`Question ${question.id}:`);
      const scoreTexts = getAllByText(`${answer ? answer.score : 0} points`);
      expect(questionTexts.length).toBe(1);
      if ((answer ? answer.score : 0) === 0) {
        expect(scoreTexts.length).toBe(2); // 0 points appears in both question and total
      } else {
        expect(scoreTexts.length).toBe(1);
      }
    });
  });

  it("displays the total score correctly", () => {
    const { getByText } = render(
      <ScoreBreakdown answers={mockAnswers} totalScore={mockTotalScore} />
    );
    expect(getByText("Total Score:")).toBeTruthy();
    expect(getByText(`${mockTotalScore} points`)).toBeTruthy();
  });

  it("applies correct styles to the container", () => {
    const { getByTestId } = render(
      <ScoreBreakdown
        answers={mockAnswers}
        totalScore={mockTotalScore}
        testID="score-breakdown"
      />
    );
    const container = getByTestId("score-breakdown");
    const style = Array.isArray(container.props.style)
      ? container.props.style
      : [container.props.style];
    // Check that at least one style object has the expected properties
    const hasContainerStyle = style.some(
      (s: any) =>
        s &&
        s.backgroundColor === "#f9f9f9" &&
        s.borderRadius === 8 &&
        s.padding === 15 &&
        s.width === "100%"
    );
    expect(hasContainerStyle).toBe(true);
  });

  it("applies correct styles to the title", () => {
    const { getByText } = render(
      <ScoreBreakdown answers={mockAnswers} totalScore={mockTotalScore} />
    );
    const title = getByText("Score Breakdown:");
    const titleStyle = Array.isArray(title.props.style)
      ? title.props.style
      : [title.props.style];
    const hasTitleStyle = titleStyle.some(
      (s: any) =>
        s &&
        s.fontSize === 18 &&
        s.fontWeight === "bold" &&
        s.marginBottom === 10
    );
    expect(hasTitleStyle).toBe(true);
  });

  it("applies correct styles to question items", () => {
    const { getByText } = render(
      <ScoreBreakdown answers={mockAnswers} totalScore={mockTotalScore} />
    );
    const questionText = getByText("Question 1:");
    const questionStyle = Array.isArray(questionText.props.style)
      ? questionText.props.style
      : [questionText.props.style];
    const hasQuestionStyle = questionStyle.some(
      (s: any) => s && s.fontSize === 16
    );
    expect(hasQuestionStyle).toBe(true);
  });

  it("applies correct styles to score text", () => {
    const { getByText } = render(
      <ScoreBreakdown answers={mockAnswers} totalScore={mockTotalScore} />
    );
    const scoreText = getByText("5 points");
    const scoreStyle = Array.isArray(scoreText.props.style)
      ? scoreText.props.style
      : [scoreText.props.style];
    const hasScoreStyle = scoreStyle.some(
      (s: any) => s && s.fontSize === 16 && s.fontWeight === "bold"
    );
    expect(hasScoreStyle).toBe(true);
  });

  it("applies correct styles to total score section", () => {
    const { getByText } = render(
      <ScoreBreakdown answers={mockAnswers} totalScore={mockTotalScore} />
    );
    const totalScoreText = getByText("Total Score:");
    const totalStyle = Array.isArray(totalScoreText.props.style)
      ? totalScoreText.props.style
      : [totalScoreText.props.style];
    const hasTotalStyle = totalStyle.some(
      (s: any) => s && s.fontSize === 16 && s.fontWeight === "bold"
    );
    expect(hasTotalStyle).toBe(true);
  });

  it("handles animation prop correctly", () => {
    const fadeAnim = new Animated.Value(0);
    const { getByTestId } = render(
      <ScoreBreakdown
        answers={mockAnswers}
        totalScore={mockTotalScore}
        fadeAnim={fadeAnim}
        testID="score-breakdown"
      />
    );
    const container = getByTestId("score-breakdown");
    const style = Array.isArray(container.props.style)
      ? container.props.style
      : [container.props.style];
    // Check that at least one style object has the opacity property
    const hasOpacity = style.some(
      (s: any) => s && Object.prototype.hasOwnProperty.call(s, "opacity")
    );
    expect(hasOpacity).toBe(true);
  });

  it("handles empty answers array", () => {
    const { getByText, getAllByText } = render(
      <ScoreBreakdown answers={[]} totalScore={0} />
    );
    expect(getByText("Score Breakdown:")).toBeTruthy();
    expect(getByText("Total Score:")).toBeTruthy();
    // There will be multiple "0 points" texts, one for each question
    const zeroPoints = getAllByText("0 points");
    expect(zeroPoints.length).toBe(QUESTIONS.length + 1); // +1 for total score
  });

  it("handles missing question gracefully", () => {
    const invalidAnswers: Answer[] = [
      { questionId: 999, score: 5, selectedOptionId: 1 }, // Non-existent question ID
    ];
    const { getByText, getAllByText } = render(
      <ScoreBreakdown answers={invalidAnswers} totalScore={5} />
    );
    expect(getByText("Score Breakdown:")).toBeTruthy();
    expect(getByText("Total Score:")).toBeTruthy();
    // All questions should show 0 points except for the invalid one, plus total score
    const zeroPoints = getAllByText("0 points");
    expect(zeroPoints.length).toBe(QUESTIONS.length); // All questions show 0 points
  });
});
