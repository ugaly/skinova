import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { CalendarRange, Camera, Clock, ShoppingBag, Users } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppTypography } from '@/constants/design';
import { ModalProvider } from '../../context/ModalContext';

const ACTIVE_COLOR = '#34D399';
const INACTIVE_COLOR = 'rgba(209,250,229,0.45)';
const DEEP_GREEN = '#011A12';

function TabBarBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: DEEP_GREEN }]} />
      <BlurView intensity={44} tint="dark" style={StyleSheet.absoluteFill} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <ModalProvider>
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
          tabBarStyle: {
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
            tabBarIcon: ({ color, size }) => <CalendarRange size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: 'Products',
            tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            title: 'New Scan',
            tabBarIcon: () => (
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
          name="routine"
          options={{
            title: 'Routine',
            tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: 'Community',
            tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
          }}
        />
      </Tabs>
    </ModalProvider>
  );
}
