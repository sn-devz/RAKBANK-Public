import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How would you describe your investment knowledge?",
    options: [
      { id: 1, text: "Novice", score: 1 },
      { id: 2, text: "Intermediate", score: 2 },
      { id: 3, text: "Advanced", score: 3 }
    ]
  },
  {
    id: 2,
    text: "Investment Duration",
    options: [
      { id: 1, text: "Short-term (less than 1 year)", score: 1 },
      { id: 2, text: "Medium-term (1-5 years)", score: 2 },
      { id: 3, text: "Long-term (more than 5 years)", score: 3 }
    ]
  },
  {
    id: 3,
    text: "How comfortable are you with taking risks?",
    options: [
      { id: 1, text: "Very risk-averse", score: 1 },
      { id: 2, text: "Somewhat risk-averse", score: 2 },
      { id: 3, text: "Neutral", score: 3 },
      { id: 4, text: "Somewhat risk-tolerant", score: 4 },
      { id: 5, text: "Very risk-tolerant", score: 5 }
    ]
  },
  {
    id: 4,
    text: "What percentage of your income are you willing to invest?",
    options: [
      { id: 1, text: "Less than 10%", score: 1 },
      { id: 2, text: "10-25%", score: 2 },
      { id: 3, text: "25-50%", score: 3 },
      { id: 4, text: "More than 50%", score: 4 }
    ]
  },
  {
    id: 5,
    text: "How would you react to a sudden drop in the value of your investments?",
    options: [
      { id: 1, text: "Panic and sell immediately", score: 1 },
      { id: 2, text: "Sell some investments", score: 2 },
      { id: 3, text: "Hold and wait", score: 3 },
      { id: 4, text: "Buy more at lower prices", score: 4 },
      { id: 5, text: "Aggressively buy more", score: 5 }
    ]
  }
];

export const RISK_PROFILE_RANGES = {
  LOW: { min: 5, max: 10 },
  MEDIUM: { min: 11, max: 15 },
  HIGH: { min: 16, max: 21 }
};

export const RISK_PROFILE_DESCRIPTIONS = {
  LOW: "You prefer stable, low-risk investments with predictable returns. Your portfolio should focus on capital preservation and income generation.",
  MEDIUM: "You're comfortable with moderate risk and can handle some market volatility. Your portfolio should balance growth and stability.",
  HIGH: "You're comfortable with higher risk and market volatility. Your portfolio can focus on growth and capital appreciation."
}; 