import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { CalendarRange, CheckCircle2, Droplets, Moon, Sparkles, Sun } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

const tasks = [
  { id: 1, label: 'Apply Cica Barrier Serum', done: true, icon: Droplets },
  { id: 2, label: 'Morning SPF routine', done: true, icon: Sun },
  { id: 3, label: 'Hydration — 2.2L water', done: false, icon: Droplets },
  { id: 4, label: 'Evening cleanser + cream', done: false, icon: Moon },
  { id: 5, label: 'Sleep 7-8 hours', done: false, icon: Moon },
];

export default function TodayTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View>
          <Text style={styles.greeting}>Good morning ✨</Text>
          <Text style={styles.heading}>Today's Routine</Text>
        </View>
        <View style={styles.scoreBadge}>
          <Sparkles size={14} color="#34D399" />
          <Text style={styles.scoreText}>78%</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}>

        {/* Skin Score Card */}
        <BlurView intensity={30} tint="dark" style={styles.heroCard}>
          <Text style={styles.heroLabel}>Overall Skin Health</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreValue}>78</Text>
            <Text style={styles.scoreUnit}>/100</Text>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: '78%' }]} />
          </View>
          <Text style={styles.heroHint}>
            Strong barrier • Mild dehydration • Minor T-zone texture
          </Text>
        </BlurView>

        {/* Daily tasks */}
        <Text style={styles.sectionLabel}>Daily Checklist</Text>
        {tasks.map((t) => {
          const Icon = t.icon;
          return (
            <TouchableOpacity
              key={t.id}
              style={[styles.taskRow, t.done && styles.taskRowDone]}
              activeOpacity={0.75}
              onPress={() => Haptics.selectionAsync()}>
              <View style={[styles.taskIconBg, t.done && styles.taskIconBgDone]}>
                <Icon size={15} color={t.done ? '#022C22' : '#34D399'} />
              </View>
              <Text style={[styles.taskLabel, t.done && styles.taskLabelDone]}>
                {t.label}
              </Text>
              {t.done && <CheckCircle2 size={18} color="#34D399" />}
            </TouchableOpacity>
          );
        })}

        {/* CTA */}
        <TouchableOpacity
          style={styles.scanCta}
          activeOpacity={0.85}
          onPress={() => router.push('/(tabs)/scan' as any)}>
          <CalendarRange size={17} color="#022C22" />
          <Text style={styles.scanCtaText}>View Full Plan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#011A12' },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  greeting: {
    fontFamily: AppTypography.regular,
    fontSize: 13,
    color: '#A7F3D0',
    marginBottom: 2,
  },
  heading: {
    fontFamily: AppTypography.bold,
    fontSize: 28,
    color: '#ECFDF5',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(52,211,153,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(52,211,153,0.35)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  scoreText: {
    fontFamily: AppTypography.bold,
    fontSize: 14,
    color: '#34D399',
  },
  scroll: { paddingHorizontal: 20, paddingTop: 4 },
  heroCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(52,211,153,0.2)',
    overflow: 'hidden',
    marginBottom: 24,
  },
  heroLabel: {
    fontFamily: AppTypography.medium,
    fontSize: 12,
    color: '#A7F3D0',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  scoreRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 6 },
  scoreValue: { fontFamily: AppTypography.bold, fontSize: 52, color: '#ECFDF5', lineHeight: 56 },
  scoreUnit: { fontFamily: AppTypography.regular, fontSize: 18, color: '#6EE7B7', marginBottom: 8, marginLeft: 4 },
  progressBg: {
    height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.08)', marginTop: 12, overflow: 'hidden',
  },
  progressFill: {
    height: '100%', borderRadius: 3, backgroundColor: '#34D399',
  },
  heroHint: {
    fontFamily: AppTypography.regular,
    fontSize: 12,
    color: '#6EE7B7',
    marginTop: 10,
  },
  sectionLabel: {
    fontFamily: AppTypography.semibold,
    fontSize: 15,
    color: '#ECFDF5',
    marginBottom: 12,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(52,211,153,0.12)',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  taskRowDone: { backgroundColor: 'rgba(52,211,153,0.07)', borderColor: 'rgba(52,211,153,0.3)' },
  taskIconBg: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(52,211,153,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  taskIconBgDone: { backgroundColor: '#34D399' },
  taskLabel: {
    flex: 1, fontFamily: AppTypography.medium, fontSize: 14, color: '#ECFDF5',
  },
  taskLabelDone: { color: '#6EE7B7', textDecorationLine: 'line-through' },
  scanCta: {
    marginTop: 8,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#34D399',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  scanCtaText: { fontFamily: AppTypography.bold, fontSize: 16, color: '#022C22' },
});
