import { BarChart2, TrendingUp } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

const metrics = [
  { label: 'Hydration', value: 76, color: '#34D399' },
  { label: 'Oil Balance', value: 58, color: '#FCD34D' },
  { label: 'Elasticity', value: 82, color: '#34D399' },
  { label: 'Pigmentation', value: 45, color: '#F87171' },
  { label: 'Texture', value: 69, color: '#FCD34D' },
];

export default function InsightsTab() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <BarChart2 size={22} color="#34D399" />
        <Text style={styles.heading}>Skin Insights</Text>
      </View>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sub}>Based on your latest scan · April 24</Text>

        {/* Trend banner */}
        <View style={styles.trendCard}>
          <TrendingUp size={20} color="#34D399" />
          <View style={{ flex: 1 }}>
            <Text style={styles.trendTitle}>Skin improving!</Text>
            <Text style={styles.trendSub}>Your hydration score rose +8 pts this week.</Text>
          </View>
        </View>

        {/* Metric bars */}
        <Text style={styles.sectionLabel}>Skin Metrics</Text>
        {metrics.map((m) => (
          <View key={m.label} style={styles.metricRow}>
            <Text style={styles.metricLabel}>{m.label}</Text>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${m.value}%`, backgroundColor: m.color }]} />
            </View>
            <Text style={[styles.metricVal, { color: m.color }]}>{m.value}%</Text>
          </View>
        ))}
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
  sub: { fontFamily: AppTypography.regular, fontSize: 12, color: '#6EE7B7', marginBottom: 20 },
  trendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(52,211,153,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(52,211,153,0.25)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
  },
  trendTitle: { fontFamily: AppTypography.semibold, fontSize: 14, color: '#ECFDF5' },
  trendSub: { fontFamily: AppTypography.regular, fontSize: 12, color: '#6EE7B7', marginTop: 2 },
  sectionLabel: { fontFamily: AppTypography.semibold, fontSize: 15, color: '#ECFDF5', marginBottom: 14 },
  metricRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  metricLabel: { fontFamily: AppTypography.medium, fontSize: 13, color: '#A7F3D0', width: 100 },
  barBg: { flex: 1, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.07)', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
  metricVal: { fontFamily: AppTypography.semibold, fontSize: 13, width: 40, textAlign: 'right' },
});
