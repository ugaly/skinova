import { Eye, EyeOff, Search, Send, X } from 'lucide-react-native';
import React, { forwardRef, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { AppColors, AppTypography } from '@/constants/design';

export interface InputProps extends TextInputProps {
  label?: string;
  labelStyle?: any;
  error?: string;
  helperText?: string;
  type?: 'text' | 'password' | 'email' | 'search' | 'phone';
  clearable?: boolean;
  searchable?: boolean;
  sendable?: boolean;
  onClear?: () => void;
  onSearch?: (text: string) => void;
  onSend?: (text: string) => void;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      labelStyle,
      error,
      helperText,
      type = 'text',
      clearable = true,
      searchable = false,
      sendable = false,
      onClear,
      onSearch,
      onSend,
      onChangeText,
      value,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [textValue, setTextValue] = useState(value?.toString() ?? '');

    const keyboardType = useMemo(() => {
      if (type === 'email') return 'email-address';
      if (type === 'phone') return 'phone-pad';
      return 'default';
    }, [type]);

    const secureTextEntry = type === 'password' ? !showPassword : false;
    const hasText = textValue.length > 0;
    const trimmed = textValue.trim();

    const handleChange = (text: string) => {
      setTextValue(text);
      onChangeText?.(text);
    };

    return (
      <View style={styles.wrapper}>
        {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}

        <View
          style={[
            styles.inputBox,
            focused && styles.inputFocused,
            !!error && styles.inputError,
          ]}>
          <TextInput
            ref={ref}
            value={textValue}
            onChangeText={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={styles.input}
            placeholderTextColor={AppColors.textSecondary}
            {...props}
          />

          <View style={styles.actions}>
            {clearable && hasText ? (
              <Pressable
                onPress={() => {
                  setTextValue('');
                  onChangeText?.('');
                  onClear?.();
                }}
                style={styles.iconBtn}>
                <X size={16} color={AppColors.textSecondary} />
              </Pressable>
            ) : null}

            {type === 'password' ? (
              <Pressable onPress={() => setShowPassword((prev) => !prev)} style={styles.iconBtn}>
                {showPassword ? (
                  <EyeOff size={16} color={AppColors.textSecondary} />
                ) : (
                  <Eye size={16} color={AppColors.textSecondary} />
                )}
              </Pressable>
            ) : null}

            {searchable && onSearch ? (
              <Pressable
                onPress={() => trimmed && onSearch(trimmed)}
                style={[styles.pillAction, !trimmed && styles.pillDisabled]}>
                <Search size={14} color={trimmed ? AppColors.white : AppColors.textSecondary} />
              </Pressable>
            ) : null}

            {sendable && onSend ? (
              <Pressable
                onPress={() => {
                  if (!trimmed) return;
                  onSend(trimmed);
                  setTextValue('');
                  onChangeText?.('');
                }}
                style={[styles.pillAction, !trimmed && styles.pillDisabled]}>
                <Send size={14} color={trimmed ? AppColors.white : AppColors.textSecondary} />
              </Pressable>
            ) : null}
          </View>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
      </View>
    );
  }
);

Input.displayName = 'Input';
export default Input;

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  label: {
    marginBottom: 8,
    color: AppColors.textPrimary,
    fontFamily: AppTypography.primaryFont,
    fontWeight: '600',
    fontSize: 14,
  },
  inputBox: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AppColors.secondary,
    backgroundColor: AppColors.white,
    paddingLeft: 14,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFocused: { borderColor: AppColors.primary },
  inputError: { borderColor: '#B3261E' },
  input: {
    flex: 1,
    color: AppColors.textPrimary,
    fontFamily: AppTypography.primaryFont,
    fontSize: 15,
    lineHeight: 20,
  },
  actions: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { padding: 6 },
  pillAction: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.primary,
    marginLeft: 4,
  },
  pillDisabled: { backgroundColor: AppColors.background },
  error: {
    marginTop: 6,
    color: '#B3261E',
    fontSize: 12,
    fontFamily: AppTypography.primaryFont,
  },
  helper: {
    marginTop: 6,
    color: AppColors.textSecondary,
    fontSize: 12,
    fontFamily: AppTypography.primaryFont,
  },
});
