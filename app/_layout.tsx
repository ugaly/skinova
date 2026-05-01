import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ModalProvider } from '../context/ModalContext';
import { PermissionsProvider } from '../context/PermissionsProvider';

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
    <SafeAreaProvider>
      <ModalProvider>
        <PermissionsProvider>
          <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
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
            <Stack.Screen
              name="recommendations"
              options={{
                presentation: 'card',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="modal-detail"
              options={{
                presentation: 'modal',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="supplier-map"
              options={{
                presentation: 'fullScreenModal',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="routine-detail"
              options={{
                presentation: 'modal',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ai-chat"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="my-shelf"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="feedback"
              options={{
                headerShown: false,
                presentation: 'card',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="dermatologists"
              options={{
                headerShown: false,
                presentation: 'card',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="dermatologist/[id]"
              options={{
                headerShown: false,
                presentation: 'card',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="appointment-schedule"
              options={{
                headerShown: false,
                presentation: 'card',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="appointment-history"
              options={{
                headerShown: false,
                presentation: 'card',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="dermatology-chat"
              options={{
                headerShown: false,
                presentation: 'card',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="routine-calendar"
              options={{
                headerShown: false,
                presentation: 'card',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="chat-list"
              options={{
                headerShown: false,
                presentation: 'card',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="search"
              options={{
                headerShown: false,
                presentation: 'card',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="product-scan"
              options={{
                headerShown: false,
                presentation: 'fullScreenModal',
                animation: 'slide_from_bottom',
              }}
            />
          </Stack>
        </PermissionsProvider>
      </ModalProvider>
    </SafeAreaProvider>
  );
}
