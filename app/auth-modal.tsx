import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ChevronLeft, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, Layout, ZoomIn } from 'react-native-reanimated';

import Avatar from '@/components/ui/avatar';
import Badge from '@/components/ui/badge';
import AnimatedDots from '@/components/ui/animated-dots';
import Input from '@/components/ui/input';
import OtpInput from '@/components/ui/otp-input';
import SocialAuthButton from '@/components/ui/social-auth-button';
import { AppColors, AppTypography, AuthAssets } from '@/constants/design';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import i18n from '@/lib/i18n';

type AuthStep = 'providers' | 'email' | 'otp';

export default function AuthModalScreen() {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>('providers');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const { setCurrentStep } = useOnboardingStore();

  useEffect(() => {
    if (step === 'providers') setCurrentStep(0);
    if (step === 'email') setCurrentStep(1);
    if (step === 'otp') setCurrentStep(2);
  }, [step, setCurrentStep]);

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
                <Pressable onPress={() => setStep(step === 'otp' ? 'email' : 'providers')} style={styles.backBtn}>
                  <ChevronLeft size={20} color={AppColors.white} />
                </Pressable>
              ) : (
                <Animated.View entering={ZoomIn.springify().delay(300)}>
                  <Avatar source={AuthAssets.backgroundImage} size={48} fallbackText="Skin Care" />
                </Animated.View>
              )}
              <View style={styles.headerTextWrap}>
                <Text style={styles.title}>
                  {step === 'providers' ? i18n.t('auth_title') : step === 'email' ? i18n.t('auth_email') : i18n.t('auth_otp')}
                </Text>
                <Text style={styles.subtitle}>
                  {step === 'providers'
                    ? i18n.t('auth_subtitle')
                    : step === 'email'
                      ? i18n.t('auth_email_subtitle')
                      : i18n.t('auth_otp_subtitle')}
                </Text>
              </View>
              <Badge label={step === 'otp' ? 'STEP 3' : 'NEW'} variant="secondary" />
            </Animated.View>

            <Animated.View entering={FadeIn.duration(500).delay(350)}>
              <AnimatedDots totalSteps={3} />
            </Animated.View>

            {step === 'providers' ? (
              <Animated.View
                entering={FadeInDown.springify().damping(16).delay(400)}
                layout={Layout.springify().damping(16)}
                style={styles.choices}>
                <SocialAuthButton
                  provider="google"
                  label="Continue with Google"
                  onPress={() => router.replace('/questionnaire' as never)}
                />
                {Platform.OS === 'ios' ? (
                  <SocialAuthButton
                    provider="apple"
                    label="Continue with Apple"
                    onPress={() => router.replace('/questionnaire' as never)}
                  />
                ) : null}
                <SocialAuthButton provider="email" label="Continue with Email" onPress={() => setStep('email')} />
              </Animated.View>
            ) : null}

            {step === 'email' ? (
              <Animated.View
                entering={FadeInDown.springify().damping(16)}
                layout={Layout.springify().damping(16)}
                style={styles.focusForm}>
                <Input
                  label="Email"
                  labelStyle={{ color: '#FFF' }}
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChangeText={setEmail}
                  clearable
                />
                <Input
                  label="Password"
                  labelStyle={{ color: '#FFF' }}
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChangeText={setPassword}
                />

                <Pressable style={styles.primaryAction} onPress={() => setStep('otp')}>
                  <Text style={styles.primaryActionText}>Send Verification Code</Text>
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
                  <Text style={styles.primaryActionText}>Verify & Continue</Text>
                </Pressable>
                <Pressable onPress={() => setOtpCode('')} style={styles.inlineActionWrap}>
                  <Text style={styles.inlineAction}>Resend code</Text>
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
  focusForm: {
    marginTop: 20,
    gap: 12,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 360,
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
