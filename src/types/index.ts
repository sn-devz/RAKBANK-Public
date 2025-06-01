export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: number;
  text: string;
  score: number;
}

export interface Answer {
  questionId: number;
  selectedOptionId: number;
  score: number;
}

export type RiskProfile = 'Low' | 'Medium' | 'High';

export interface RiskProfileResult {
  totalScore: number;
  riskProfile: RiskProfile;
  description: string;
}

export interface QuestionnaireState {
  answers: Answer[];
  currentQuestionIndex: number;
  isCompleted: boolean;
  result: RiskProfileResult | null;
} 