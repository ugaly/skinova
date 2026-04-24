import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { AppColors, AppTypography } from '@/constants/design';

type Provider = 'google' | 'apple' | 'email';

type SocialAuthButtonProps = {
  provider: Provider;
  label: string;
  onPress: () => void;
};

function ProviderIcon({ provider }: { provider: Provider }) {
  if (provider === 'google') {
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24">
        <Path
          d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.2c1.9-1.8 3.1-4.4 3.1-7.5Z"
          fill="#4285F4"
        />
        <Path
          d="M12 22c2.7 0 5-1 6.7-2.7l-3.2-2.6c-.9.6-2 1-3.5 1a6 6 0 0 1-5.6-4H3.2v2.7A10 10 0 0 0 12 22Z"
          fill="#34A853"
        />
        <Path
          d="M6.4 13.7a6.2 6.2 0 0 1 0-3.4V7.6H3.2a10 10 0 0 0 0 8.8l3.2-2.7Z"
          fill="#FBBC05"
        />
        <Path
          d="M12 6.1c1.5 0 2.9.5 3.9 1.5l2.9-2.9A10 10 0 0 0 3.2 7.6l3.2 2.7a6 6 0 0 1 5.6-4.2Z"
          fill="#EA4335"
        />
      </Svg>
    );
  }

  if (provider === 'apple') {
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24">
        <Path
          fill={AppColors.textPrimary}
          d="M16.9 12.3c0-2 1.6-3 1.7-3-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.2.8-.6 0-1.6-.8-2.7-.8-1.4 0-2.7.8-3.4 2-.9 1.6-.2 4 .7 5.2.5.6 1 1.3 1.8 1.2.8 0 1-.5 2-.5s1.2.5 2 .5 1.3-.6 1.8-1.2c.6-.8.9-1.6 1-1.7 0 0-1.7-.7-1.7-2.8Zm-2.2-6c.4-.5.8-1.2.7-2-.6 0-1.4.4-1.8.9-.4.5-.8 1.2-.7 2 .7.1 1.4-.4 1.8-.9Z"
        />
      </Svg>
    );
  }

  return (
    <View style={styles.emailDotWrap}>
      <Text style={styles.emailDotText}>@</Text>
    </View>
  );
}

export default function SocialAuthButton({ provider, label, onPress }: SocialAuthButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <View style={styles.iconWrap}>
        <ProviderIcon provider={provider} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 18,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.secondary,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: AppColors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: AppColors.textPrimary,
    fontFamily: AppTypography.primaryFont,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
  emailDotWrap: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailDotText: {
    color: AppColors.white,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: AppTypography.primaryFont,
  },
});
