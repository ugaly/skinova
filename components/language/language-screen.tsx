import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Globe, CheckCircle2 } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Platform, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

import { PrimaryButton } from '@/components/common/primary-button';
import { AppColors, AppTypography, WelcomeAssets } from '@/constants/design';
import i18n from '@/lib/i18n';

const { width } = Dimensions.get('window');

type NavLanguage = 'en' | 'sw';

export function LanguageScreen() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<NavLanguage>((i18n.locale as NavLanguage) || 'en');

  const onContinue = () => {
    i18n.locale = selectedLang;
    router.replace('/welcome');
  };

  const handleSelect = (lang: NavLanguage) => {
    setSelectedLang(lang);
    i18n.locale = lang; 
    // Small delay to allow the active state animation to complete before navigating
    setTimeout(() => {
      router.replace('/welcome');
    }, 250);
  };

  return (
    <View style={styles.safeArea}>
      <Image source={WelcomeAssets.heroImage} contentFit="cover" style={styles.fullscreenImage} />
      <View style={styles.imageTint} />
      
      <Animated.View entering={FadeInDown.duration(600).delay(100)} style={styles.overlayWrap}>
        <BlurView intensity={60} tint="dark" style={styles.glassCard}>
          <Animated.View entering={FadeInDown.springify().damping(14).delay(150)} style={styles.iconWrap}>
            <Globe size={32} color={AppColors.primary} />
          </Animated.View>
          
          <Animated.Text entering={FadeInDown.springify().damping(14).delay(200)} style={styles.title}>
            {i18n.t('lang_title')}
          </Animated.Text>

          <View style={styles.cardsRow}>
            <Animated.View entering={FadeInDown.springify().damping(14).delay(300)}>
              <Pressable 
                style={[styles.langCard, selectedLang === 'en' && styles.langCardActive]} 
                onPress={() => handleSelect('en')}>
                <View style={styles.langNameRow}>
                  <Text style={styles.flagIcon}>🇬🇧</Text>
                  <Text style={[styles.langText, selectedLang === 'en' && styles.langTextActive]}>{i18n.t('lang_en')}</Text>
                </View>
                {selectedLang === 'en' && <Animated.View entering={FadeIn}><CheckCircle2 size={20} color={AppColors.white} /></Animated.View>}
              </Pressable>
            </Animated.View>

            <Animated.View entering={FadeInDown.springify().damping(14).delay(400)}>
              <Pressable 
                style={[styles.langCard, selectedLang === 'sw' && styles.langCardActive]} 
                onPress={() => handleSelect('sw')}>
                <View style={styles.langNameRow}>
                  <Text style={styles.flagIcon}>🇹🇿</Text>
                  <Text style={[styles.langText, selectedLang === 'sw' && styles.langTextActive]}>{i18n.t('lang_sw')}</Text>
                </View>
                {selectedLang === 'sw' && <Animated.View entering={FadeIn}><CheckCircle2 size={20} color={AppColors.white} /></Animated.View>}
              </Pressable>
            </Animated.View>
          </View>

          {/* <Animated.View entering={FadeInUp.springify().damping(14).delay(500)} style={styles.btnWrap}>
            <PrimaryButton label={i18n.t('continue')} onPress={onContinue} />
          </Animated.View> */}
        </BlurView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  fullscreenImage: {
    ...StyleSheet.absoluteFillObject,
  },
  imageTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    opacity: 0.25,
  },
  overlayWrap: {
    position: 'absolute',
    bottom: 0,
    width,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 44 : 24,
  },
  glassCard: {
    overflow: 'hidden',
    borderRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: 'rgba(6, 78, 59, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  iconWrap: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: AppColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: AppColors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  title: {
    fontFamily: AppTypography.bold,
    fontSize: 26,
    color: AppColors.white,
    textAlign: 'center',
    marginBottom: 26,
  },
  cardsRow: {
    gap: 14,
    marginBottom: 0,
  },
  langCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  langNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flagIcon: {
    fontSize: 22,
  },
  langCardActive: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
    shadowColor: AppColors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  langText: {
    fontFamily: AppTypography.medium,
    fontSize: 17,
    color: 'rgba(255,255,255,0.8)',
  },
  langTextActive: {
    color: AppColors.white,
    fontFamily: AppTypography.bold,
  },
  btnWrap: {
    marginTop: 8,
  }
});
