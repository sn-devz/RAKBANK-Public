import React from "react";
import { render } from "@testing-library/react-native";
import ResultLabel from "../ResultLabel";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../utils/colors";

describe("ResultLabel", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<ResultLabel riskProfile="Low" />);
    expect(getByText("Low Risk")).toBeTruthy();
  });

  it("renders the correct text for Medium risk profile", () => {
    const { getByText } = render(<ResultLabel riskProfile="Medium" />);
    expect(getByText("Medium Risk")).toBeTruthy();
  });

  it("renders the correct text for High risk profile", () => {
    const { getByText } = render(<ResultLabel riskProfile="High" />);
    expect(getByText("High Risk")).toBeTruthy();
  });

  it("applies the correct gradient colors for Low risk profile", () => {
    const { UNSAFE_getByType } = render(<ResultLabel riskProfile="Low" />);
    const gradient = UNSAFE_getByType(LinearGradient);
    expect(gradient.props.colors).toEqual(["#4CAF50", "#8BC34A"]);
  });

  it("applies the correct gradient colors for Medium risk profile", () => {
    const { UNSAFE_getByType } = render(<ResultLabel riskProfile="Medium" />);
    const gradient = UNSAFE_getByType(LinearGradient);
    expect(gradient.props.colors).toEqual(["#FFC107", "#FFECB3"]);
  });

  it("applies the correct gradient colors for High risk profile", () => {
    const { UNSAFE_getByType } = render(<ResultLabel riskProfile="High" />);
    const gradient = UNSAFE_getByType(LinearGradient);
    expect(gradient.props.colors).toEqual(["#F44336", "#FFCDD2"]);
  });

  it("applies the correct styles to the text", () => {
    const { getByText } = render(<ResultLabel riskProfile="Low" />);
    const text = getByText("Low Risk");
    const style = Array.isArray(text.props.style)
      ? text.props.style
      : [text.props.style];
    const hasTextStyle = style.some(
      (s: any) => s && s.fontWeight === "bold" && s.color === colors.text.white
    );
    expect(hasTextStyle).toBe(true);
  });
});
