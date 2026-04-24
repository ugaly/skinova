import { useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppColors, AppTypography } from '@/constants/design';

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
};

export default function OtpInput({ value, onChange, length = 6 }: OtpInputProps) {
  const inputRef = useRef<TextInput>(null);
  const digits = useMemo(
    () => Array.from({ length }).map((_, i) => value[i] ?? ''),
    [length, value]
  );

  return (
    <Pressable style={styles.wrapper} onPress={() => inputRef.current?.focus()}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => onChange(text.replace(/\D/g, '').slice(0, length))}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        style={styles.hiddenInput}
      />
      <View style={styles.row}>
        {digits.map((digit, idx) => {
          const active = idx === value.length;
          return (
            <View key={idx} style={[styles.box, active && styles.boxActive]}>
              <Text style={styles.boxText}>{digit}</Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  box: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AppColors.secondary,
    backgroundColor: AppColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxActive: {
    borderColor: AppColors.primary,
    shadowColor: AppColors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  boxText: {
    color: AppColors.textPrimary,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
    fontFamily: AppTypography.primaryFont,
  },
});
