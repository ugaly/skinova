import { Pressable, StyleSheet, Text } from 'react-native';

import { AppColors, AppTypography } from '@/constants/design';

type TextButtonProps = {
  label: string;
  onPress: () => void;
};

export function TextButton({ label, onPress }: TextButtonProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  text: {
    color: AppColors.primary,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: AppTypography.medium,
  },
});
