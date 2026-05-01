import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from 'lottie-react-native';
import { ArrowLeft, Send, Star } from 'lucide-react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const FEELINGS = [
  {
    id: 'love',
    label: 'Loved It',
    subtitle: 'Amazing experience',
    animation: require('../assets/lottie/heartEyes.json'),
    accent: '#EF4444',
    soft: '#FEF2F2',
    button: '#DC2626',
    border: 'rgba(239,68,68,0.2)',
  },
  {
    id: 'good',
    label: 'Good',
    subtitle: 'Works well for me',
    animation: require('../assets/lottie/smile.json'),
    accent: '#10B981',
    soft: '#EAFBF3',
    button: '#10B981',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    id: 'bad',
    label: 'Needs Work',
    subtitle: 'Could be better',
    animation: require('../assets/lottie/bigFrown.json'),
    accent: '#F59E0B',
    soft: '#FFF6E8',
    button: '#F59E0B',
    border: 'rgba(245,158,11,0.2)',
  },
] as const;

export default function FeedbackScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedFeeling, setSelectedFeeling] = useState<(typeof FEELINGS)[number]['id']>('good');
  const [rating, setRating] = useState(4);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReceiptToast, setShowReceiptToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const scales = useRef(FEELINGS.map(() => new Animated.Value(1))).current;
  const glows = useRef(FEELINGS.map(() => new Animated.Value(0))).current;
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTranslateY = useRef(new Animated.Value(28)).current;
  const scrollRef = useRef<ScrollView>(null);

  const selectedIndex = useMemo(
    () => FEELINGS.findIndex((mood) => mood.id === selectedFeeling),
    [selectedFeeling]
  );

  useEffect(() => {
    FEELINGS.forEach((_, index) => {
      const isSelected = index === selectedIndex;
      Animated.parallel([
        Animated.spring(scales[index], {
          toValue: isSelected ? 1.14 : 1,
          speed: 16,
          bounciness: 10,
          useNativeDriver: true,
        }),
        Animated.timing(glows[index], {
          toValue: isSelected ? 1 : 0,
          duration: 220,
          useNativeDriver: false,
        }),
      ]).start();
    });
  }, [glows, scales, selectedIndex]);

  const submitFeedback = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const isPositiveFeedback = selectedFeeling === 'love' || selectedFeeling === 'good';

    if (isPositiveFeedback) {
      setShowConfetti(true);
    }

    setShowReceiptToast(true);
    Animated.parallel([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.timing(toastTranslateY, {
        toValue: 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(toastTranslateY, {
          toValue: 22,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start(() => setShowReceiptToast(false));
    }, 1600);

    setTimeout(() => {
      router.back();
    }, 2300);
  };
  const currentFeeling = FEELINGS.find((item) => item.id === selectedFeeling) ?? FEELINGS[1];

  const handleInputFocus = () => {
    // Let keyboard opening start first, then smoothly bring input/button into view.
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: Math.max(lastScrollY + 220, 280),
        animated: true,
      });
    }, 180);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setLastScrollY(event.nativeEvent.contentOffset.y);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LinearGradient
        colors={['#D7F8E8', '#ECFCF4', '#F6FFF9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.85}>
          <ArrowLeft size={20} color="#0D6B4A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback</Text>
        <View style={{ width: 42 }} />
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: insets.bottom + 22 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>How was your app experience today?</Text>
          <Text style={styles.heroSubtitle}>Pick a mood, tap your rating, and tell us what you think.</Text>
        </View>

        <View style={styles.emojiRow}>
          {FEELINGS.map((item, index) => {
            const borderColor = glows[index].interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(16,185,129,0.14)', '#10B981'],
            });
            const cardShadowOpacity = glows[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0.08, 0.16],
            });

            return (
              <Pressable
                key={item.id}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSelectedFeeling(item.id);
                }}
                style={{ flex: 1 }}
              >
                <Animated.View style={[styles.moodCard, { borderColor, shadowOpacity: cardShadowOpacity }]}>
                  <Animated.View style={[styles.emojiWrap, { transform: [{ scale: scales[index] }] }]}>
                    <LottieView
                      source={item.animation}
                      autoPlay
                      loop
                      style={styles.emojiLottie}
                    />
                  </Animated.View>
                  <Text style={styles.moodTitle}>{item.label}</Text>
                  <View style={styles.moodSubtitleWrap}>
                    <Text style={styles.moodSubtitle}>{item.subtitle}</Text>
                  </View>
                </Animated.View>
              </Pressable>
            );
          })}
        </View>

        <View
          style={[
            styles.ratingShell,
            {
              backgroundColor: currentFeeling.soft,
              borderColor: currentFeeling.border,
            },
          ]}
        >
          <Text style={styles.ratingTitle}>Rate your session</Text>
          <View style={styles.starsRow}>
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;
              const active = value <= rating;
              return (
                <Pressable
                  key={value}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setRating(value);
                  }}
                  style={styles.starPress}
                >
                  <Star
                    size={28}
                    color={active ? currentFeeling.accent : '#B5D9C9'}
                    fill={active ? currentFeeling.accent : 'transparent'}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.inputShell}>
          <Text style={styles.inputLabel}>Any comments?</Text>
          <TextInput
            value={feedbackText}
            onChangeText={setFeedbackText}
            multiline
            onFocus={handleInputFocus}
            placeholder="Tell us what you liked or what should improve..."
            placeholderTextColor="#79A695"
            style={styles.input}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            {
              backgroundColor: currentFeeling.button,
              shadowColor: currentFeeling.button,
            },
          ]}
          onPress={submitFeedback}
          activeOpacity={0.9}
          disabled={isSubmitting}
        >
          <Send size={16} color="#FFFFFF" />
          <Text style={styles.submitText}>{isSubmitting ? 'Sending...' : 'Send Feedback'}</Text>
        </TouchableOpacity>
      </ScrollView>

      {showConfetti && (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <ConfettiCannon
            count={selectedFeeling === 'love' ? 110 : 70}
            origin={{ x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT - 140 }}
            fadeOut
            fallSpeed={2600}
            explosionSpeed={420}
            onAnimationEnd={() => setShowConfetti(false)}
          />
        </View>
      )}

      {showReceiptToast && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.receiptToast,
            {
              bottom: insets.bottom + 24,
              opacity: toastOpacity,
              transform: [{ translateY: toastTranslateY }],
            },
          ]}
        >
          <Text style={styles.receiptToastText}>Feedback received</Text>
        </Animated.View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ECFCF4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8FAF1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: -3, height: -3 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 2,
  },
  headerTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 20,
    color: '#0F4D37',
  },
  hero: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 28,
    color: '#0D3F2D',
    marginBottom: 8,
    lineHeight: 35,
  },
  heroSubtitle: {
    fontFamily: AppTypography.medium,
    fontSize: 14,
    color: '#4D7D6B',
    lineHeight: 20,
  },
  emojiRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 6,
  },
  moodCard: {
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    minHeight: 182,
    shadowColor: '#0F4D37',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 4,
  },
  emojiWrap: {
    width: 76,
    height: 76,
    marginBottom: 6,
  },
  emojiLottie: {
    width: '100%',
    height: '100%',
  },
  moodTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 13,
    color: '#0F5B40',
    marginBottom: 3,
    textAlign: 'center',
  },
  moodSubtitle: {
    fontFamily: AppTypography.medium,
    fontSize: 11,
    color: '#61917E',
    textAlign: 'center',
    lineHeight: 15,
  },
  moodSubtitleWrap: {
    minHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingShell: {
    marginHorizontal: 20,
    marginTop: 22,
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
    shadowColor: '#B5EBCF',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 2,
  },
  ratingTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 17,
    color: '#0E5038',
    marginBottom: 12,
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  starPress: {
    padding: 2,
  },
  inputShell: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 26,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.16)',
    backgroundColor: '#EAFBF3',
    shadowColor: '#B5EBCF',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 2,
  },
  inputLabel: {
    fontFamily: AppTypography.bold,
    fontSize: 16,
    color: '#0E5038',
    marginBottom: 10,
  },
  input: {
    minHeight: 126,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.18)',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: AppTypography.medium,
    fontSize: 14,
    color: '#0A3D2B',
    lineHeight: 20,
  },
  submitButton: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 18,
    height: 56,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 5,
  },
  submitText: {
    fontFamily: AppTypography.bold,
    fontSize: 15,
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  receiptToast: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 999,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 6,
  },
  receiptToastText: {
    fontFamily: AppTypography.semibold,
    fontSize: 13.5,
    color: '#FFFFFF',
    letterSpacing: 0.1,
  },
});





