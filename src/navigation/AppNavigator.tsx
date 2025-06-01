import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/OnboardingScreen/OnboardingScreen";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import QuestionScreen from "screens/QuestionScreen/QuestionScreen";
import ResultScreen from "screens/ResultScreen/ResultScreen";

export type RootStackParamList = {
  Welcome: undefined;
  Question: undefined;
  Result: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const isCompleted = useSelector(
    (state: RootState) => state.questionnaire.isCompleted
  );

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Question" component={QuestionScreen} />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
