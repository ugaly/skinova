import { useLocalSearchParams, useRouter } from 'expo-router';
import { CalendarCheck2, ChevronLeft, Clock3, Video } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

import { AppTypography } from '@/constants/design';
import { getDermatologistById } from '@/src/data/dermatologists';

const UPCOMING = [
  { id: 'u1', date: '2026-05-04', time: '10:00', status: 'Confirmed', mode: 'Video' },
  { id: 'u2', date: '2026-05-11', time: '14:30', status: 'Pending', mode: 'Video' },
];

const HISTORY = [
  { id: 'h1', date: '2026-04-21', time: '09:30', notes: 'Routine acne follow-up completed.' },
  { id: 'h2', date: '2026-04-02', time: '11:15', notes: 'Skin barrier plan reviewed with improvements.' },
];

export default function AppointmentHistoryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { doctorId } = useLocalSearchParams<{ doctorId?: string }>();
  const doctor = getDermatologistById(doctorId);
  const [tab, setTab] = useState<'upcoming' | 'history'>('upcoming');

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 20 }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ChevronLeft size={20} color="#065F46" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Schedule & History</Text>
          <View style={{ width: 42 }} />
        </View>

        <View style={styles.docCard}>
          <Text style={styles.docLabel}>Doctor</Text>
          <Text style={styles.docName}>{doctor?.name ?? 'Dermatologist'}</Text>
          <Text style={styles.docSub}>Track upcoming appointments and visit timeline.</Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tabBtn, tab === 'upcoming' && styles.tabBtnActive]} onPress={() => setTab('upcoming')}>
            <Text style={[styles.tabTxt, tab === 'upcoming' && styles.tabTxtActive]}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabBtn, tab === 'history' && styles.tabBtnActive]} onPress={() => setTab('history')}>
            <Text style={[styles.tabTxt, tab === 'history' && styles.tabTxtActive]}>History</Text>
          </TouchableOpacity>
        </View>

        {tab === 'upcoming' ? (
          <View style={styles.timelineWrap}>
            {UPCOMING.map((item) => (
              <View key={item.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineLine} />
                </View>
                <View style={styles.timelineCard}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <View style={styles.rowMeta}>
                    <Clock3 size={13} color="#059669" />
                    <Text style={styles.metaText}>{item.time}</Text>
                    <Video size={13} color="#059669" />
                    <Text style={styles.metaText}>{item.mode}</Text>
                  </View>
                  <View style={styles.statusPill}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.timelineWrap}>
            {HISTORY.map((item) => (
              <View key={item.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={[styles.timelineDot, { backgroundColor: '#34D399' }]} />
                  <View style={styles.timelineLine} />
                </View>
                <View style={styles.timelineCard}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <View style={styles.rowMeta}>
                    <CalendarCheck2 size={13} color="#059669" />
                    <Text style={styles.metaText}>{item.time}</Text>
                  </View>
                  <Text style={styles.noteText}>{item.notes}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3FCF8' },
  header: { paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  backBtn: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E9FAF1' },
  headerTitle: { fontFamily: AppTypography.bold, fontSize: 18, color: '#0E3528' },
  docCard: {
    marginHorizontal: 18,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.12)',
    marginBottom: 12,
  },
  docLabel: { fontFamily: AppTypography.semibold, color: '#10B981', fontSize: 12 },
  docName: { fontFamily: AppTypography.bold, color: '#0C2E22', fontSize: 17, marginTop: 4 },
  docSub: { fontFamily: AppTypography.medium, color: '#6B7280', fontSize: 12.5, marginTop: 4 },
  tabs: { marginHorizontal: 18, flexDirection: 'row', gap: 8, marginBottom: 12 },
  tabBtn: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAFBF3',
  },
  tabBtnActive: { backgroundColor: '#10B981' },
  tabTxt: { fontFamily: AppTypography.bold, color: '#166534', fontSize: 13 },
  tabTxtActive: { color: '#FFFFFF' },
  timelineWrap: { marginHorizontal: 18, gap: 10 },
  timelineItem: { flexDirection: 'row', gap: 10 },
  timelineLeft: { alignItems: 'center' },
  timelineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#10B981', marginTop: 12 },
  timelineLine: { width: 2, flex: 1, backgroundColor: '#CFF5E3', marginTop: 4 },
  timelineCard: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.1)',
    padding: 12,
  },
  dateText: { fontFamily: AppTypography.bold, color: '#0F172A', fontSize: 14, marginBottom: 8 },
  rowMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  metaText: { fontFamily: AppTypography.semibold, fontSize: 12, color: '#065F46', marginRight: 6 },
  statusPill: { alignSelf: 'flex-start', borderRadius: 999, backgroundColor: '#EAFBF3', paddingHorizontal: 8, paddingVertical: 5 },
  statusText: { fontFamily: AppTypography.semibold, color: '#047857', fontSize: 11 },
  noteText: { fontFamily: AppTypography.medium, color: '#5B6A64', fontSize: 12.5, lineHeight: 18 },
});

