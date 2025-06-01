import { Question } from "types";

export interface QuestionCardProps {
    question: Question;
    currentQuestionIndex: number;
    totalQuestions: number;
    children: React.ReactNode;
    testID?: string;
  }
  