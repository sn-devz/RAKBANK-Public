import React from "react";
import { render } from "@testing-library/react-native";
import RiskLevelSection from "../RiskLevelSection";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { colors } from "../../../utils/colors";
import { ONBOARDING_CONSTANTS } from "../../../constants/onboarding";

describe("RiskLevelSection", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<RiskLevelSection />);
    expect(getByText(ONBOARDING_CONSTANTS.RISK_LEVELS.LOW.TITLE)).toBeTruthy();
    expect(
      getByText(ONBOARDING_CONSTANTS.RISK_LEVELS.MEDIUM.TITLE)
    ).toBeTruthy();
    expect(getByText(ONBOARDING_CONSTANTS.RISK_LEVELS.HIGH.TITLE)).toBeTruthy();
  });

  it("renders the correct descriptions", () => {
    const { getByText } = render(<RiskLevelSection />);
    expect(
      getByText(ONBOARDING_CONSTANTS.RISK_LEVELS.LOW.DESCRIPTION)
    ).toBeTruthy();
    expect(
      getByText(ONBOARDING_CONSTANTS.RISK_LEVELS.MEDIUM.DESCRIPTION)
    ).toBeTruthy();
    expect(
      getByText(ONBOARDING_CONSTANTS.RISK_LEVELS.HIGH.DESCRIPTION)
    ).toBeTruthy();
  });

  it("renders the correct icons", () => {
    const { UNSAFE_getByType } = render(<RiskLevelSection />);
    expect(UNSAFE_getByType(Ionicons)).toBeTruthy();
    expect(UNSAFE_getByType(MaterialCommunityIcons)).toBeTruthy();
    expect(UNSAFE_getByType(AntDesign)).toBeTruthy();
  });

  it("applies correct styles to the risk level items", () => {
    const { getByTestId } = render(<RiskLevelSection />);
    const lowRiskItem = getByTestId("risk-level-item-low risk");
    const mediumRiskItem = getByTestId("risk-level-item-medium risk");
    const highRiskItem = getByTestId("risk-level-item-high risk");

    expect(lowRiskItem.props.style).toMatchObject({
      backgroundColor: colors.background.secondary,
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    });
    expect(mediumRiskItem.props.style).toMatchObject({
      backgroundColor: colors.background.secondary,
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    });
    expect(highRiskItem.props.style).toMatchObject({
      backgroundColor: colors.background.secondary,
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    });
  });

  it("renders icons with correct colors", () => {
    const { UNSAFE_getByType } = render(<RiskLevelSection />);
    const lowRiskIcon = UNSAFE_getByType(Ionicons);
    const mediumRiskIcon = UNSAFE_getByType(MaterialCommunityIcons);
    const highRiskIcon = UNSAFE_getByType(AntDesign);

    expect(lowRiskIcon.props.color).toBe(colors.riskProfile.low.main);
    expect(mediumRiskIcon.props.color).toBe(colors.riskProfile.medium.main);
    expect(highRiskIcon.props.color).toBe(colors.riskProfile.high.main);
  });

  it("applies correct text styles to titles", () => {
    const { getByText } = render(<RiskLevelSection />);
    const title = getByText(ONBOARDING_CONSTANTS.RISK_LEVELS.LOW.TITLE);
    expect(title.props.style).toMatchObject({
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    });
  });

  it("applies correct text styles to descriptions", () => {
    const { getByText } = render(<RiskLevelSection />);
    const description = getByText(
      ONBOARDING_CONSTANTS.RISK_LEVELS.LOW.DESCRIPTION
    );
    expect(description.props.style).toMatchObject({
      fontSize: 14,
      color: colors.text.secondary,
    });
  });

  it("renders icons with correct sizes", () => {
    const { UNSAFE_getByType } = render(<RiskLevelSection />);
    const lowRiskIcon = UNSAFE_getByType(Ionicons);
    const mediumRiskIcon = UNSAFE_getByType(MaterialCommunityIcons);
    const highRiskIcon = UNSAFE_getByType(AntDesign);

    expect(lowRiskIcon.props.size).toBe(24);
    expect(mediumRiskIcon.props.size).toBe(24);
    expect(highRiskIcon.props.size).toBe(24);
  });

  it("applies correct layout styles to container", () => {
    const { getByTestId } = render(<RiskLevelSection />);
    const container = getByTestId("risk-level-container");
    expect(container.props.style).toMatchObject({
      marginBottom: 40,
      width: "100%",
    });
  });
});