// import { LinearGradient } from 'expo-linear-gradient';
// import * as Haptics from 'expo-haptics';
// import { useRouter } from 'expo-router';
// import { ArrowLeft, Send, Star } from 'lucide-react-native';
// import { useEffect, useMemo, useRef, useState } from 'react';
// import {
//   Animated,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { AppTypography } from '@/constants/design';

// const FEELINGS = [
//   { id: 'love', emoji: '😍', label: 'Loved It', subtitle: 'Amazing experience' },
//   { id: 'good', emoji: '🙂', label: 'Good', subtitle: 'Works well for me' },
//   { id: 'bad', emoji: '😕', label: 'Needs Work', subtitle: 'Could be better' },
// ] as const;

// export default function FeedbackScreen() {
//   const insets = useSafeAreaInsets();
//   const router = useRouter();
//   const [selectedFeeling, setSelectedFeeling] = useState<(typeof FEELINGS)[number]['id']>('good');
//   const [rating, setRating] = useState(4);
//   const [feedbackText, setFeedbackText] = useState('');

//   const scales = useRef(FEELINGS.map(() => new Animated.Value(1))).current;
//   const glows = useRef(FEELINGS.map(() => new Animated.Value(0))).current;

//   const selectedIndex = useMemo(
//     () => FEELINGS.findIndex((mood) => mood.id === selectedFeeling),
//     [selectedFeeling]
//   );

