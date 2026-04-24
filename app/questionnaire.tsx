import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  StyleSheet, Text, View, Pressable, Platform,
  Dimensions, ScrollView, StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, withSpring,
  withSequence, FadeIn, FadeInUp, Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowRight, ChevronLeft } from 'lucide-react-native';
import {
  SvgFemale, SvgMale, SvgTimer, SvgCalendar, SvgClock, SvgHistory, SvgOily, SvgDry, SvgNormal, SvgCombo, SvgCheckCircle
} from '@/components/icons/SkinIcons';
import * as Haptics from 'expo-haptics';

import { AppColors, AppTypography } from '@/constants/design';
import i18n from '@/lib/i18n';

const { width, height } = Dimensions.get('window');

// ─── Images per image-step ───────────────────────────────────────────────────
const STEP_IMAGES: Record<string, string> = {
  intro: 'https://i.pinimg.com/1200x/93/b4/95/93b49547414a225e73aeaa9c3748f887.jpg',
  gender: 'https://i.pinimg.com/1200x/b8/f9/44/b8f9449184734f742ab2b820f1cd5806.jpg',
  age: 'https://i.pinimg.com/1200x/f4/cc/e4/f4cce4529b3dab1db83cdfac1f733acc.jpg',
  outro: 'https://i.pinimg.com/736x/49/b3/ae/49b3aeb525f0fbc356afb861b42b450e.jpg',
};

// Steps that use a full-bleed photo background
const IMAGE_STEPS = ['intro', 'gender', 'outro']; // age uses NO-IMAGE layout with bg override

// ─── Haptic helper ────────────────────────────────────────────────────────────
function haptic(style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) {
  if (Platform.OS === 'ios') Haptics.impactAsync(style);
}

