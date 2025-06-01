import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";

// Define mock prop types for child components
type MockResultHeaderProps = {
  testID: string;
  result: any;
  answers: any;
  fadeAnim: any;
};
type MockResultDescriptionProps = {
  testID: string;
  description: string;
  fadeAnim: any;
};
type MockResultButtonsProps = {
  testID: string;
  onTakeAgain: () => void;
  fadeAnim: any;
};
type MockScoreBreakdownProps = {
  testID: string;
  answers: any;
  totalScore: number;
};

// Mock components
const mockResultHeader = (props: MockResultHeaderProps) => (
  <View testID={props.testID}>
    <Text>Mock ResultHeader</Text>
  </View>
);

const mockResultDescription = (props: MockResultDescriptionProps) => (
  <View testID={props.testID}>
    <Text>Mock ResultDescription</Text>
  </View>
);

const mockResultButtons = (props: MockResultButtonsProps) => (
  <TouchableOpacity testID={props.testID} onPress={props.onTakeAgain}>
    <Text>Mock ResultButtons</Text>
  </TouchableOpacity>
);

const mockScoreBreakdown = (props: MockScoreBreakdownProps) => (
  <View testID={props.testID}>
    <Text>Mock ScoreBreakdown</Text>
  </View>
);

// Mock useResultData
const mockHandleRestart = jest.fn();
const mockFadeAnim = { current: { setValue: jest.fn() } };
const mockResult = { totalScore: 10, description: "Test result" };
const mockAnswers = [
  { questionId: 1, selectedOptionId: 1, score: 5 },
  { questionId: 2, selectedOptionId: 2, score: 5 },
];

jest.mock("../../../hooks/useResultData", () => () => ({
  result: mockResult,
  answers: mockAnswers,
  fadeAnim: mockFadeAnim,
  handleRestart: mockHandleRestart,
}));

jest.mock("../../../hooks/useFadeAnimation", () => () => ({
  fadeIn: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock("components/ResultHeader/ResultHeader", () => ({
  __esModule: true,
  default: (props: any) => {
    const { View, Text } = require("react-native");
    return (
      <View testID={props.testID}>
        <Text>Mock ResultHeader</Text>
      </View>
    );
  },
}));

jest.mock("components/ResultDescription/ResultDescription", () => ({
  __esModule: true,
  default: (props: any) => {
    const { View, Text } = require("react-native");
    return (
      <View testID={props.testID}>
        <Text>Mock ResultDescription</Text>
      </View>
    );
  },
}));

jest.mock("components/ResultButtons/ResultButtons", () => ({
  __esModule: true,
  default: (props: any) => {
    const { TouchableOpacity, Text } = require("react-native");
    return (
      <TouchableOpacity testID={props.testID} onPress={props.onTakeAgain}>
        <Text>Mock ResultButtons</Text>
      </TouchableOpacity>
    );
  },
}));

jest.mock("components/ScoreBreakdown/ScoreBreakdown", () => ({
  __esModule: true,
  default: (props: any) => {
    const { View, Text } = require("react-native");
    return (
      <View testID={props.testID}>
        <Text>Mock ScoreBreakdown</Text>
      </View>
    );
  },
}));

let ResultScreen: React.ComponentType<any>;

describe("ResultScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ResultScreen = require("../ResultScreen").default;
  });

  it("renders all child components (ResultHeader, ResultDescription, ResultButtons, ScoreBreakdown) with correct props", () => {
    const { getByTestId } = render(<ResultScreen />);
    expect(getByTestId("result-screen")).toBeTruthy();
    expect(getByTestId("scroll-content")).toBeTruthy();
    expect(getByTestId("result-header")).toBeTruthy();
    expect(getByTestId("result-description")).toBeTruthy();
    expect(getByTestId("result-buttons")).toBeTruthy();
    expect(getByTestId("score-breakdown")).toBeTruthy();
  });

  it("calls handleRestart and navigates to Welcome when onTakeAgain is triggered", () => {
    const { getByTestId } = render(<ResultScreen />);
    const resultButtons = getByTestId("result-buttons");
    fireEvent(resultButtons, "onPress");
    expect(mockHandleRestart).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("Welcome");
  });

  it("returns null if no result is available (mocked useResultData returns null result)", () => {
    jest.resetModules();
    jest.doMock("../../../hooks/useResultData", () => () => ({
      result: null,
      answers: [],
      fadeAnim: mockFadeAnim,
      handleRestart: mockHandleRestart,
    }));
    const ResultScreenWithNull = require("../ResultScreen").default;
    const { queryByTestId } = render(<ResultScreenWithNull />);
    expect(queryByTestId("result-screen")).toBeNull();
    jest.dontMock("../../../hooks/useResultData");
  });
});
