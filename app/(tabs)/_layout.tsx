import { BlurView } from 'expo-blur';
import Constants from 'expo-constants';
import { Tabs } from 'expo-router';
import {
  BarChart2,
  CalendarRange,
  Camera,
  ShoppingBag,
  Sun,
} from 'lucide-react-native';
import { Platform, StyleSheet, View } from 'react-native';

import { AppTypography } from '@/constants/design';

const ACTIVE_COLOR = '#34D399';
const INACTIVE_COLOR = 'rgba(209,250,229,0.45)';
const DEEP_GREEN = '#011A12';

// iOS 26+ Liquid Glass is enabled automatically when you use BlurView
// with TabBar background set to transparent + tint "systemUltraThinMaterial".
// For all other platforms / older iOS we render our own deep green bar.

const isIOS26Plus =
  Platform.OS === 'ios' &&
  parseInt(String(Constants.systemFonts ? Platform.Version : 0), 10) >= 26;

function TabBarBackground() {
  if (isIOS26Plus) {
    // Let the native Liquid Glass tab bar show through — no overlay needed
    return null;
  }
  return (
    <BlurView
      intensity={60}
      tint="dark"
      style={StyleSheet.absoluteFill}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarLabelStyle: {
          fontFamily: AppTypography.medium,
          fontSize: 11,
          marginBottom: 4,
        },
        tabBarStyle: isIOS26Plus
          ? {
              // Liquid Glass on iOS 26: transparent bar + native blur material
              position: 'absolute',
              borderTopWidth: 0,
              backgroundColor: 'transparent',
              elevation: 0,
            }
          : {
              position: 'absolute',
              borderTopWidth: 0,
              backgroundColor: DEEP_GREEN,
              elevation: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.25,
              shadowRadius: 12,
            },
        tabBarBackground: () => <TabBarBackground />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, size }) => (
            <CalendarRange size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'New Scan',
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: ACTIVE_COLOR,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 28,
                shadowColor: ACTIVE_COLOR,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                elevation: 6,
              }}>
              <Camera size={22} color="#022C22" />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <BarChart2 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sunshine"
        options={{
          title: 'Sunshine',
          tabBarIcon: ({ color, size }) => (
            <Sun size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
