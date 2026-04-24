import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, AppTypography } from '@/constants/design';

type BadgeVariant = 'primary' | 'secondary' | 'neutral';

type BadgeProps = {
  label?: string;
  count?: number;
  variant?: BadgeVariant;
  onPress?: () => void;
};

const variantColors: Record<BadgeVariant, string> = {
  primary: AppColors.primary,
  secondary: AppColors.secondary,
  neutral: AppColors.textSecondary,
};

export default function Badge({ label, count, variant = 'primary', onPress }: BadgeProps) {
  const content = label ?? (typeof count === 'number' ? String(count) : '');
  if (!content) return null;

  const Wrapper = onPress ? Pressable : View;
  return (
    <Wrapper style={[styles.container, { backgroundColor: variantColors[variant] }]} onPress={onPress}>
      <Text style={styles.text}>{content}</Text>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    minWidth: 24,
    height: 24,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: AppColors.white,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: AppTypography.primaryFont,
    fontWeight: '600',
  },
});
