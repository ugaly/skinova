import { Cloud, Sun, Umbrella, Wind } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

const tips = [
  {
    icon: Sun,
    title: 'UV Index: High',
    desc: 'Apply SPF 50+ before going out. Reapply every 2 hours.',
    color: '#FBBF24',
  },
  {
    icon: Cloud,
    title: 'Humidity: 65%',
    desc: 'Great for skin. Your barrier retains moisture well in this condition.',
    color: '#60A5FA',
  },
  {
    icon: Wind,
    title: 'Wind: Moderate',
    desc: 'Consider a light occlusive layer to protect against barrier disruption.',
    color: '#A7F3D0',
  },
  {
    icon: Umbrella,
    title: 'Rain later',
    desc: 'Humidity will rise tonight — ideal time for an exfoliation treatment.',
    color: '#818CF8',
  },
];

export default function SunshineTab() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Sun size={22} color="#FBBF24" />
        <Text style={styles.heading}>Sunshine</Text>
      </View>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}>

        {/* Big UV card */}
        <View style={styles.uvCard}>
          <Sun size={48} color="#FBBF24" />
          <Text style={styles.uvLabel}>Today's UV Index</Text>
          <Text style={styles.uvValue}>8</Text>
          <Text style={styles.uvSub}>Very High — protect your skin!</Text>
        </View>

        {/* Skin impact tips */}
        <Text style={styles.sectionLabel}>Skin + Weather Tips</Text>
        {tips.map((t) => {
          const Icon = t.icon;
          return (
            <View key={t.title} style={styles.tipRow}>
              <View style={[styles.tipIcon, { backgroundColor: `${t.color}18` }]}>
                <Icon size={18} color={t.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.tipTitle}>{t.title}</Text>
                <Text style={styles.tipDesc}>{t.desc}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#011A12' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  heading: { fontFamily: AppTypography.bold, fontSize: 26, color: '#ECFDF5' },
  scroll: { paddingHorizontal: 20, paddingTop: 4 },
  uvCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(251,191,36,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.2)',
    borderRadius: 24,
    padding: 28,
    marginBottom: 24,
  },
  uvLabel: { fontFamily: AppTypography.medium, fontSize: 13, color: '#FDE68A', marginTop: 12 },
  uvValue: { fontFamily: AppTypography.bold, fontSize: 64, color: '#FBBF24', lineHeight: 72 },
  uvSub: { fontFamily: AppTypography.regular, fontSize: 13, color: '#FCD34D' },
  sectionLabel: { fontFamily: AppTypography.semibold, fontSize: 15, color: '#ECFDF5', marginBottom: 14 },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  tipIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipTitle: { fontFamily: AppTypography.semibold, fontSize: 14, color: '#ECFDF5' },
  tipDesc: { fontFamily: AppTypography.regular, fontSize: 12, color: '#A7F3D0', marginTop: 3, lineHeight: 18 },
});
