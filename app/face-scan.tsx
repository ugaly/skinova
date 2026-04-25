
import { BlurView } from 'expo-blur';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Droplets, Leaf, Moon, Sparkles, SwitchCamera } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View, Modal } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Line, Path } from 'react-native-svg';

import { AppColors, AppTypography } from '@/constants/design';

const { width, height } = Dimensions.get('window');

const productRecommendations = [
  {
    id: 'p1',
    name: 'Cica Barrier Serum',
    focus: 'Hydration + redness',
    image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919',
  },
  {
    id: 'p2',
    name: 'Rich Rose Cream',
    focus: 'Firming & repair',
    image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819',
  },
  {
    id: 'p3',
    name: 'Pure4 Serum',
    focus: 'Skin renewal',
    image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331',
  },
  {
    id: 'p4',
    name: 'Daily Mineral SPF',
    focus: 'UV Protection',
    image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142',
  },
];

export default function FaceScanScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('front');

  const [phase, setPhase] = useState<'intro' | 'scan' | 'processing' | 'detected' | 'result'>('intro');
  const [typingText, setTypingText] = useState('Position your face in the oval');
  const [processingText, setProcessingText] = useState('Analyzing your skin structure...');
  const [processingDone, setProcessingDone] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const scanLineProgress = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    scanLineProgress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
    pulse.value = withRepeat(
      withSequence(withTiming(1.05, { duration: 900 }), withTiming(1, { duration: 900 })),
      -1,
      false,
    );
  }, [pulse, scanLineProgress]);

  useEffect(() => {
    if (phase === 'intro') {
      setTypingText('Position your face in the oval');
      const introTimer = setTimeout(() => {
        setPhase('scan');
      }, 2000);
      return () => clearTimeout(introTimer);
    }

    if (phase === 'scan') {
      let progress = 0;
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const scanInterval = setInterval(() => {
        progress += 1;
        if (progress === 3) {
          setTypingText('Face detected. Locking...');
          void Haptics.selectionAsync();
        }
        if (progress === 8) {
          setTypingText('Analyzing facial structure...');
          void Haptics.selectionAsync();
        }
        if (progress === 12) {
          setTypingText('Generating mesh map...');
        }
      }, 300);

      const captureTimer = setTimeout(async () => {
        clearInterval(scanInterval);
        setTypingText('Capture successful!');
        if (cameraRef.current) {
          try {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            const photo = await cameraRef.current.takePictureAsync({
              quality: 0.7,
              skipProcessing: true,
            });
            if (photo?.uri) {
              setCapturedImage(photo.uri);
              setPhase('processing');
              setProcessingText('Analyzing your skin structure...');
              setProcessingDone(false);
              setProcessingProgress(0);
              await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
          } catch (e) {
            console.error('Failed to capture', e);
          }
        }
      }, 4500);

      return () => {
        clearInterval(scanInterval);
        clearTimeout(captureTimer);
      };
    }
  }, [phase]);

  // Processing phase — cycle AI messages then show detected
  useEffect(() => {
    if (phase !== 'processing') return;
    const messages = [
      'Analyzing your skin structure...',
      'Mapping 120+ facial data points...',
      'Running AI skin model...',
      'Detecting hydration levels...',
      'Calculating skin score...',
      'Results processed ✓',
    ];
    let idx = 0;
    setProcessingText(messages[0]);
    setProcessingDone(false);
    setProcessingProgress(8);
    const interval = setInterval(() => {
      idx += 1;
      if (idx < messages.length) {
        setProcessingText(messages[idx]);
        const pct = Math.round((idx / (messages.length - 1)) * 100);
        setProcessingProgress(pct);
        void Haptics.selectionAsync();
        if (idx === messages.length - 1) {
          setProcessingDone(true);
          setProcessingProgress(100);
        }
      }
    }, 1400);
    const done = setTimeout(() => {
      clearInterval(interval);
      setPhase('detected');
    }, messages.length * 1400 + 600);
    return () => { clearInterval(interval); clearTimeout(done); };
  }, [phase]);

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineProgress.value * 350 }],
    opacity: 0.85,
  }));

  const ovalPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  if (!permission) {
    return <View style={styles.screen} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionWrap}>
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionText}>Enable camera to perform skincare face analysis.</Text>
        <Pressable style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Allow Camera</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {(phase === 'intro' || phase === 'scan') && (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing} animateShutter={false} />
      )}
      {(phase === 'detected' || phase === 'result' || phase === 'processing') && capturedImage && (
        <Image source={{ uri: capturedImage }} contentFit="cover" style={styles.camera} />
      )}

      {(phase === 'detected' || phase === 'result') && <View style={styles.resultScrim} />}

      <View style={styles.overlayTop}>
        <Pressable
          style={styles.iconButton}
          onPress={() => {
            if (phase === 'detected' || phase === 'result') {
              setPhase('intro');
              setCapturedImage(null);
            } else {
              router.back();
            }
          }}>
          <ChevronLeft size={24} color={AppColors.textPrimary} />
        </Pressable>
        <View style={{ flex: 1 }} />
        {(phase === 'intro' || phase === 'scan') && (
          <Pressable style={styles.iconButton} onPress={() => setFacing((f) => (f === 'front' ? 'back' : 'front'))}>
            <SwitchCamera size={20} color={AppColors.textPrimary} />
          </Pressable>
        )}
      </View>

      {(phase === 'intro' || phase === 'scan') && (
        <>
          <View style={styles.scanInstructionWrap}>
            <BlurView intensity={40} tint="light" style={styles.instructionCard}>
              <Text style={styles.instructionText}>{typingText}</Text>
            </BlurView>
          </View>

          <View style={styles.centerWrap}>
            <Animated.View style={[styles.scanOval, ovalPulseStyle]}>
              <Animated.View style={[styles.scanLine, scanLineStyle]} />
            </Animated.View>
          </View>
        </>
      )}

      {/* ── AI Processing Screen ── */}
      {phase === 'processing' && (
        <Animated.View entering={FadeIn.duration(400)} style={styles.processingOverlay}>
          <View style={styles.processingScrim} />

          <BlurView intensity={48} tint="dark" style={styles.processingCard}>
            <View style={styles.loaderLottieWrap}>
              <LottieView
                source={require('@/assets/bot.json')}
                autoPlay
                loop
                style={styles.processingLottie}
              />
            </View>

            <Animated.View entering={FadeIn.duration(220)} style={styles.processingTextBox}>
              <Text style={[styles.processingMsg, processingDone && styles.processingMsgDone]}>{processingText}</Text>
            </Animated.View>

            <View style={styles.processingProgressRow}>
              <Text style={styles.processingProgressLabel}>AI Progress</Text>
              <Text style={styles.processingProgressValue}>{processingProgress}%</Text>
            </View>
            <View style={styles.processingProgressTrack}>
              <View style={[styles.processingProgressFill, { width: `${processingProgress}%` }]} />
            </View>
          </BlurView>
        </Animated.View>
      )}

      {phase === 'detected' && (
        <View style={styles.detectedContainer}>
          <View style={StyleSheet.absoluteFill}>
            <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
              <Path
                d={`M${width * 0.25} ${height * 0.25} C ${width * 0.15} ${height * 0.4}, ${width * 0.25} ${height * 0.65}, ${width * 0.5} ${height * 0.7} C ${width * 0.75} ${height * 0.65}, ${width * 0.85} ${height * 0.4}, ${width * 0.75} ${height * 0.25} C ${width * 0.7} ${height * 0.1}, ${width * 0.3} ${height * 0.1}, ${width * 0.25} ${height * 0.25}`}
                stroke="rgba(166, 255, 221, 0.8)"
                fill="none"
                strokeWidth="1"
              />
              <Line
                x1={20 + 130}
                y1={height * 0.3 + 30}
                x2={width * 0.35}
                y2={height * 0.3 + 30}
                stroke="#D1FAE5"
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />
              <Circle cx={width * 0.35} cy={height * 0.3 + 30} r="7" stroke="#D1FAE5" strokeWidth="1" fill="none" />
              <Circle cx={width * 0.35} cy={height * 0.3 + 30} r="2.2" fill="#34D399" />
            </Svg>
          </View>

          <Modal visible={true} transparent={true} animationType="slide" onRequestClose={() => setPhase('intro')}>
            <View style={styles.detectedBottomCard}>
              <View style={styles.detectedBottomInner}>
                <Text style={styles.detectedTag}>Scan Locked</Text>
              <Text style={styles.detectedTitle}>Your face map is ready</Text>
              <Text style={styles.detectedSubTitle}>
                We captured 120+ points. Continue to see full skin score, concerns, product recommendations, and daily
                habits.
              </Text>

              <View style={styles.quickStatRow}>
                <View style={styles.quickStatChip}>
                  <Text style={styles.quickStatValue}>78%</Text>
                  <Text style={styles.quickStatLabel}>Skin Health</Text>
                </View>
                <View style={styles.quickStatChip}>
                  <Text style={styles.quickStatValue}>31</Text>
                  <Text style={styles.quickStatLabel}>Skin Age</Text>
                </View>
                <View style={styles.quickStatChip}>
                  <Text style={styles.quickStatValue}>3</Text>
                  <Text style={styles.quickStatLabel}>Key Focus</Text>
                </View>
              </View>

              <Pressable
                style={styles.proceedButton}
                onPress={async () => {
                  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setPhase('result');
                }}>
                <Sparkles size={17} color={AppColors.white} />
                <Text style={styles.proceedButtonText}>Proceed to Results</Text>
              </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}

      {phase === 'result' && (
        <View style={styles.resultContainer}>
          <ScrollView contentContainerStyle={styles.resultScrollContent} showsVerticalScrollIndicator={false} bounces={false}>
            <Animated.View entering={FadeIn.duration(450)}>
              <BlurView intensity={60} tint="light" style={styles.glassHeroCard}>
                <Text style={styles.heroEyebrow}>AI Skin Result</Text>
                <Text style={styles.heroTitle}>Your skin routine plan is ready</Text>
                <Text style={styles.heroSubtitle}>
                  Strong barrier overall, mild dehydration around cheeks, and small texture buildup on T-zone.
                </Text>
                <View style={styles.concernRow}>
                  <View style={styles.concernChip}>
                    <Text style={styles.concernText}>Hydration</Text>
                  </View>
                  <View style={styles.concernChip}>
                    <Text style={styles.concernText}>Texture</Text>
                  </View>
                  <View style={styles.concernChip}>
                    <Text style={styles.concernText}>Pigment</Text>
                  </View>
                </View>

                <View style={styles.heroScoreRow}>
                  <View style={styles.heroMainScore}>
                    <Text style={styles.heroMainScoreValue}>78%</Text>
                    <Text style={styles.heroMainScoreLabel}>Overall Health</Text>
                  </View>
                  <View style={styles.heroScoreGrid}>
                    <View style={styles.heroMiniScore}>
                      <Text style={styles.heroMiniValue}>31</Text>
                      <Text style={styles.heroMiniLabel}>Skin Age</Text>
                    </View>
                    <View style={styles.heroMiniScore}>
                      <Text style={styles.heroMiniValue}>24%</Text>
                      <Text style={styles.heroMiniLabel}>Dryness</Text>
                    </View>
                    <View style={styles.heroMiniScore}>
                      <Text style={styles.heroMiniValue}>16%</Text>
                      <Text style={styles.heroMiniLabel}>Pigment</Text>
                    </View>
                    <View style={styles.heroMiniScore}>
                      <Text style={styles.heroMiniValue}>87%</Text>
                      <Text style={styles.heroMiniLabel}>Confidence</Text>
                    </View>
                  </View>
                </View>
              </BlurView>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(120).duration(450)} style={styles.sectionCard}>
              <BlurView intensity={50} tint="light" style={styles.sectionInner}>
                <Text style={styles.sectionTitle}>Recommended Products</Text>
                <Text style={styles.sectionSubtitle}>Personalized picks using your scan results</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productsRow}>
                  {productRecommendations.map((item) => (
                    <View key={item.id} style={styles.productCard}>
                      <View style={styles.productImageWrap}>
                        <Image source={{ uri: item.image }} contentFit="contain" style={styles.productImage} />
                      </View>
                      <Text style={styles.productName}>{item.name}</Text>
                      <Text style={styles.productFocus}>{item.focus}</Text>
                    </View>
                  ))}
                </ScrollView>
              </BlurView>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(180).duration(450)} style={styles.sectionCard}>
              <BlurView intensity={50} tint="light" style={styles.sectionInner}>
                <Text style={styles.sectionTitle}>Lifestyle & Habit Boost</Text>
                <Text style={styles.sectionSubtitle}>High-impact tips to improve your skin in 2-3 weeks</Text>

                <View style={styles.habitItem}>
                  <View style={styles.habitIcon}>
                    <Droplets size={16} color="#059669" />
                  </View>
                  <View style={styles.habitTextWrap}>
                    <Text style={styles.habitTitle}>Hydration target</Text>
                    <Text style={styles.habitDesc}>Drink 2.2L water daily to reduce dehydration lines and improve glow.</Text>
                  </View>
                </View>

                <View style={styles.habitItem}>
                  <View style={styles.habitIcon}>
                    <Leaf size={16} color="#059669" />
                  </View>
                  <View style={styles.habitTextWrap}>
                    <Text style={styles.habitTitle}>Reduce sugar load</Text>
                    <Text style={styles.habitDesc}>
                      Lower high-sugar snacks to prevent glycation and support collagen quality.
                    </Text>
                  </View>
                </View>

                <View style={styles.habitItem}>
                  <View style={styles.habitIcon}>
                    <Moon size={16} color="#059669" />
                  </View>
                  <View style={styles.habitTextWrap}>
                    <Text style={styles.habitTitle}>Sleep recovery</Text>
                    <Text style={styles.habitDesc}>
                      Aim for 7-8 hours. Night recovery is linked to calmer tone and less puffiness.
                    </Text>
                  </View>
                </View>
              </BlurView>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(260).duration(450)} style={styles.sectionCard}>
              <BlurView intensity={42} tint="light" style={styles.sectionInner}>
                <Text style={styles.sectionTitle}>Weekly Insight</Text>
                <Text style={styles.sectionSubtitle}>
                  If you follow the routine daily, your hydration score can improve by 8-12% in 14 days.
                </Text>
              </BlurView>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(300).duration(450)} style={styles.sectionCard}>
              <Pressable
                style={styles.startRoutineButton}
                onPress={async () => {
                  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  router.replace('/(tabs)' as any);
                }}>
                <Sparkles size={18} color="#022C22" />
                <Text style={styles.startRoutineText}>Start My Routine</Text>
              </Pressable>
            </Animated.View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  resultScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 17, 11, 0.44)',
  },
  overlayTop: {
    position: 'absolute',
    top: 56,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 20,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  scanInstructionWrap: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  instructionCard: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  instructionText: {
    fontFamily: AppTypography.semibold,
    fontSize: 15,
    color: AppColors.textPrimary,
  },
  centerWrap: {
    position: 'absolute',
    top: '22%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanOval: {
    width: 250,
    height: 350,
    borderRadius: 180,
    borderWidth: 1.5,
    borderColor: 'rgba(45, 212, 191, 0.4)',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#2DD4BF',
    shadowColor: '#2DD4BF',
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  permissionWrap: {
    flex: 1,
    backgroundColor: AppColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  permissionTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 24,
    color: AppColors.textPrimary,
  },
  permissionText: {
    marginTop: 8,
    textAlign: 'center',
    color: AppColors.textSecondary,
    fontFamily: AppTypography.regular,
    fontSize: 14,
  },
  permissionButton: {
    marginTop: 18,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  permissionButtonText: {
    color: AppColors.white,
    fontFamily: AppTypography.semibold,
    fontSize: 15,
  },
  detectedContainer: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  detectedBottomCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  detectedBottomInner: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
    backgroundColor: '#ECFDF5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  detectedTag: {
    fontFamily: AppTypography.semibold,
    color: '#064E3B',
    fontSize: 12,
  },
  detectedTitle: {
    marginTop: 2,
    fontFamily: AppTypography.bold,
    color: '#064E3B',
    fontSize: 24,
  },
  detectedSubTitle: {
    marginTop: 8,
    fontFamily: AppTypography.regular,
    color: '#14532D',
    fontSize: 13,
    lineHeight: 18,
  },
  quickStatRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickStatChip: {
    width: '31%',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: 'rgba(255,255,255,0.56)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
  },
  quickStatValue: {
    fontFamily: AppTypography.bold,
    fontSize: 17,
    color: '#065F46',
  },
  quickStatLabel: {
    marginTop: 2,
    fontFamily: AppTypography.medium,
    fontSize: 11,
    color: '#166534',
  },
  proceedButton: {
    marginTop: 14,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  proceedButtonText: {
    marginLeft: 8,
    color: AppColors.white,
    fontFamily: AppTypography.semibold,
    fontSize: 15,
  },
  resultContainer: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  resultScrollContent: {
    paddingTop: 120,
    paddingBottom: 42,
    paddingHorizontal: 16,
  },
  glassHeroCard: {
    borderRadius: 28,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(191, 253, 223, 0.55)',
    overflow: 'hidden',
    backgroundColor: 'rgba(7, 40, 24, 0.36)',
  },
  heroEyebrow: {
    fontFamily: AppTypography.medium,
    color: '#A7F3D0',
    fontSize: 12,
  },
  heroTitle: {
    marginTop: 4,
    fontFamily: AppTypography.bold,
    color: '#ECFDF5',
    fontSize: 26,
    lineHeight: 32,
  },
  heroSubtitle: {
    marginTop: 8,
    fontFamily: AppTypography.regular,
    color: '#D1FAE5',
    fontSize: 13,
    lineHeight: 18,
  },
  concernRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
  concernChip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(167, 243, 208, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(167, 243, 208, 0.45)',
  },
  concernText: {
    fontFamily: AppTypography.medium,
    fontSize: 11,
    color: '#D1FAE5',
  },
  heroScoreRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  heroMainScore: {
    width: 100,
    borderRadius: 18,
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(110, 231, 183, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  heroMainScoreValue: {
    fontFamily: AppTypography.bold,
    color: '#ECFDF5',
    fontSize: 28,
  },
  heroMainScoreLabel: {
    fontFamily: AppTypography.medium,
    color: '#A7F3D0',
    fontSize: 11,
  },
  heroScoreGrid: {
    marginLeft: 12,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  heroMiniScore: {
    width: '48%',
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderWidth: 1,
    borderColor: 'rgba(167, 243, 208, 0.4)',
    paddingVertical: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  heroMiniValue: {
    fontFamily: AppTypography.bold,
    color: '#ECFDF5',
    fontSize: 18,
  },
  heroMiniLabel: {
    marginTop: 1,
    fontFamily: AppTypography.medium,
    color: '#D1FAE5',
    fontSize: 10,
  },
  sectionCard: {
    marginTop: 14,
  },
  sectionInner: {
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(191, 253, 223, 0.55)',
    overflow: 'hidden',
    backgroundColor: 'rgba(6, 32, 22, 0.34)',
  },
  sectionTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 18,
    color: '#ECFDF5',
  },
  sectionSubtitle: {
    marginTop: 2,
    fontFamily: AppTypography.regular,
    fontSize: 12,
    color: '#D1FAE5',
  },
  productsRow: {
    marginTop: 12,
    paddingRight: 4,
  },
  productCard: {
    width: 132,
    borderRadius: 16,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(167, 243, 208, 0.45)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  productImageWrap: {
    height: 86,
    borderRadius: 12,
    backgroundColor: 'rgba(236, 253, 245, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 74,
    height: 74,
  },
  productName: {
    marginTop: 8,
    fontFamily: AppTypography.semibold,
    fontSize: 12,
    color: '#ECFDF5',
  },
  productFocus: {
    marginTop: 2,
    fontFamily: AppTypography.regular,
    fontSize: 11,
    color: '#A7F3D0',
  },
  habitItem: {
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 243, 208, 0.45)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 11,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  habitIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(236, 253, 245, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  habitTextWrap: {
    flex: 1,
    marginLeft: 10,
  },
  habitTitle: {
    fontFamily: AppTypography.semibold,
    fontSize: 13,
    color: '#ECFDF5',
  },
  habitDesc: {
    marginTop: 2,
    fontFamily: AppTypography.regular,
    fontSize: 12,
    lineHeight: 17,
    color: '#D1FAE5',
  },
  startRoutineButton: {
    height: 58,
    borderRadius: 30,
    backgroundColor: '#34D399',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  startRoutineText: {
    fontFamily: AppTypography.bold,
    fontSize: 17,
    color: '#022C22',
    letterSpacing: 0.3,
  },
  // ── Processing overlay ──────────────────────────────────────────────────────
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
    backgroundColor: 'transparent',
  },
  processingScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(1, 20, 12, 0.42)',
  },
  processingCard: {
    width: width - 44,
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(167,243,208,0.35)',
    backgroundColor: 'rgba(6, 28, 20, 0.52)',
    alignItems: 'center',
  },
  loaderLottieWrap: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: 'rgba(52, 211, 153, 0.35)',
    backgroundColor: 'rgba(20, 83, 45, 0.24)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  processingLottie: {
    width: 112,
    height: 112,
  },
  processingTextBox: {
    marginTop: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  processingMsg: {
    fontFamily: AppTypography.semibold,
    fontSize: 18,
    color: '#ECFDF5',
    textAlign: 'center',
    lineHeight: 26,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  processingMsgDone: {
    color: '#34D399',
  },
  processingProgressRow: {
    marginTop: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  processingProgressLabel: {
    fontFamily: AppTypography.medium,
    color: '#A7F3D0',
    fontSize: 12,
  },
  processingProgressValue: {
    fontFamily: AppTypography.bold,
    color: '#ECFDF5',
    fontSize: 12,
  },
  processingProgressTrack: {
    marginTop: 8,
    width: '100%',
    height: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(236, 253, 245, 0.18)',
    overflow: 'hidden',
  },
  processingProgressFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#34D399',
  },
});









// import { BlurView } from 'expo-blur';
// import { CameraView, useCameraPermissions } from 'expo-camera';
// import * as Haptics from 'expo-haptics';
// import { Image } from 'expo-image';
// import { useRouter } from 'expo-router';
// import { ChevronLeft, SwitchCamera } from 'lucide-react-native';
// import { useEffect, useRef, useState } from 'react';
// import { Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
// import Animated, {
//   Easing,
//   FadeIn,
//   useAnimatedStyle,
//   useSharedValue,
//   withRepeat,
//   withSequence,
//   withTiming,
// } from 'react-native-reanimated';
// import Svg, { Circle, Line, Path } from 'react-native-svg';

// import { AppColors, AppTypography } from '@/constants/design';

// const { width, height } = Dimensions.get('window');

// export default function FaceScanScreen() {
//   const router = useRouter();
//   const cameraRef = useRef<CameraView>(null);
//   const [permission, requestPermission] = useCameraPermissions();
//   const [facing, setFacing] = useState<'front' | 'back'>('front');
  
//   const [phase, setPhase] = useState<'intro' | 'scan' | 'result'>('intro');
//   const [typingText, setTypingText] = useState('Position your face in the oval');
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);

//   const scanLineProgress = useSharedValue(0);
//   const pulse = useSharedValue(1);

//   // Animations initialization
//   useEffect(() => {
//     scanLineProgress.value = withRepeat(
//       withSequence(
//         withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
//         withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.quad) })
//       ),
//       -1,
//       false
//     );
//     pulse.value = withRepeat(
//       withSequence(withTiming(1.05, { duration: 900 }), withTiming(1, { duration: 900 })),
//       -1,
//       false
//     );
//   }, [pulse, scanLineProgress]);

//   // Phase controller
//   useEffect(() => {
//     if (phase === 'intro') {
//       setTypingText('Position your face in the oval');
//       const introTimer = setTimeout(() => {
//         setPhase('scan');
//       }, 2000);
//       return () => clearTimeout(introTimer);
//     } 
    
//     if (phase === 'scan') {
//       let progress = 0;
//       void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
//       const scanInterval = setInterval(() => {
//         progress += 1;
//         if (progress === 3) {
//           setTypingText('Face Detected. Locking...');
//           void Haptics.selectionAsync();
//         }
//         if (progress === 8) {
//           setTypingText('Analyzing facial structure...');
//           void Haptics.selectionAsync();
//         }
//         if (progress === 12) {
//           setTypingText('Generating mesh map...');
//         }
//       }, 300);

//       const captureTimer = setTimeout(async () => {
//         clearInterval(scanInterval);
//         setTypingText('Capture successful!');
//         if (cameraRef.current) {
//           try {
//             await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
//             const photo = await cameraRef.current.takePictureAsync({
//               quality: 0.7,
//               skipProcessing: true,
//             });
//             if (photo?.uri) {
//               setCapturedImage(photo.uri);
//               setPhase('result');
//               await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//             }
//           } catch (e) {
//             console.error('Failed to capture', e);
//           }
//         }
//       }, 4500);

//       return () => {
//         clearInterval(scanInterval);
//         clearTimeout(captureTimer);
//       };
//     }
//   }, [phase]);

//   const scanLineStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: scanLineProgress.value * 350 }],
//     opacity: 0.85,
//   }));

//   const ovalPulseStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: pulse.value }],
//   }));

//   if (!permission) {
//     return <View style={styles.screen} />;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.permissionWrap}>
//         <Text style={styles.permissionTitle}>Camera Access Required</Text>
//         <Text style={styles.permissionText}>Enable camera to perform skincare face analysis.</Text>
//         <Pressable style={styles.permissionButton} onPress={requestPermission}>
//           <Text style={styles.permissionButtonText}>Allow Camera</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.screen}>
//       {phase !== 'result' ? (
//         <CameraView ref={cameraRef} style={styles.camera} facing={facing} animateShutter={false} />
//       ) : (
//         <Image source={{ uri: capturedImage! }} contentFit="cover" style={styles.camera} />
//       )}

//       {/* Header Overlays */}
//       <View style={styles.overlayTop}>
//         <Pressable 
//           style={styles.iconButton} 
//           onPress={() => {
//             if (phase === 'result') {
//               setPhase('intro');
//               setCapturedImage(null);
//             } else {
//               router.back();
//             }
//           }}>
//           <ChevronLeft size={24} color={AppColors.textPrimary} />
//         </Pressable>
//         <View style={{ flex: 1 }} />
//         {phase !== 'result' && (
//           <Pressable style={styles.iconButton} onPress={() => setFacing((f) => (f === 'front' ? 'back' : 'front'))}>
//             <SwitchCamera size={20} color={AppColors.textPrimary} />
//           </Pressable>
//         )}
//       </View>

//       {/* Intro / Scan UI */}
//       {phase !== 'result' && (
//         <>
//           <View style={styles.scanInstructionWrap}>
//             <BlurView intensity={40} tint="light" style={styles.instructionCard}>
//               <Text style={styles.instructionText}>{typingText}</Text>
//             </BlurView>
//           </View>
          
//           <View style={styles.centerWrap}>
//             <Animated.View style={[styles.scanOval, ovalPulseStyle]}>
//               <Animated.View style={[styles.scanLine, scanLineStyle]} />
//             </Animated.View>
//           </View>
//         </>
//       )}

//       {/* Result PRO UI */}
//       {phase === 'result' && (
//         <View style={styles.resultContainer}>
//           {/* Wireframe Mesh SVG */}
//           <View style={StyleSheet.absoluteFill}>
//             <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
//               {/* General Face Outline */}
//               <Path 
//                 d={`M${width*0.25} ${height*0.25} C ${width*0.15} ${height*0.4}, ${width*0.25} ${height*0.65}, ${width*0.5} ${height*0.7} C ${width*0.75} ${height*0.65}, ${width*0.85} ${height*0.4}, ${width*0.75} ${height*0.25} C ${width*0.7} ${height*0.1}, ${width*0.3} ${height*0.1}, ${width*0.25} ${height*0.25}`} 
//                 stroke="rgba(255,255,255,0.7)" 
//                 fill="none" 
//                 strokeWidth="1" 
//               />
              
//               {/* Mesh Curves */}
//               <Path d={`M${width*0.35} ${height*0.2} Q${width*0.5} ${height*0.15} ${width*0.65} ${height*0.2}`} stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="0.5" />
//               <Path d={`M${width*0.25} ${height*0.3} Q${width*0.5} ${height*0.25} ${width*0.75} ${height*0.3}`} stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="0.5" />
//               <Path d={`M${width*0.2} ${height*0.4} Q${width*0.5} ${height*0.35} ${width*0.8} ${height*0.4}`} stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="0.5" />
//               <Path d={`M${width*0.25} ${height*0.5} Q${width*0.5} ${height*0.45} ${width*0.75} ${height*0.5}`} stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="0.5" />
//               <Path d={`M${width*0.35} ${height*0.6} Q${width*0.5} ${height*0.55} ${width*0.65} ${height*0.6}`} stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="0.5" />
              
//               {/* Vertical Curves */}
//               <Path d={`M${width*0.4} ${height*0.15} Q${width*0.3} ${height*0.4} ${width*0.4} ${height*0.65}`} stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="0.5" />
//               <Path d={`M${width*0.5} ${height*0.15} Q${width*0.5} ${height*0.4} ${width*0.5} ${height*0.7}`} stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="0.5" />
//               <Path d={`M${width*0.6} ${height*0.15} Q${width*0.7} ${height*0.4} ${width*0.6} ${height*0.65}`} stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="0.5" />

//               {/* Linking Dots and Lines */}
//               {/* Fine lines & wrinkles line */}
//               <Line x1={20 + 130} y1={height*0.3 + 30} x2={width*0.35} y2={height*0.3 + 30} stroke="#fff" strokeWidth="0.5" strokeDasharray="3 3"/>
//               <Circle cx={width*0.35} cy={height*0.3 + 30} r="6" stroke="#fff" strokeWidth="1" fill="none" />
//               <Circle cx={width*0.35} cy={height*0.3 + 30} r="2" fill="#2DD4BF" />

//               {/* Skin Texture line */}
//               <Line x1={20 + 65} y1={height*0.6} x2={20 + 65} y2={height*0.6 - 20} stroke="#fff" strokeWidth="0.5" strokeDasharray="3 3"/>
//               <Line x1={20 + 65} y1={height*0.6 - 20} x2={width*0.38} y2={height*0.6 - 20} stroke="#fff" strokeWidth="0.5" strokeDasharray="3 3"/>
//               <Circle cx={width*0.38} cy={height*0.6 - 20} r="6" stroke="#fff" strokeWidth="1" fill="none" />
//               <Circle cx={width*0.38} cy={height*0.6 - 20} r="2" fill="#2DD4BF" />

//               {/* Facial Volume line */}
//               <Line x1={width - 150} y1={height*0.45 + 30} x2={width*0.65} y2={height*0.45 + 30} stroke="#fff" strokeWidth="0.5" strokeDasharray="3 3"/>
//               <Line x1={width*0.65} y1={height*0.45 + 30} x2={width*0.65} y2={height*0.45 + 5} stroke="#fff" strokeWidth="0.5" strokeDasharray="3 3"/>
//               <Circle cx={width*0.65} cy={height*0.45 + 5} r="6" stroke="#fff" strokeWidth="1" fill="none" />
//               <Circle cx={width*0.65} cy={height*0.45 + 5} r="2" fill="#2DD4BF" />

//               {/* Age line */}
//               <Line x1={width*0.5} y1={height*0.75} x2={width*0.5} y2={height*0.68} stroke="#fff" strokeWidth="0.5" strokeDasharray="3 3"/>
//               <Circle cx={width*0.5} cy={height*0.68} r="6" stroke="#fff" strokeWidth="1" fill="none" />
//               <Circle cx={width*0.5} cy={height*0.68} r="2" fill="#2DD4BF" />
//             </Svg>
//           </View>

//           {/* Card 1: Fine lines */}
//           <Animated.View entering={FadeIn.delay(300).duration(500)} style={[styles.proCard, { top: height*0.3, left: 16 }]}>
//             <BlurView intensity={30} tint="light" style={styles.cardInner}>
//               <Text style={styles.cardTitle}>Fine lines{'\n'}& wrinkles</Text>
//               <Text style={styles.cardValue}>38%</Text>
//             </BlurView>
//           </Animated.View>

//           {/* Card 2: Skin texture */}
//           <Animated.View entering={FadeIn.delay(500).duration(500)} style={[styles.proCard, { top: height*0.6, left: 16 }]}>
//             <BlurView intensity={30} tint="light" style={styles.cardInner}>
//               <Text style={styles.cardTitle}>Skin texture{'\n'}& elasticity</Text>
//               <Text style={styles.cardValue}>65%</Text>
//             </BlurView>
//           </Animated.View>

//           {/* Card 3: Facial volume */}
//           <Animated.View entering={FadeIn.delay(700).duration(500)} style={[styles.proCardRight, { top: height*0.45, right: 16 }]}>
//             <BlurView intensity={30} tint="light" style={styles.cardInnerRight}>
//               <Text style={styles.cardTitle}>Facial volume</Text>
//               <View style={styles.progressRow}>
//                 <View style={styles.progressBarBg}>
//                   <View style={[styles.progressBarFill, { width: '45%' }]} />
//                 </View>
//                 <Text style={styles.cardSubValue}>45%</Text>
//               </View>
//             </BlurView>
//           </Animated.View>

//           {/* Card 4: Estimated Age */}
//           <Animated.View entering={FadeIn.delay(900).duration(500)} style={[styles.proCardCenter, { top: height*0.75 }]}>
//             <BlurView intensity={30} tint="light" style={styles.cardInnerCenter}>
//               <Text style={styles.cardMetaTitle}>ESTIMATED AGE</Text>
//               <Text style={styles.cardHugeValue}>60</Text>
//               <Text style={styles.cardMetaSubtitle}>Clinical Confidence: 87%</Text>
//             </BlurView>
//           </Animated.View>

//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   camera: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   overlayTop: {
//     position: 'absolute',
//     top: 56,
//     left: 20,
//     right: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     zIndex: 20,
//   },
//   iconButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.7)',
//   },
//   scanInstructionWrap: {
//     position: 'absolute',
//     top: 120,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   instructionCard: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   instructionText: {
//     fontFamily: AppTypography.semibold,
//     fontSize: 15,
//     color: AppColors.textPrimary,
//   },
//   centerWrap: {
//     position: 'absolute',
//     top: '22%',
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   scanOval: {
//     width: 250,
//     height: 350,
//     borderRadius: 180,
//     borderWidth: 1.5,
//     borderColor: 'rgba(45, 212, 191, 0.4)',
//     overflow: 'hidden',
//     backgroundColor: 'rgba(255,255,255,0.03)',
//   },
//   scanLine: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 2,
//     backgroundColor: '#2DD4BF',
//     shadowColor: '#2DD4BF',
//     shadowOpacity: 1,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 0 },
//     elevation: 4,
//   },
//   permissionWrap: {
//     flex: 1,
//     backgroundColor: AppColors.background,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//   },
//   permissionTitle: {
//     fontFamily: AppTypography.bold,
//     fontSize: 24,
//     color: AppColors.textPrimary,
//   },
//   permissionText: {
//     marginTop: 8,
//     textAlign: 'center',
//     color: AppColors.textSecondary,
//     fontFamily: AppTypography.regular,
//     fontSize: 14,
//   },
//   permissionButton: {
//     marginTop: 18,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: AppColors.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 24,
//   },
//   permissionButtonText: {
//     color: AppColors.white,
//     fontFamily: AppTypography.semibold,
//     fontSize: 15,
//   },
//   resultContainer: {
//     flex: 1,
//     ...StyleSheet.absoluteFillObject,
//   },
//   proCard: {
//     position: 'absolute',
//     width: 140,
//   },
//   proCardRight: {
//     position: 'absolute',
//     width: 150,
//   },
//   proCardCenter: {
//     position: 'absolute',
//     width: 180,
//     alignSelf: 'center',
//   },
//   cardInner: {
//     borderRadius: 12,
//     padding: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.4)',
//     overflow: 'hidden',
//   },
//   cardInnerRight: {
//     borderRadius: 12,
//     padding: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.4)',
//     overflow: 'hidden',
//   },
//   cardInnerCenter: {
//     borderRadius: 16,
//     padding: 14,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.4)',
//     overflow: 'hidden',
//   },
//   cardTitle: {
//     fontFamily: AppTypography.medium,
//     fontSize: 12,
//     color: AppColors.textPrimary,
//     lineHeight: 16,
//   },
//   cardValue: {
//     marginTop: 6,
//     fontFamily: AppTypography.bold,
//     fontSize: 24,
//     color: '#2DD4BF',
//   },
//   progressRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//     gap: 8,
//   },
//   progressBarBg: {
//     flex: 1,
//     height: 8,
//     backgroundColor: 'rgba(0,0,0,0.1)',
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
//   progressBarFill: {
//     height: '100%',
//     backgroundColor: '#2DD4BF',
//   },
//   cardSubValue: {
//     fontFamily: AppTypography.semibold,
//     fontSize: 12,
//     color: AppColors.textPrimary,
//   },
//   cardMetaTitle: {
//     fontFamily: AppTypography.medium,
//     fontSize: 11,
//     color: AppColors.textPrimary,
//     letterSpacing: 1,
//   },
//   cardHugeValue: {
//     marginTop: -2,
//     fontFamily: AppTypography.bold,
//     fontSize: 48,
//     color: '#2DD4BF',
//   },
//   cardMetaSubtitle: {
//     marginTop: 0,
//     fontFamily: AppTypography.regular,
//     fontSize: 10,
//     color: AppColors.textPrimary,
//     opacity: 0.8,
//   },
// });
