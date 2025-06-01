# Risk Profile Questionnaire Mobile App

A React Native app to help users determine their risk profile for opening a bank account. The app guides users through a series of investment-related questions and calculates a risk profile score and category (Low, Medium, High) based on their answers.

## Features
- User-friendly onboarding and questionnaire screens
- Dynamic scoring logic based on user responses
- Risk profile categorization (Low, Medium, High)
- Result summary with score and explanation
- Navigation between screens
- State management with Redux
- Centralized constants for easy updates
- Unit tests for all major components

## Requirements
- Node.js (v16 or later recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator, Android Emulator, or a physical device with Expo Go

## Installation
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd RiskProfileApp
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the App
1. **Start the development server:**
   ```bash
   npm start
   # or
   expo start
   ```
2. **Open the app:**
   - Use the QR code in your terminal or browser to open the app in Expo Go on your device.
   - Or, run on an emulator/simulator from the Expo Dev Tools.

## Running Tests
Run all unit tests with:
```bash
npm test
# or
yarn test
```
All major components and logic are covered by tests.

## Project Structure
- `src/components/` — Reusable UI components
- `src/screens/` — App screens (Onboarding, Questionnaire, Result)
- `src/constants/` — Centralized constants for questions, text, and risk levels
- `src/store/` — Redux store and slices
- `src/hooks/` — Custom hooks for logic and animation

## Notes
- Update the questions and scoring logic in `src/constants/questions.ts` as needed.
- All text and labels are centralized for easy updates and future localization.

## License
This project is for demonstration and educational purposes. 