// ─── TypeWriter ───────────────────────────────────────────────────────────────
function TypeWriter({
  text, style, charDelay = 36, onDone,
}: { text: string; style?: object; charDelay?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    setDone(false);
    const raw = text ?? '';
    // Guard against literal 'undefined' or i18n '[missing ...]' strings
    const safeText = (raw === 'undefined' || raw.startsWith('[missing') || raw.startsWith('[')) ? '' : raw;
    function tick() {
      if (indexRef.current < safeText.length) {
        const char = safeText[indexRef.current]; // capture value BEFORE ref increments
        if (indexRef.current % 4 === 0) haptic();
        indexRef.current += 1;
        setDisplayed((p) => p + char); // safe: uses captured value, not the ref
        timerRef.current = setTimeout(tick, charDelay);
      } else {
        setDone(true);
        onDone?.();
      }
    }
    timerRef.current = setTimeout(tick, 200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [text]);

  return (
    <Text style={style}>
      {displayed}
      {!done && <Text style={{ opacity: 0.35 }}>|</Text>}
    </Text>
  );
}

// ─── Option Card ──────────────────────────────────────────────────────────────
function OptionCard({
  label, desc, icon: Icon, isActive, index, onPress,
}: {
  label: string; desc?: string; icon: React.ElementType;
  isActive: boolean; index: number; onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const ty = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 350, easing: Easing.out(Easing.cubic) });
    ty.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.back(1.5)) });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: ty.value }, { scale: scale.value }],
  }));

  const onPressCard = () => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 70 }),
      withSpring(1, { damping: 10, stiffness: 220 }),
    );
    haptic(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <Animated.View style={animStyle}>
      <Pressable
        style={[styles.card, isActive && styles.cardActive]}
        onPress={onPressCard}
        android_ripple={{ color: 'rgba(16,185,129,0.18)' }}
      >
        {isActive && (
          <LinearGradient
            colors={['rgba(16,185,129,0.18)', 'rgba(16,185,129,0.03)']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        )}
        <View style={[styles.cardIcon, isActive && styles.cardIconActive]}>
          <Icon size={22} color={isActive ? '#fff' : 'rgba(255,255,255,0.45)'} />
        </View>
        <View style={styles.cardText}>
          <Text style={[styles.cardLabel, isActive && styles.cardLabelActive]}>{label}</Text>
          {desc ? <Text style={styles.cardDesc} numberOfLines={2}>{desc}</Text> : null}
        </View>
        {isActive
          ? <SvgCheckCircle size={24} color={AppColors.primary} />
          : <View style={styles.emptyCheck} />}
      </Pressable>
    </Animated.View>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────
function CtaButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Animated.View entering={FadeInUp.springify().damping(16).delay(100)} style={styles.ctaWrap}>
      <Pressable
        onPress={() => { haptic(Haptics.ImpactFeedbackStyle.Medium); onPress(); }}
        style={{ overflow: 'hidden', borderRadius: 20 }}
      >
        <LinearGradient
          colors={['#12C98A', '#059669']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={styles.ctaGrad}
        >
          <Text style={styles.ctaLabel}>{label}</Text>
          <ArrowRight size={18} color="#fff" />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
type StepId = 'intro' | 'gender' | 'age' | 'skinType' | 'outro';
const STEPS: StepId[] = ['intro', 'gender', 'age', 'skinType', 'outro'];
interface Answers { gender?: string; age?: string; skinType?: string }

export default function QuestionnaireScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [typingDone, setTypingDone] = useState(false);
  const lottieRef = useRef<LottieView>(null);

  const step = STEPS[stepIndex];
  const hasImage = IMAGE_STEPS.includes(step);

  useEffect(() => {
    setTypingDone(false);
    lottieRef.current?.play();
  }, [stepIndex]);

  const goNext = useCallback(() => {
    if (stepIndex < STEPS.length - 1) setStepIndex((s) => s + 1);
    else router.replace('/face-scan');
  }, [stepIndex, router]);

  const goBack = useCallback(() => {
    if (stepIndex > 0) { haptic(); setStepIndex((s) => s - 1); }
  }, [stepIndex]);

  const pick = useCallback((key: keyof Answers, val: string) => {
    setAnswers((p) => ({ ...p, [key]: val }));
    setTimeout(goNext, 480);
  }, [goNext]);

  const Q: Record<StepId, string> = {
    intro: i18n.t('q_intro_subtitle'),  // typed as the main message for intro
    gender: i18n.t('q_gender_title'),
    age: i18n.t('q_age_title'),
    skinType: i18n.t('q_skin_title'),
    outro: i18n.t('q_outro_subtitle'),  // typed as the message for outro
  };
  const SUB: Partial<Record<StepId, string>> = {
    gender: i18n.t('q_gender_subtitle'),
    age: i18n.t('q_age_subtitle'),
  };

  const genderOpts = [
    { id: 'female', label: i18n.t('g_female'), icon: SvgFemale },
    { id: 'male', label: i18n.t('g_male'), icon: SvgMale },
  ];
  const ageOpts = [
    { id: 'under25', label: i18n.t('a_under25'), icon: SvgTimer },
    { id: '25_34', label: i18n.t('a_25_34'), icon: SvgCalendar },
    { id: '35_44', label: i18n.t('a_35_44'), icon: SvgCalendar },
    { id: '45_60', label: i18n.t('a_45_60'), icon: SvgClock },
    { id: 'over60', label: i18n.t('a_over60'), icon: SvgHistory },
  ];
  const skinOpts = [
    { id: 'oily', label: i18n.t('s_oily'), desc: i18n.t('s_oily_desc'), icon: SvgOily },
    { id: 'dry', label: i18n.t('s_dry'), desc: i18n.t('s_dry_desc'), icon: SvgDry },
    { id: 'normal', label: i18n.t('s_normal'), desc: i18n.t('s_normal_desc'), icon: SvgNormal },
    { id: 'combo', label: i18n.t('s_combo'), desc: i18n.t('s_combo_desc'), icon: SvgCombo },
  ];

  // ── Fixed panel height estimates so layout never shifts ───────────────────
  // We reserve enough space at the bottom for the content panel BEFORE it appears.
  // This way the gradient and back button are never pushed.
  const PANEL_PAD_BOTTOM = insets.bottom + 28;

  // ── IMAGE STEP LAYOUT ─────────────────────────────────────────────────────
  if (hasImage) {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" />

        {/* Full-bleed photo — absolute, never in layout flow */}
        <Image
          source={STEP_IMAGES[step]}
          contentFit="cover"
          style={StyleSheet.absoluteFillObject}
        />

        {/* Gradient overlay — top half clean photo, bottom half dark green */}
        <LinearGradient
          colors={['transparent', 'transparent', 'rgba(2,26,16,0.7)', '#021a10', '#021a10']}
          locations={[0, 0.28, 0.52, 0.68, 1]}
          style={StyleSheet.absoluteFillObject}
        />

        {/* ── Back button — absolute top, never moves ── */}
        {stepIndex > 0 && (
          <Pressable
            onPress={goBack}
            style={[styles.backBtn, { top: insets.top + 12 }]}
          >
            <ChevronLeft size={22} color="rgba(255,255,255,0.85)" />
          </Pressable>
        )}

        {/* ── Bottom panel — absolutely anchored, NEVER pushes anything ── */}
        <View style={[styles.bottomPanel, { paddingBottom: PANEL_PAD_BOTTOM }]}>

          {/* ── Avatar chip row (intro only) — left-aligned, small, image still visible ── */}
          {step === 'intro' && (
            <Animated.View entering={FadeIn.duration(400)} style={styles.avatarRow}>
              <View style={styles.avatarWrap}>
                <LottieView
                  ref={lottieRef}
                  source={require('@/assets/bot.json')}
                  autoPlay loop
                  style={styles.botSmall}
                />
              </View>
              <View style={styles.avatarText}>
                <Text style={styles.avatarName}>Skinova</Text>
                <View style={styles.avatarBadge}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.avatarBadgeText}>AI Skin Assistant</Text>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Typewriter — for intro this is the subtitle message, not title */}
          <View style={styles.qBox} key={step + '_qbox'}>
            <Animated.View key={step + '_q'} entering={FadeIn.duration(200)}>
              <TypeWriter
                text={Q[step] ?? ''}
                style={step === 'intro' || step === 'outro' ? styles.qMessage : styles.qText}
                charDelay={step === 'intro' ? 32 : 36}
                onDone={() => setTypingDone(true)}
              />
            </Animated.View>

            {/* Subtitle only for gender */}
            {typingDone && SUB[step] ? (
              <Animated.Text
                entering={FadeIn.duration(350).delay(60)}
                style={styles.qSub}
              >
                {SUB[step]}
              </Animated.Text>
            ) : (
              SUB[step] ? <Text style={[styles.qSub, { opacity: 0 }]} numberOfLines={2}>{SUB[step]}</Text> : null
            )}
          </View>

          {/* Options / CTA — fade in after typing */}
          {typingDone && (
            <Animated.View entering={FadeIn.duration(300).delay(80)}>
              {step === 'gender' && (
                <View style={styles.fewOptList}>
                  {genderOpts.map((o, i) => (
                    <OptionCard key={o.id} {...o} index={i}
                      isActive={answers.gender === o.id}
                      onPress={() => pick('gender', o.id)} />
                  ))}
                </View>
              )}
              {(step === 'intro' || step === 'outro') && (
                <CtaButton
                  label={step === 'intro' ? i18n.t('q_next') : i18n.t('q_start')}
                  onPress={goNext}
                />
              )}
            </Animated.View>
          )}
        </View>
      </View>
    );
  }

  // ── NO-IMAGE STEP LAYOUT ──────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {STEP_IMAGES[step] ? (
        <>
          <Image
            source={STEP_IMAGES[step]}
            contentFit="cover"
            style={StyleSheet.absoluteFillObject}
          />
          {/* Deep dark green vignette at top/bottom, smooth blend with overlay in center */}
          <LinearGradient
            colors={['#011208', 'rgba(2, 26, 16, 0.95)', 'rgba(2, 26, 16, 0.98)', '#011107ff']}
            locations={[0, 0.35, 0.65, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.accentBlob} />
        </>
      ) : (
        <>
          <LinearGradient
            colors={['#032b1a', '#021a10', '#011208']}
            start={{ x: 0.3, y: 0 }} end={{ x: 0.7, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.accentBlob} />
        </>
      )}

      {/* Back button — absolute, always pinned to top, never pushed */}
      {stepIndex > 0 && (
        <Pressable
          onPress={goBack}
          style={[styles.backBtn, { top: insets.top + 12 }]}
        >
          <ChevronLeft size={22} color="rgba(255,255,255,0.85)" />
        </Pressable>
      )}

      {/* Question — fixed position below back button */}
      <View style={[styles.noImgQuestion, { top: insets.top + 72 }]}>
        <Animated.View key={step + '_q'} entering={FadeIn.duration(200)}>
          <TypeWriter
            text={Q[step]}
            style={styles.qTextLarge}
            charDelay={30}
            onDone={() => setTypingDone(true)}
          />
        </Animated.View>

        {/* Same trick: render subtitle with opacity 0 before done so height is reserved */}
        {typingDone && SUB[step] ? (
          <Animated.Text entering={FadeIn.duration(350).delay(60)} style={styles.qSub}>
            {SUB[step]}
          </Animated.Text>
        ) : (
          <Text style={[styles.qSub, { opacity: 0 }]} numberOfLines={2}>{SUB[step]}</Text>
        )}
      </View>

      {/* Options scroll area — fills space below question */}
      {typingDone && (
        <Animated.View
          entering={FadeIn.duration(300).delay(80)}
          style={[styles.scrollWrap, { top: insets.top + 200 }]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 32 }]}
          >
            {step === 'age' && ageOpts.map((o, i) => (
              <OptionCard key={o.id} {...o} index={i}
                isActive={answers.age === o.id}
                onPress={() => pick('age', o.id)} />
            ))}
            {step === 'skinType' && skinOpts.map((o, i) => (
              <OptionCard key={o.id} {...o} index={i}
                isActive={answers.skinType === o.id}
                onPress={() => pick('skinType', o.id)} />
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#021a10' },

  // ── Shared back button — always absolute ───────────────────────────────────
  backBtn: {
    position: 'absolute',
    left: 16,
    zIndex: 20,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.38)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center',
  },

  // ── IMAGE step ─────────────────────────────────────────────────────────────
  bottomPanel: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
    gap: 10,
  },

  // ── Bot avatar row ──────────────────────────────────────────────────────────
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(16,185,129,0.18)',
    borderWidth: 1.5,
    borderColor: 'rgba(16,185,129,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  botSmall: { width: 64, height: 64 },
  avatarText: { flex: 1 },
  avatarName: {
    fontFamily: AppTypography.bold,
    fontSize: 17,
    color: '#fff',
    letterSpacing: -0.2,
  },
  avatarBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  onlineDot: {
    width: 7, height: 7, borderRadius: 4,
    backgroundColor: AppColors.primary,
  },
  avatarBadgeText: {
    fontFamily: AppTypography.regular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
  },

  qBox: {
    minHeight: 80,
  },

  qMessage: {
    fontSize: 22,
    fontFamily: AppTypography.medium,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 30,
    letterSpacing: -0.2,
  },
  qText: {
    fontSize: 28,
    fontFamily: AppTypography.bold,
    color: '#fff',
    lineHeight: 36,
    letterSpacing: -0.4,
  },
  qSub: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: AppTypography.regular,
    color: 'rgba(255,255,255,0.52)',
    lineHeight: 20,
  },

  fewOptList: { gap: 11 },

  // ── NO-IMAGE step ──────────────────────────────────────────────────────────
  accentBlob: {
    position: 'absolute',
    width: 260, height: 260, borderRadius: 130,
    backgroundColor: '#10B981', opacity: 0.07,
    top: -60, right: -60,
  },
  noImgQuestion: {
    position: 'absolute',
    left: 0, right: 0,
    paddingHorizontal: 26,
    minHeight: 130,
  },
  qTextLarge: {
    fontSize: 30,
    fontFamily: AppTypography.bold,
    color: '#fff',
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  scrollWrap: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },

  // ── Option card ────────────────────────────────────────────────────────────
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.07)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 14,
    overflow: 'hidden',
  },
  cardActive: {
    borderColor: AppColors.primary,
    backgroundColor: 'transparent',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 0, // Disable harsh Android shadow
  },
  cardIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  cardIconActive: {
    backgroundColor: AppColors.primary,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 0, // Disable harsh Android shadow
  },
  cardText: { flex: 1, gap: 3 },
  cardLabel: {
    fontSize: 17,
    fontFamily: AppTypography.semibold,
    color: 'rgba(255,255,255,0.85)',
  },
  cardLabelActive: { color: '#fff', fontFamily: AppTypography.bold },
  cardDesc: {
    fontSize: 13,
    fontFamily: AppTypography.regular,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 18,
  },
  emptyCheck: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.15)',
  },

  // ── CTA ────────────────────────────────────────────────────────────────────
  ctaWrap: {
    marginTop: 4,
    shadowColor: AppColors.primary,
    shadowOpacity: 0.55,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 7 },
    elevation: 10,
  },
  ctaGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 20,
  },
  ctaLabel: {
    fontFamily: AppTypography.bold,
    fontSize: 17,
    color: '#fff',
    letterSpacing: 0.3,
  },
});