//   useEffect(() => {
//     FEELINGS.forEach((_, index) => {
//       const isSelected = index === selectedIndex;
//       Animated.parallel([
//         Animated.spring(scales[index], {
//           toValue: isSelected ? 1.14 : 1,
//           speed: 16,
//           bounciness: 10,
//           useNativeDriver: true,
//         }),
//         Animated.timing(glows[index], {
//           toValue: isSelected ? 1 : 0,
//           duration: 220,
//           useNativeDriver: false,
//         }),
//       ]).start();
//     });
//   }, [glows, scales, selectedIndex]);

//   const submitFeedback = () => {
//     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//     router.back();
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.screen}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <LinearGradient
//         colors={['#D7F8E8', '#ECFCF4', '#F6FFF9']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={StyleSheet.absoluteFillObject}
//       />

//       <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
//         <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.85}>
//           <ArrowLeft size={20} color="#0D6B4A" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Feedback</Text>
//         <View style={{ width: 42 }} />
//       </View>

//       <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 22 }} showsVerticalScrollIndicator={false}>
//         <View style={styles.hero}>
//           <Text style={styles.heroTitle}>How was your app experience today?</Text>
//           <Text style={styles.heroSubtitle}>Pick a mood, tap your rating, and tell us what you think.</Text>
//         </View>

//         <View style={styles.emojiRow}>
//           {FEELINGS.map((item, index) => {
//             const borderColor = glows[index].interpolate({
//               inputRange: [0, 1],
//               outputRange: ['rgba(16,185,129,0.14)', '#10B981'],
//             });
//             const bgColor = glows[index].interpolate({
//               inputRange: [0, 1],
//               outputRange: ['#EEFAF4', '#DDF8EA'],
//             });

//             return (
//               <Pressable
//                 key={item.id}
//                 onPress={() => {
//                   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//                   setSelectedFeeling(item.id);
//                 }}
//                 style={{ flex: 1 }}
//               >
//                 <Animated.View style={[styles.moodCard, { borderColor, backgroundColor: bgColor }]}>
//                   <Animated.Text style={[styles.emoji, { transform: [{ scale: scales[index] }] }]}>
//                     {item.emoji}
//                   </Animated.Text>
//                   <Text style={styles.moodTitle}>{item.label}</Text>
//                   <Text style={styles.moodSubtitle}>{item.subtitle}</Text>
//                 </Animated.View>
//               </Pressable>
//             );
//           })}
//         </View>

//         <View style={styles.ratingShell}>
//           <Text style={styles.ratingTitle}>Rate your session</Text>
//           <View style={styles.starsRow}>
//             {Array.from({ length: 5 }).map((_, index) => {
//               const value = index + 1;
//               const active = value <= rating;
//               return (
//                 <Pressable
//                   key={value}
//                   onPress={() => {
//                     Haptics.selectionAsync();
//                     setRating(value);
//                   }}
//                   style={styles.starPress}
//                 >
//                   <Star size={28} color={active ? '#10B981' : '#B5D9C9'} fill={active ? '#10B981' : 'transparent'} />
//                 </Pressable>
//               );
//             })}
//           </View>
//         </View>

