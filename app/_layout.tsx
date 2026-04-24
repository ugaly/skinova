import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import '../global.css';

import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    'SpaceGrotesk-Regular': require('../assets/fonts/SpaceGrotesk-Regular.ttf'),
    'SpaceGrotesk-Medium': require('../assets/fonts/SpaceGrotesk-Medium.ttf'),
    'SpaceGrotesk-SemiBold': require('../assets/fonts/SpaceGrotesk-SemiBold.ttf'),
    'SpaceGrotesk-Bold': require('../assets/fonts/SpaceGrotesk-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="face-scan"
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth-modal"
        options={{
          presentation: Platform.OS === 'ios' ? 'modal' : 'transparentModal',
          animation: Platform.OS === 'ios' ? 'slide_from_bottom' : 'fade_from_bottom',
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
    </Stack>
  );
}
