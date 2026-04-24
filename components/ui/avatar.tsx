import React, { useMemo } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, AppTypography } from '@/constants/design';

type AvatarProps = {
  source?: string | { uri: string };
  size?: number;
  fallbackText?: string;
  onPress?: () => void;
  isLoading?: boolean;
  isOnline?: boolean;
};

export default function Avatar({
  source,
  size = 44,
  fallbackText = '',
  onPress,
  isLoading = false,
  isOnline = false,
}: AvatarProps) {
  const initials = useMemo(
    () =>
      fallbackText
        .split(' ')
        .map((part) => part.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    [fallbackText]
  );

  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color={AppColors.primary} />
      ) : source ? (
        <Image
          source={typeof source === 'string' ? { uri: source } : source}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : (
        <Text style={[styles.initials, { fontSize: size * 0.36 }]}>{initials || 'SC'}</Text>
      )}

      {isOnline ? <View style={styles.onlineDot} /> : null}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: AppColors.secondary,
    overflow: 'hidden',
  },
  initials: {
    color: AppColors.textPrimary,
    fontFamily: AppTypography.primaryFont,
    fontWeight: '600',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: AppColors.primary,
    borderWidth: 1,
    borderColor: AppColors.white,
  },
});
