import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ChevronLeft, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import Animated, { FadeIn, FadeInDown, FadeInUp, Layout, ZoomIn } from 'react-native-reanimated';

import Avatar from '@/components/ui/avatar';
import Badge from '@/components/ui/badge';
import AnimatedDots from '@/components/ui/animated-dots';
import OtpInput from '@/components/ui/otp-input';
import SocialAuthButton from '@/components/ui/social-auth-button';
import { AppColors, AppTypography, AuthAssets } from '@/constants/design';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import i18n from '@/lib/i18n';

type AuthStep = 'providers' | 'phone' | 'otp';

export default function AuthModalScreen() {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>('providers');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('TZ');
  const [callingCode, setCallingCode] = useState('255');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const { setCurrentStep } = useOnboardingStore();

  useEffect(() => {
    if (step === 'providers') setCurrentStep(0);
    if (step === 'phone') setCurrentStep(1);
    if (step === 'otp') setCurrentStep(2);
  }, [step, setCurrentStep]);

  const formattedPhone = phone.trim() ? `+${callingCode} ${phone.trim()}` : `+${callingCode} *** *** ***`;

  return (
    <View style={styles.container}>
      <Image source={AuthAssets.backgroundImage} contentFit="cover" style={styles.bgImage} />
      <View style={styles.tintLayer} />

      <Animated.View entering={FadeIn.duration(400).delay(200)} style={styles.closeWrap}>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <X size={20} color={AppColors.white} />
        </Pressable>
      </Animated.View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 14 : 0}
        style={styles.keyboardAvoidWrap}>
        <Animated.View entering={FadeInUp.springify().damping(18).delay(100)} style={styles.bottomWrap}>
          <BlurView intensity={60} tint="dark" style={styles.card}>
            <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.headerRowCompact}>
              {step !== 'providers' ? (
                <Pressable onPress={() => setStep(step === 'otp' ? 'phone' : 'providers')} style={styles.backBtn}>
                  <ChevronLeft size={20} color={AppColors.white} />
                </Pressable>
              ) : (
                <Animated.View entering={ZoomIn.springify().delay(300)}>
                  <Avatar source={AuthAssets.backgroundImage} size={48} fallbackText="Skin Care" />
                </Animated.View>
              )}
              <View style={styles.headerTextWrap}>
                <Text style={styles.title}>
                  {step === 'providers' ? i18n.t('auth_title') : step === 'phone' ? i18n.t('auth_phone_title') : i18n.t('auth_otp_title')}
                </Text>
                {/* <Text style={styles.subtitle}>
                  {step === 'providers'
                    ? i18n.t('auth_subtitle')
                    : step === 'phone'
                      ? 'Enter your phone number to receive a one-time verification code.'
                      : `We sent a 6-digit code to ${formattedPhone}`}
                </Text> */}
              </View>
              <Badge label={step === 'providers' ? i18n.t('auth_badge_signin') : step === 'phone' ? i18n.t('auth_badge_step2') : i18n.t('auth_badge_step3')} variant="secondary" />
            </Animated.View>

            <Animated.View entering={FadeIn.duration(500).delay(350)}>
              <AnimatedDots totalSteps={3} />
            </Animated.View>

            {step === 'providers' ? (
              <Animated.View
                entering={FadeInDown.springify().damping(16).delay(400)}
                layout={Layout.springify().damping(16)}
                style={styles.choices}>
                <View style={styles.providersHeader}>
                  <Text style={styles.providersTitle}>{i18n.t('auth_choose_method_title')}</Text>
                  <Text style={styles.providersSub}>{i18n.t('auth_choose_method_sub')}</Text>
                </View>
                <View style={styles.providersRow}>
                  <View style={styles.providerCell}>
                    <SocialAuthButton
                      provider="google"
                        label={i18n.t('auth_provider_google')}
                      compact
                      onPress={() => router.replace('/questionnaire' as never)}
                    />
                  </View>
                  {Platform.OS === 'ios' ? (
                    <View style={styles.providerCell}>
                      <SocialAuthButton
                        provider="apple"
                        label={i18n.t('auth_provider_apple')}
                        compact
                        onPress={() => router.replace('/questionnaire' as never)}
                      />
                    </View>
                  ) : null}
                </View>
                <SocialAuthButton provider="email" label={i18n.t('auth_provider_phone')} onPress={() => setStep('phone')} />
                <Text style={styles.providersFooter}>{i18n.t('auth_terms_footer')}</Text>
              </Animated.View>
            ) : null}

            {step === 'phone' ? (
              <Animated.View
                entering={FadeInDown.springify().damping(16)}
                layout={Layout.springify().damping(16)}
                style={styles.focusForm}>
                <Text style={styles.phoneLabel}>{i18n.t('auth_phone_label')}</Text>
                <View style={styles.phoneField}>
                  <Pressable
                    style={styles.countryPickerWrap}
                    onPress={() => setCountryPickerVisible(true)}
                    hitSlop={8}
                  >
                    <CountryPicker
                      countryCode={countryCode}
                      visible={countryPickerVisible}
                      withFilter
                      withFlag
                      withCallingCode
                      withEmoji
                      withAlphaFilter
                      onClose={() => setCountryPickerVisible(false)}
                      onSelect={(country) => {
                        setCountryCode(country.cca2);
                        setCallingCode(country.callingCode?.[0] || '255');
                        setCountryPickerVisible(false);
                      }}
                    />
                    <Text style={styles.callingCodeText}>+{callingCode}</Text>
                  </Pressable>
                  <TextInput
                    placeholder={i18n.t('auth_phone_placeholder')}
                    placeholderTextColor="rgba(255,255,255,0.45)"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    style={styles.phoneInputText}
                  />
                </View>

                <Pressable
                  style={[styles.primaryAction, phone.trim().length < 8 && styles.primaryActionDisabled]}
                  onPress={() => setStep('otp')}
                  disabled={phone.trim().length < 8}
                >
                  <Text style={styles.primaryActionText}>{i18n.t('auth_send_otp')}</Text>
                </Pressable>
              </Animated.View>
            ) : null}

            {step === 'otp' ? (
              <Animated.View
                entering={FadeInDown.springify().damping(16)}
                layout={Layout.springify().damping(16)}
                style={styles.focusForm}>
                <OtpInput value={otpCode} onChange={setOtpCode} />
                <Pressable
                  style={[styles.primaryAction, otpCode.length < 6 && styles.primaryActionDisabled]}
                  onPress={() => router.replace('/questionnaire' as never)}
                  disabled={otpCode.length < 6}>
                  <Text style={styles.primaryActionText}>{i18n.t('auth_verify_continue')}</Text>
                </Pressable>
                <Pressable onPress={() => setOtpCode('')} style={styles.inlineActionWrap}>
                  <Text style={styles.inlineAction}>{i18n.t('auth_resend_prefix')} {formattedPhone}</Text>
                </Pressable>
              </Animated.View>
            ) : null}
          </BlurView>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  bgImage: { ...StyleSheet.absoluteFillObject },
  tintLayer: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: '#000',
    // opacity: 0.25,
  },
  closeWrap: {
    position: 'absolute',
    top: 56,
    right: 20,
    zIndex: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  keyboardAvoidWrap: {
    marginTop: 'auto',
  },
  bottomWrap: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  card: {
    borderRadius: 32,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: 'rgba(6, 78, 59, 0.65)', // Dark translucent green background
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)', // Glass border with slight green tint
  },
  headerRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTextWrap: {
    flex: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    color: AppColors.white, // White text for Pro UI
    fontFamily: AppTypography.bold,
    fontSize: 22,
    lineHeight: 28,
  },
  subtitle: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: AppTypography.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  choices: {
    marginTop: 20,
    gap: 12,
  },
  providersHeader: {
    marginBottom: 2,
    gap: 4,
  },
  providersTitle: {
    color: '#FFFFFF',
    fontFamily: AppTypography.bold,
    fontSize: 15,
    letterSpacing: 0.2,
  },
  providersSub: {
    color: 'rgba(255,255,255,0.62)',
    fontFamily: AppTypography.regular,
    fontSize: 12,
    lineHeight: 18,
  },
  providersRow: {
    flexDirection: 'row',
    gap: 10,
  },
  providerCell: {
    flex: 1,
  },
  providersFooter: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.48)',
    fontFamily: AppTypography.regular,
    fontSize: 11.5,
    lineHeight: 16,
    textAlign: 'center',
  },
  focusForm: {
    marginTop: 20,
    gap: 12,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 360,
  },
  phoneLabel: {
    color: '#FFFFFF',
    fontFamily: AppTypography.semibold,
    fontSize: 14,
    lineHeight: 20,
  },
  phoneField: {
    minHeight: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  countryPickerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.18)',
  },
  callingCodeText: {
    color: '#FFFFFF',
    fontFamily: AppTypography.bold,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  phoneInputText: {
    flex: 1,
    color: '#FFFFFF',
    fontFamily: AppTypography.medium,
    fontSize: 15,
    lineHeight: 20,
    paddingVertical: 10,
  },
  primaryAction: {
    marginTop: 12,
    minHeight: 56,
    borderRadius: 20,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: AppColors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  primaryActionDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
  },
  primaryActionText: {
    color: AppColors.white,
    fontFamily: AppTypography.bold,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  inlineActionWrap: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  inlineAction: {
    color: '#2DD4BF',
    fontSize: 15,
    fontFamily: AppTypography.semibold,
  },
});