//         <View style={styles.inputShell}>
//           <Text style={styles.inputLabel}>Any comments?</Text>
//           <TextInput
//             value={feedbackText}
//             onChangeText={setFeedbackText}
//             multiline
//             placeholder="Tell us what you liked or what should improve..."
//             placeholderTextColor="#79A695"
//             style={styles.input}
//             textAlignVertical="top"
//           />
//         </View>

//         <TouchableOpacity style={styles.submitButton} onPress={submitFeedback} activeOpacity={0.9}>
//           <Send size={16} color="#FFFFFF" />
//           <Text style={styles.submitText}>Send Feedback</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: '#ECFCF4',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//   },
//   backButton: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: '#E8FAF1',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#FFFFFF',
//     shadowOffset: { width: -3, height: -3 },
//     shadowOpacity: 0.9,
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   headerTitle: {
//     fontFamily: AppTypography.bold,
//     fontSize: 20,
//     color: '#0F4D37',
//   },
//   hero: {
//     marginHorizontal: 20,
//     marginTop: 8,
//     marginBottom: 16,
//   },
//   heroTitle: {
//     fontFamily: AppTypography.bold,
//     fontSize: 28,
//     color: '#0D3F2D',
//     marginBottom: 8,
//     lineHeight: 35,
//   },
//   heroSubtitle: {
//     fontFamily: AppTypography.medium,
//     fontSize: 14,
//     color: '#4D7D6B',
//     lineHeight: 20,
//   },
//   emojiRow: {
//     flexDirection: 'row',
//     gap: 10,
//     paddingHorizontal: 16,
//   },
//   moodCard: {
//     borderRadius: 24,
//     paddingVertical: 16,
//     paddingHorizontal: 10,
//     borderWidth: 1.5,
//     alignItems: 'center',
//     shadowColor: '#FFFFFF',
//     shadowOffset: { width: -6, height: -6 },
//     shadowOpacity: 1,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   emoji: {
//     fontSize: 40,
//     marginBottom: 8,
//   },
//   moodTitle: {
//     fontFamily: AppTypography.bold,
//     fontSize: 13,
//     color: '#0F5B40',
//     marginBottom: 3,
//     textAlign: 'center',
//   },
//   moodSubtitle: {
//     fontFamily: AppTypography.medium,
//     fontSize: 11,
//     color: '#61917E',
//     textAlign: 'center',
//   },
//   ratingShell: {
//     marginHorizontal: 20,
//     marginTop: 22,
//     borderRadius: 26,
//     padding: 18,
//     backgroundColor: '#EAFBF3',
//     shadowColor: '#B5EBCF',
//     shadowOffset: { width: 6, height: 6 },
//     shadowOpacity: 0.6,
//     shadowRadius: 10,
//     elevation: 2,
//   },
//   ratingTitle: {
//     fontFamily: AppTypography.bold,
//     fontSize: 17,
//     color: '#0E5038',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   starsRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 10,
//   },
//   starPress: {
//     padding: 2,
//   },
//   inputShell: {
//     marginHorizontal: 20,
//     marginTop: 20,
//   },
//   inputLabel: {
//     fontFamily: AppTypography.bold,
//     fontSize: 16,
//     color: '#0E5038',
//     marginBottom: 10,
//   },
//   input: {
//     minHeight: 126,
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(16,185,129,0.18)',
//     backgroundColor: '#F3FEF8',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     fontFamily: AppTypography.medium,
//     fontSize: 14,
//     color: '#0A3D2B',
//     lineHeight: 20,
//     shadowColor: '#FFFFFF',
//     shadowOffset: { width: -4, height: -4 },
//     shadowOpacity: 1,
//     shadowRadius: 7,
//     elevation: 2,
//   },
//   submitButton: {
//     marginHorizontal: 20,
//     marginTop: 24,
//     borderRadius: 18,
//     height: 56,
//     backgroundColor: '#10B981',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     gap: 8,
//     shadowColor: '#059669',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 14,
//     elevation: 5,
//   },
//   submitText: {
//     fontFamily: AppTypography.bold,
//     fontSize: 15,
//     color: '#FFFFFF',
//     letterSpacing: 0.2,
//   },
// });
