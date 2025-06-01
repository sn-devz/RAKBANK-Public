import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import OnboardingScreen from "../OnboardingScreen";
import { QUESTIONS } from "../../../constants/questions";

// Create a fully mocked navigation prop
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  dangerouslyGetParent: jest.fn(),
  dangerouslyGetState: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => mockNavigation,
}));

describe("OnboardingScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByTestId, getByText } = render(<OnboardingScreen />);

    // Check if main container exists
    expect(getByTestId("onboarding-container")).toBeTruthy();

    // Check if title and subtitle are rendered
    expect(getByText("Risk Profile Assessment")).toBeTruthy();
    expect(
      getByText(
        "Help us understand your investment preferences to create the perfect portfolio for you."
      )
    ).toBeTruthy();
  });

  it("displays correct question count in DurationInfo", () => {
    const { getByText } = render(<OnboardingScreen />);
    expect(getByText(new RegExp(`${QUESTIONS.length} questions`))).toBeTruthy();
  });

  it("navigates to Question screen when Start button is pressed", () => {
    const { getByText } = render(<OnboardingScreen />);

    // Find and press the start button
    const startButton = getByText("Start Assessment");
    fireEvent.press(startButton);

    // Verify navigation was called with correct screen
    expect(mockNavigate).toHaveBeenCalledWith("Question");
  });

  it("renders all required components", () => {
    const { getByTestId } = render(<OnboardingScreen />);

    // Check if all main components are rendered
    expect(getByTestId("onboarding-container")).toBeTruthy();
    // Note: Add testIDs to other components if needed for more specific testing
  });

  it("applies correct styles", () => {
    const { getByTestId } = render(<OnboardingScreen />);
    const container = getByTestId("onboarding-container");

    // Check if container has the correct style
    expect(container.props.style).toMatchObject({
      flex: 1,
      backgroundColor: "#fff",
    });
  });
});
