import { View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

import { AppColors } from '@/constants/design';
import { useOnboardingStore } from '@/store/useOnboardingStore';

type AnimatedDotsProps = {
  totalSteps: number;
};

function DotItem({ isActive }: { isActive: boolean }) {
  const dotStyle = useAnimatedStyle(() => ({
    width: withSpring(isActive ? 24 : 8, {
      mass: 1,
      damping: 15,
      stiffness: 120,
    }),
    backgroundColor: withTiming(isActive ? AppColors.primary : AppColors.secondary, {
      duration: 160,
    }),
    opacity: withTiming(isActive ? 1 : 0.5, { duration: 160 }),
    transform: [
      {
        scale: withSpring(isActive ? 1.08 : 1, {
          mass: 1,
          damping: 15,
          stiffness: 120,
        }),
      },
    ],
  }));

  return <Animated.View style={[dotStyle]} className="h-2 rounded-full" />;
}

export default function AnimatedDots({ totalSteps }: AnimatedDotsProps) {
  const currentStep = useOnboardingStore((state) => state.currentStep);

  return (
    <View className="mt-2 flex-row items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = currentStep === index;
        return <DotItem key={index} isActive={isActive} />;
      })}
    </View>
  );
}
