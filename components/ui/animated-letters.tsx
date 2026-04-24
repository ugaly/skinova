import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Platform, AccessibilityInfo, StyleProp, TextStyle, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  runOnJS,
  Easing
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export interface AnimatedLettersProps {
  text: string;
  duration?: number;
  staggerDelay?: number;
  stayDuration?: number;
  loop?: boolean;
  enableHapticsOnIOS?: boolean;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const Letter = ({ 
  letter, 
  index, 
  duration, 
  staggerDelay, 
  stayDuration,
  loop,
  enableHapticsOnIOS,
  reducedMotion,
  style,
  playKey 
}: any) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(reducedMotion ? 0 : 10);

  const triggerHaptic = useCallback(() => {
    // Letters should ideally use lighter haptics to prevent hardware buzz overload
    if (Platform.OS === 'ios' && enableHapticsOnIOS && letter.trim() !== '') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [enableHapticsOnIOS, letter]);

  useEffect(() => {
    const delay = index * staggerDelay;

    opacity.value = 0;
    translateY.value = reducedMotion ? 0 : 10;

    opacity.value = withDelay(
      delay,
      withSequence(
        withTiming(1, { duration, easing: Easing.out(Easing.cubic) }, (finished) => {
          if (finished) runOnJS(triggerHaptic)();
        }),
        loop ? withDelay(stayDuration, withTiming(0, { duration: duration * 0.8 })) : withTiming(1, { duration: 0 })
      )
    );

    if (!reducedMotion) {
      translateY.value = withDelay(
        delay,
        withSequence(
          withTiming(0, { duration, easing: Easing.out(Easing.back(1.5)) }),
          loop ? withDelay(stayDuration, withTiming(-10, { duration: duration * 0.8 })) : withTiming(0, { duration: 0 })
        )
      );
    }
  }, [playKey, reducedMotion]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  // Preserve spaces properly
  if (letter === ' ') {
    return <Text style={style}> </Text>;
  }

  return (
    <Animated.Text style={[style, animatedStyle]}>
      {letter}
    </Animated.Text>
  );
};

export default function AnimatedLetters({
  text,
  duration = 300,
  staggerDelay = 40, // Much faster for letters!
  stayDuration = 2000,
  loop = false,
  enableHapticsOnIOS = true,
  style,
  containerStyle
}: AnimatedLettersProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const letters = text.split('');

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReducedMotion(enabled);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!loop) return;
    
    const cycleTime = (letters.length * staggerDelay) + duration + stayDuration + (duration * 0.8) + 500;
    
    const interval = setInterval(() => {
      setPlayKey((k) => k + 1);
    }, cycleTime);
    
    return () => clearInterval(interval);
  }, [loop, letters.length, staggerDelay, duration, stayDuration]);

  return (
    <View style={[styles.container, containerStyle]}>
      {letters.map((char, index) => (
        <Letter
          key={`${char}-${index}-${playKey}`}
          letter={char}
          index={index}
          duration={duration}
          staggerDelay={staggerDelay}
          stayDuration={stayDuration}
          loop={loop}
          enableHapticsOnIOS={enableHapticsOnIOS}
          reducedMotion={reducedMotion}
          style={style}
          playKey={playKey}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
