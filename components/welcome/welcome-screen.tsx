import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

import i18n from '@/lib/i18n';

import { PrimaryButton } from '@/components/common/primary-button';
import { TextButton } from '@/components/common/text-button';
import { AppColors, AppTypography, WelcomeAssets } from '@/constants/design';

export function WelcomeScreen() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, [opacity, translateY]);

  const goToHome = () => router.push('/auth-modal' as never);

  return (
    <View className="flex-1" style={styles.safeArea}>
      <Image source={WelcomeAssets.heroImage} contentFit="cover" transition={200} style={styles.fullscreenImage} />
      <View style={styles.imageTint} />

      <Animated.View
        style={[
          styles.bottomSheetWrap,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}>
        <BlurView intensity={60} tint="dark" style={styles.bottomSheet}>
          <View style={styles.decorativeCircle} />

          <View style={styles.textSection}>
            <Text style={styles.title}>{i18n.t('welcome_title')}</Text>
            <Text style={styles.subtitle}>
              {i18n.t('welcome_subtitle')}
            </Text>
          </View>

          <View style={styles.actions}>
            <PrimaryButton label={i18n.t('get_started')} onPress={goToHome} />
            <TextButton label={i18n.t('already_have_account')} onPress={goToHome} />
          </View>
        </BlurView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
  bottomSheetWrap: {
    marginTop: 'auto',
    paddingHorizontal: 16,
    paddingBottom: 18,
  },
  bottomSheet: {
    borderRadius: 32,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: 'rgba(6, 78, 59, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  textSection: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  title: {
    color: AppColors.white,
    textAlign: 'center',
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: 0.2,
    fontFamily: AppTypography.bold,
  },
  subtitle: {
    marginTop: 10,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 320,
    fontFamily: AppTypography.regular,
  },
  actions: {
    marginTop: 22,
    gap: 14,
  },
  decorativeCircle: {
    position: 'absolute',
    right: -34,
    top: -34,
    width: 150,
    height: 150,
    borderRadius: 80,
    backgroundColor: AppColors.secondary,
    opacity: 0.02,
  },
});













// import { useEffect, useRef } from 'react';
// import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
// import { Image } from 'expo-image';
// import { BlurView } from 'expo-blur';
// import { useRouter } from 'expo-router';

// import i18n from '@/lib/i18n';

// import { PrimaryButton } from '@/components/common/primary-button';
// import { TextButton } from '@/components/common/text-button';
// import { AppColors, AppTypography, WelcomeAssets } from '@/constants/design';

// export function WelcomeScreen() {
//   const router = useRouter();
//   const opacity = useRef(new Animated.Value(0)).current;
//   const translateY = useRef(new Animated.Value(18)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(opacity, {
//         toValue: 1,
//         duration: 650,
//         useNativeDriver: true,
//         easing: Easing.out(Easing.cubic),
//       }),
//       Animated.timing(translateY, {
//         toValue: 0,
//         duration: 650,
//         useNativeDriver: true,
//         easing: Easing.out(Easing.cubic),
//       }),
//     ]).start();
//   }, [opacity, translateY]);

//   const goToHome = () => router.push('/auth-modal' as never);

//   return (
//     <View className="flex-1" style={styles.safeArea}>
//       <Image source={WelcomeAssets.heroImage} contentFit="cover" transition={200} style={styles.fullscreenImage} />
//       <View style={styles.imageTint} />

//       <Animated.View
//         style={[
//           styles.bottomSheetWrap,
//           {
//             opacity,
//             transform: [{ translateY }],
//           },
//         ]}>
//         <BlurView intensity={36} tint="light" style={styles.bottomSheet}>
//           <View style={styles.decorativeCircle} />

//           <View style={styles.textSection}>
//             <Text style={styles.title}>{i18n.t('welcome_title')}</Text>
//             <Text style={styles.subtitle}>
//               {i18n.t('welcome_subtitle')}
//             </Text>
//           </View>

//           <View style={styles.actions}>
//             <PrimaryButton label={i18n.t('get_started')} onPress={goToHome} />
//             <TextButton label={i18n.t('already_have_account')} onPress={goToHome} />
//           </View>
//         </BlurView>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     backgroundColor: AppColors.background,
//   },
//   fullscreenImage: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   imageTint: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: AppColors.background,
//     opacity: 0.2,
//   },
//   bottomSheetWrap: {
//     marginTop: 'auto',
//     paddingHorizontal: 16,
//     paddingBottom: 18,
//   },
//   bottomSheet: {
//     borderRadius: 30,
//     overflow: 'hidden',
//     paddingHorizontal: 20,
//     paddingTop: 24,
//     paddingBottom: 18,
//     backgroundColor: AppColors.background,
//     shadowColor: AppColors.textPrimary,
//     shadowOpacity: 0.18,
//     shadowRadius: 16,
//     shadowOffset: { width: 0, height: 8 },
//     elevation: 7,
//   },
//   textSection: {
//     alignItems: 'center',
//     paddingHorizontal: 8,
//   },
//   title: {
//     color: AppColors.textPrimary,
//     textAlign: 'center',
//     fontSize: 34,
//     lineHeight: 41,
//     letterSpacing: 0.2,
//     fontFamily: AppTypography.bold,
//   },
//   subtitle: {
//     marginTop: 10,
//     color: AppColors.textSecondary,
//     textAlign: 'center',
//     fontSize: 15,
//     lineHeight: 22,
//     maxWidth: 320,
//     fontFamily: AppTypography.regular,
//   },
//   actions: {
//     marginTop: 22,
//     gap: 14,
//   },
//   decorativeCircle: {
//     position: 'absolute',
//     right: -34,
//     top: -34,
//     width: 150,
//     height: 150,
//     borderRadius: 80,
//     backgroundColor: AppColors.secondary,
//     opacity: 0.3,
//   },
// });
