import { useRouter } from 'expo-router';
import { Camera, ScanFace } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

export default function ScanTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.center}>
        <View style={styles.iconRing}>
          <ScanFace size={52} color="#34D399" />
        </View>
        <Text style={styles.title}>Start a New Scan</Text>
        <Text style={styles.subtitle}>
          Get a fresh AI skin analysis to track your progress and update your routine.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => router.push('/face-scan')}>
          <Camera size={20} color="#022C22" />
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#011A12' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 36 },
  iconRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(52,211,153,0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(52,211,153,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  title: { fontFamily: AppTypography.bold, fontSize: 28, color: '#ECFDF5', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontFamily: AppTypography.regular, fontSize: 14, color: '#6EE7B7', textAlign: 'center', lineHeight: 22, marginBottom: 36 },
  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#34D399',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 36,
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  buttonText: { fontFamily: AppTypography.bold, fontSize: 16, color: '#022C22' },
});
