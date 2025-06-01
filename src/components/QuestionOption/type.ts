import { QuestionOption as OptionType } from "../../types";

export interface QuestionOptionProps {
    option: OptionType;
    isSelected: boolean;
    onSelect: (optionId: number, score: number) => void;
    testID?: string;
  }