import React from "react";
import { render } from "@testing-library/react-native";
import DurationInfo from "../DurationInfo";
import { ONBOARDING_CONSTANTS } from "../../../constants/onboarding";
import { colors } from "../../../utils/colors";

describe("DurationInfo", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<DurationInfo questionCount={5} />);
    expect(
      getByText(
        ONBOARDING_CONSTANTS.DURATION_INFO.MULTIPLE.replace("{count}", "5")
      )
    ).toBeTruthy();
  });

  it("displays the correct question count", () => {
    const questionCount = 7;
    const { getByText } = render(
      <DurationInfo questionCount={questionCount} />
    );
    expect(
      getByText(
        ONBOARDING_CONSTANTS.DURATION_INFO.MULTIPLE.replace(
          "{count}",
          questionCount.toString()
        )
      )
    ).toBeTruthy();
  });

  it("displays single question text when count is 1", () => {
    const { getByText } = render(<DurationInfo questionCount={1} />);
    expect(getByText(ONBOARDING_CONSTANTS.DURATION_INFO.SINGLE)).toBeTruthy();
  });

  it("applies the correct style", () => {
    const { getByText } = render(<DurationInfo questionCount={3} />);
    const text = getByText(
      ONBOARDING_CONSTANTS.DURATION_INFO.MULTIPLE.replace("{count}", "3")
    );
    expect(text.props.style).toEqual({
      fontSize: 14,
      color: colors.text.secondary,
    });
  });
});
