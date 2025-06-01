import React from "react";
import { render } from "@testing-library/react-native";
import OnboardingHeader from "../OnboardingHeader";
import { colors } from "../../../utils/colors";

describe("OnboardingHeader", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <OnboardingHeader title="Welcome" subtitle="Get started" />
    );
    expect(getByText("Welcome")).toBeTruthy();
    expect(getByText("Get started")).toBeTruthy();
  });

  it("displays the correct title and subtitle", () => {
    const title = "Test Title";
    const subtitle = "Test Subtitle";
    const { getByText } = render(
      <OnboardingHeader title={title} subtitle={subtitle} />
    );
    expect(getByText(title)).toBeTruthy();
    expect(getByText(subtitle)).toBeTruthy();
  });

  it("applies the correct styles", () => {
    const { getByText } = render(
      <OnboardingHeader title="Welcome" subtitle="Get started" />
    );
    const titleElement = getByText("Welcome");
    const subtitleElement = getByText("Get started");
    expect(titleElement.props.style).toEqual(
      expect.objectContaining({
        fontSize: 28,
        fontWeight: "bold",
        color: colors.text.primary,
      })
    );
    expect(subtitleElement.props.style).toEqual(
      expect.objectContaining({
        fontSize: 16,
        color: colors.text.secondary,
        textAlign: "center",
      })
    );
  });
});
