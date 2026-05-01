
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { CalendarRange, Clock, Sparkles, ShoppingBag, Users } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';
import { ModalProvider } from '../../context/ModalContext';

const ACTIVE_COLOR = '#6EE7B7';
const INACTIVE_COLOR = 'rgba(220,252,231,0.82)';
// const TAB_BG = '#14532D';
const TAB_BG = '#0B3A2B';
const CENTER_BG = '#16A34A';

function TabBarBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: TAB_BG }]} />
      <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

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
            backgroundColor: TAB_BG,
            height: 58 + Math.max(insets.bottom, 8),
            paddingBottom: Math.max(insets.bottom, 8),
            paddingTop: 6,
            elevation: 6,
            shadowColor: '#064E3B',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.2,
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
            title: 'Menu',
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 33,
                  backgroundColor: 'rgba(220,252,231,0.65)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 34,
                  shadowColor: '#0F172A',
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.14,
                  shadowRadius: 8,
                  elevation: 7,
                }}>
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    backgroundColor: CENTER_BG,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Sparkles size={20} color={focused ? '#ECFDF5' : '#BBF7D0'} />
                </View>
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







// import { BlurView } from 'expo-blur';
// import { Tabs } from 'expo-router';
// import { CalendarRange, Clock, Sparkles, ShoppingBag, Users } from 'lucide-react-native';
// import { StyleSheet, View } from 'react-native';

// import { AppTypography } from '@/constants/design';
// import { ModalProvider } from '../../context/ModalContext';

// const ACTIVE_COLOR = '#34D399';
// const INACTIVE_COLOR = 'rgba(236,253,245,0.82)';
// const DEEP_GREEN = '#0B3A2B';

// function TabBarBackground() {
//   return (
//     <View style={StyleSheet.absoluteFill}>
//       <View style={[StyleSheet.absoluteFill, { backgroundColor: DEEP_GREEN }]} />
//       <BlurView intensity={44} tint="dark" style={StyleSheet.absoluteFill} />
//     </View>
//   );
// }

// export default function TabsLayout() {
//   return (
//     <ModalProvider>
//       <Tabs
//         screenOptions={{
//           headerShown: false,
//           tabBarActiveTintColor: ACTIVE_COLOR,
//           tabBarInactiveTintColor: INACTIVE_COLOR,
//           tabBarLabelStyle: {
//             fontFamily: AppTypography.medium,
//             fontSize: 11,
//             marginBottom: 4,
//           },
//           tabBarStyle: {
//             position: 'absolute',
//             borderTopWidth: 0,
//             backgroundColor: DEEP_GREEN,
//             elevation: 8,
//             shadowColor: '#064E3B',
//             shadowOffset: { width: 0, height: -4 },
//             shadowOpacity: 0.18,
//             shadowRadius: 12,
//           },
//           tabBarBackground: () => <TabBarBackground />,
//         }}>
//         <Tabs.Screen
//           name="index"
//           options={{
//             title: 'Today',
//             tabBarIcon: ({ color, size }) => <CalendarRange size={size} color={color} />,
//           }}
//         />
//         <Tabs.Screen
//           name="products"
//           options={{
//             title: 'Products',
//             tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
//           }}
//         />
//         <Tabs.Screen
//           name="scan"
//           options={{
//             title: 'Menu',
//             tabBarIcon: ({ focused }) => (
//               <View
//                 style={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: 24,
//                   backgroundColor: focused ? ACTIVE_COLOR : '#0B2B1F',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   marginBottom: 28,
//                   shadowColor: ACTIVE_COLOR,
//                   shadowOffset: { width: 0, height: 4 },
//                   shadowOpacity: focused ? 0.5 : 0.26,
//                   shadowRadius: 10,
//                   elevation: 6,
//                   borderWidth: focused ? 0 : 1,
//                   borderColor: 'rgba(209,250,229,0.18)',
//                 }}>
//                 <Sparkles size={21} color={focused ? '#022C22' : '#D1FAE5'} />
//               </View>
//             ),
//             tabBarLabel: () => null,
//           }}
//         />
//         <Tabs.Screen
//           name="routine"
//           options={{
//             title: 'Routine',
//             tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
//           }}
//         />
//         <Tabs.Screen
//           name="community"
//           options={{
//             title: 'Community',
//             tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
//           }}
//         />
//       </Tabs>
//     </ModalProvider>
//   );
// }
