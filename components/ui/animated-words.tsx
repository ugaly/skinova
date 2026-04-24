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

export interface AnimatedWordsProps {
  text: string;
  duration?: number;
  staggerDelay?: number;
  stayDuration?: number; // How long it stays before looping/fading out
  loop?: boolean;
  enableHapticsOnIOS?: boolean;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const Word = ({ 
  word, 
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

  const triggerHaptic = useCallback(() => {
    if (Platform.OS === 'ios' && enableHapticsOnIOS) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [enableHapticsOnIOS]);

  useEffect(() => {
    const delay = index * staggerDelay;
    opacity.value = 0;

    opacity.value = withDelay(
      delay,
      withSequence(
        withTiming(1, { duration: duration * 0.5, easing: Easing.linear }, (finished) => {
          if (finished) runOnJS(triggerHaptic)();
        }),
        loop ? withDelay(stayDuration, withTiming(0, { duration: duration * 0.5 })) : withTiming(1, { duration: 0 })
      )
    );
  }, [playKey, reducedMotion]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.Text style={[style, animatedStyle]}>
      {word}{' '}
    </Animated.Text>
  );
};

export default function AnimatedWords({
  text,
  duration = 400,
  staggerDelay = 120,
  stayDuration = 2000,
  loop = false,
  enableHapticsOnIOS = true,
  style,
  containerStyle
}: AnimatedWordsProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReducedMotion(enabled);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!loop) return;
    
    // Total time for one full cycle:
    // Last word start time (words.length * stagger) + animate in (duration) + stay duration (stay) + animate out (duration * 0.8)
    const cycleTime = (words.length * staggerDelay) + duration + stayDuration + (duration * 0.8) + 500; // 500ms breather
    
    const interval = setInterval(() => {
      setPlayKey((k) => k + 1);
    }, cycleTime);
    
    return () => clearInterval(interval);
  }, [loop, words.length, staggerDelay, duration, stayDuration]);

  return (
    <View style={[styles.container, containerStyle]}>
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}-${playKey}`}
          word={word}
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
