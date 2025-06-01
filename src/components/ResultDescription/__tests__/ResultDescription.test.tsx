import React from "react";
import { render } from "@testing-library/react-native";
import { Animated } from "react-native";
import ResultDescription from "../ResultDescription";
import { colors } from "../../../utils/colors";

describe("ResultDescription", () => {
  const description = "This is a test description.";

  it("renders without crashing", () => {
    const { getByText } = render(
      <ResultDescription description={description} />
    );
    expect(getByText("What This Means")).toBeTruthy();
    expect(getByText(description)).toBeTruthy();
  });

  it("renders the correct description text", () => {
    const { getByText } = render(
      <ResultDescription description={description} />
    );
    expect(getByText(description)).toBeTruthy();
  });

  it("applies fade animation when fadeAnim prop is provided", () => {
    const fadeAnim = new Animated.Value(0.5);
    const { UNSAFE_getByType } = render(
      <ResultDescription description={description} fadeAnim={fadeAnim} />
    );
    const animatedView = UNSAFE_getByType(Animated.View);
    const style = Array.isArray(animatedView.props.style)
      ? animatedView.props.style
      : [animatedView.props.style];
    const hasOpacity = style.some(
      (s: any) => s && Object.prototype.hasOwnProperty.call(s, "opacity")
    );
    expect(hasOpacity).toBe(true);
  });

  it("applies correct styles to the title and description text", () => {
    const { getByText } = render(
      <ResultDescription description={description} />
    );
    const title = getByText("What This Means");
    const desc = getByText(description);
    const titleStyle = Array.isArray(title.props.style)
      ? title.props.style
      : [title.props.style];
    const descStyle = Array.isArray(desc.props.style)
      ? desc.props.style
      : [desc.props.style];
    const hasTitleStyle = titleStyle.some(
      (s: any) => s && s.fontWeight === "bold"
    );
    const hasDescStyle = descStyle.some(
      (s: any) => s && s.color === colors.text.secondary
    );
    expect(hasTitleStyle).toBe(true);
    expect(hasDescStyle).toBe(true);
  });
});
