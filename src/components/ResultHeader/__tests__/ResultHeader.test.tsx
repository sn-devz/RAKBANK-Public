import React from "react";
import { render } from "@testing-library/react-native";
import { Animated } from "react-native";
import ResultHeader from "../ResultHeader";
import { colors } from "../../../utils/colors";
import { RiskProfileResult, Answer } from "../../../types";

// Mock the LinearGradient component
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => children,
}));

describe("ResultHeader", () => {
  const mockResult: RiskProfileResult = {
    totalScore: 15,
    riskProfile: "Medium",
    description:
      "You're comfortable with moderate risk and can handle some market volatility. Your portfolio should balance growth and stability.",
  };

  const mockAnswers: Answer[] = [
    { questionId: 1, selectedOptionId: 2, score: 3 },
    { questionId: 2, selectedOptionId: 2, score: 3 },
    { questionId: 3, selectedOptionId: 3, score: 3 },
    { questionId: 4, selectedOptionId: 3, score: 3 },
    { questionId: 5, selectedOptionId: 3, score: 3 },
  ];

  const mockFadeAnim = new Animated.Value(1);

  it("renders without crashing", () => {
    const { getByText } = render(
      <ResultHeader
        result={mockResult}
        answers={mockAnswers}
        fadeAnim={mockFadeAnim}
      />
    );
    expect(getByText("Your Risk Profile")).toBeTruthy();
  });

  it("displays the correct score and max score", () => {
    const { getByText } = render(
      <ResultHeader
        result={mockResult}
        answers={mockAnswers}
        fadeAnim={mockFadeAnim}
      />
    );
    const scoreText = getByText("15 / 20");
    expect(scoreText).toBeTruthy();
  });

  it("displays the correct risk profile", () => {
    const { getByText } = render(
      <ResultHeader
        result={mockResult}
        answers={mockAnswers}
        fadeAnim={mockFadeAnim}
      />
    );
    const riskProfileText = getByText("Medium Risk");
    expect(riskProfileText).toBeTruthy();
  });

  it("displays the correct score range", () => {
    const { getByText } = render(
      <ResultHeader
        result={mockResult}
        answers={mockAnswers}
        fadeAnim={mockFadeAnim}
      />
    );
    const scoreRangeText = getByText("Score Range: 11-15 points");
    expect(scoreRangeText).toBeTruthy();
  });

  it("renders the top icon", () => {
    const { UNSAFE_getByType } = render(
      <ResultHeader
        result={mockResult}
        answers={mockAnswers}
        fadeAnim={mockFadeAnim}
      />
    );
    // AntDesign icon is rendered
    expect(
      UNSAFE_getByType(require("@expo/vector-icons").AntDesign)
    ).toBeTruthy();
  });

  it("applies fade animation when fadeAnim prop is provided", () => {
    const fadeAnim = new Animated.Value(0.5);
    const { getByTestId } = render(
      <ResultHeader
        result={mockResult}
        answers={mockAnswers}
        fadeAnim={fadeAnim}
        testID="result-header"
      />
    );
    const container = getByTestId("result-header");
    const style = Array.isArray(container.props.style)
      ? container.props.style
      : [container.props.style];
    const hasOpacity = style.some(
      (s: any) => s && Object.prototype.hasOwnProperty.call(s, "opacity")
    );
    expect(hasOpacity).toBe(true);
  });

  it("applies correct styles to the title and score text", () => {
    const { getByText } = render(
      <ResultHeader
        result={mockResult}
        answers={mockAnswers}
        fadeAnim={mockFadeAnim}
      />
    );
    const title = getByText("Your Risk Profile");
    const scoreText = getByText("15 / 20");

    // Check title styles
    const titleStyle = Array.isArray(title.props.style)
      ? title.props.style[0]
      : title.props.style;
    expect(titleStyle).toMatchObject({
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text.primary,
    });

    // Check score text styles
    const scoreStyle = Array.isArray(scoreText.props.style)
      ? scoreText.props.style[0]
      : scoreText.props.style;
    expect(scoreStyle).toMatchObject({
      fontSize: 36,
      fontWeight: "bold",
      color: colors.text.primary,
    });
  });

  it("renders the risk profile label with correct text", () => {
    const { getByTestId, getByText } = render(
      <ResultHeader
        result={mockResult}
        answers={mockAnswers}
        fadeAnim={mockFadeAnim}
      />
    );
    const riskProfileLabel = getByTestId("risk-profile-label");
    expect(riskProfileLabel).toBeTruthy();
    expect(getByText("Medium Risk")).toBeTruthy();
  });

  it("applies correct styles to the score range text", () => {
    const { getByText } = render(
      <ResultHeader
        result={mockResult}
        answers={mockAnswers}
        fadeAnim={mockFadeAnim}
      />
    );
    const scoreRangeText = getByText("Score Range: 11-15 points");
    expect(scoreRangeText.props.style).toMatchObject({
      fontSize: 16,
      color: colors.text.secondary,
    });
  });

  it("handles different risk profiles", () => {
    // Low risk: totalScore <= 10
    const lowRiskAnswers = [
      { questionId: 1, optionId: 1, selectedOptionId: 1, score: 1 },
      { questionId: 2, optionId: 1, selectedOptionId: 1, score: 1 },
      { questionId: 3, optionId: 1, selectedOptionId: 1, score: 1 },
      { questionId: 4, optionId: 1, selectedOptionId: 1, score: 1 },
      { questionId: 5, optionId: 1, selectedOptionId: 1, score: 1 },
    ];
    // High risk: totalScore > 15
    const highRiskAnswers = [
      { questionId: 1, optionId: 3, selectedOptionId: 3, score: 3 },
      { questionId: 2, optionId: 3, selectedOptionId: 3, score: 3 },
      { questionId: 3, optionId: 5, selectedOptionId: 5, score: 5 },
      { questionId: 4, optionId: 5, selectedOptionId: 5, score: 5 },
      { questionId: 5, optionId: 5, selectedOptionId: 5, score: 5 },
    ];
    const { getByText, rerender } = render(
      <ResultHeader
        result={{ ...mockResult, riskProfile: "Low", totalScore: 5 }}
        answers={lowRiskAnswers}
        fadeAnim={mockFadeAnim}
      />
    );
    expect(getByText(/Low Risk/i)).toBeTruthy();

    rerender(
      <ResultHeader
        result={{ ...mockResult, riskProfile: "High", totalScore: 21 }}
        answers={highRiskAnswers}
        fadeAnim={mockFadeAnim}
      />
    );
    expect(getByText(/High Risk/i)).toBeTruthy();
  });

  it("handles null result", () => {
    const { queryByText } = render(
      <ResultHeader
        result={null}
        answers={mockAnswers}
        fadeAnim={mockFadeAnim}
      />
    );
    expect(queryByText("Your Risk Profile")).toBeNull();
  });
});
