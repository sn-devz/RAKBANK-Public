import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import StartButton from "../StartButton";
import { colors } from "../../../utils/colors";

describe("StartButton", () => {
  it("renders correctly", () => {
    const { getByText } = render(<StartButton onPress={() => {}} />);
    expect(getByText("Start Assessment")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<StartButton onPress={onPressMock} />);

    fireEvent.press(getByText("Start Assessment"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("renders with correct styles", () => {
    const { getByText } = render(<StartButton onPress={() => {}} />);
    const button = getByText("Start Assessment");

    expect(button.props.style).toMatchObject({
      color: colors.text.white,
      fontSize: 18,
      fontWeight: "bold",
    });
  });
});
