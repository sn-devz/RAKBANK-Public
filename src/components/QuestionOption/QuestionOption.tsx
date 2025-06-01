import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { styles } from "./style";
import { QuestionOptionProps } from "./type";

const QuestionOption: React.FC<QuestionOptionProps> = ({
  option,
  isSelected,
  onSelect,
  testID,
}) => {
  return (
    <TouchableOpacity
      style={[styles.optionButton, isSelected && styles.selectedOption]}
      onPress={() => onSelect(option.id, option.score)}
      testID={testID}
    >
      <Text
        style={[styles.optionText, isSelected && styles.selectedOptionText]}
      >
        {option.text}
      </Text>
      <View
        style={[styles.radioButton, isSelected && styles.radioButtonSelected]}
      >
        {isSelected && (
          <View style={styles.radioButtonInner} testID={`${testID}-inner`} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default QuestionOption;
