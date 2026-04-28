import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { CalendarRange, CheckCircle2, Droplets, Moon, Sparkles, Sun, Smile, Frown, Flame, AlertCircle, Sparkle, ArrowRight, Package, ChevronRight } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useState } from 'react';

import { AppTypography } from '@/constants/design';

const MOODS = [
  { id: 'great', label: 'Great', icon: Sparkle, color: '#10B981', bg: '#D1FAE5' },
  { id: 'oily', label: 'Oily', icon: Droplets, color: '#3B82F6', bg: '#DBEAFE' },
  { id: 'dry', label: 'Dry', icon: Sun, color: '#F59E0B', bg: '#FEF3C7' },
  { id: 'sensitive', label: 'Sensitive', icon: AlertCircle, color: '#EF4444', bg: '#FEE2E2' },
  { id: 'breakouts', label: 'Breakouts', icon: Flame, color: '#8B5CF6', bg: '#EDE9FE' },
];

const TASKS = [
  { id: 1, label: 'Apply Cica Barrier Serum', done: true, icon: Droplets },
  { id: 2, label: 'Morning SPF routine', done: true, icon: Sun },
  { id: 3, label: 'Hydration — 2.2L water', done: false, icon: Droplets },
  { id: 4, label: 'Evening cleanser + cream', done: false, icon: Moon },
];

const SHELF_ITEMS = [
  { id: 's1', brand: 'The Ordinary', name: 'Niacinamide 10%', image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142', empty: false },
  { id: 's2', brand: 'Paula\'s Choice', name: '2% BHA Liquid', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331', empty: true },
  { id: 's3', brand: 'Joyce Giraud', name: 'Ultimate Sleep', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919', empty: false },
];

function generateDates() {
  const dates = [];
  const today = new Date();

  const dayOfWeek = today.getDay();
  const distToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(today);
  monday.setDate(today.getDate() + distToMonday);

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push({
      dateObj: d,
      dayNum: d.getDate(),
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      isToday: d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear(),
    });
  }
  return dates;
}

export default function TodayTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [dates] = useState(() => generateDates());
  const [selectedMood, setSelectedMood] = useState('great');
  const [tasks, setTasks] = useState(TASKS);

  const toggleTask = (id: number) => {
    Haptics.selectionAsync();
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#EDFAF3', '#F2FBF7', '#F9FEFC']}
        start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.decorCircle} />

      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View>
          <Text style={styles.greeting}>Good evening ✨</Text>
          <Text style={styles.heading}>Today's Routine</Text>
        </View>
        <TouchableOpacity style={styles.scoreBadge} activeOpacity={0.8} onPress={() => router.push('/(tabs)/scan' as any)}>
          <Sparkles size={11} color="#059669" strokeWidth={2.5} />
          <Text style={styles.scoreText}>78% Health</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>

        {/* ── Dates Row ── */}
        <View style={styles.datesContainer}>
          <View style={styles.datesBg}>
            {dates.map((d, i) => (
              <View key={i} style={[styles.dateItem, d.isToday && styles.dateItemActive]}>
                <Text style={[styles.dateNum, d.isToday && styles.dateNumActive]}>{d.dayNum}</Text>
                <Text style={[styles.dateName, d.isToday && styles.dateNameActive]}>{d.dayName}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Skin Check-in ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>How does your skin feel?</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moodScroll}>
          {MOODS.map(m => {
            const isSel = selectedMood === m.id;
            const Icon = m.icon;
            return (
              <Pressable
                key={m.id}
                onPress={() => {
                  Haptics.selectionAsync();
                  setSelectedMood(m.id);
                }}
                style={[styles.moodCard, isSel && { borderColor: m.color, backgroundColor: m.bg }]}
              >
                <View style={[styles.moodIconBg, { backgroundColor: isSel ? '#fff' : m.bg }]}>
                  <Icon size={16} color={m.color} />
                </View>
                <Text style={[styles.moodLabel, isSel && { color: m.color, fontFamily: AppTypography.bold }]}>
                  {m.label}
                </Text>
              </Pressable>
            )
          })}
        </ScrollView>

        {/* ── AI Recommendation ── */}
        <LinearGradient colors={['#10B981', '#059669']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.recommendationCard}>
          <View style={styles.recIconWrap}>
            <Sparkles size={16} color="#059669" strokeWidth={2.5} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.recTitle}>AI Recommendation</Text>
            <Text style={styles.recDesc}>Because your skin feels {MOODS.find(m => m.id === selectedMood)?.label.toLowerCase()} today, focus on hydrating serums rather than deep exfoliation.</Text>
          </View>
        </LinearGradient>

        {/* ── Daily Tasks ── */}
        <View style={[styles.sectionHeader, { marginTop: hp('3%') }]}>
          <Text style={styles.sectionTitle}>Daily Checklist</Text>
        </View>
        <View style={styles.tasksContainer}>
          {tasks.map((t) => {
            const Icon = t.icon;
            return (
              <TouchableOpacity
                key={t.id}
                style={[styles.taskRow, t.done && styles.taskRowDone]}
                activeOpacity={0.7}
                onPress={() => toggleTask(t.id)}>
                <View style={[styles.taskIconBg, t.done && styles.taskIconBgDone]}>
                  <Icon size={14} color={t.done ? '#10B981' : '#9CA3AF'} strokeWidth={t.done ? 2.5 : 2} />
                </View>
                <Text style={[styles.taskLabel, t.done && styles.taskLabelDone]}>
                  {t.label}
                </Text>
                {t.done ? (
                  <CheckCircle2 size={18} color="#10B981" />
                ) : (
                  <View style={styles.taskEmptyCircle} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── My Shelf (Owned Products) ── */}
        <View style={[styles.sectionHeader, { marginTop: hp('3.5%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 22 }]}>
          <Text style={styles.sectionTitle}>My Shelf</Text>
          <TouchableOpacity onPress={() => router.push('/my-shelf' as any)}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shelfScroll}>
          {SHELF_ITEMS.map((item) => (
            <View key={item.id} style={styles.shelfCard}>
              <View style={styles.shelfImgBox}>
                <Image source={{ uri: item.image }} style={styles.shelfImg} contentFit="contain" />
                {item.empty && (
                  <View style={styles.emptyBadge}>
                    <Text style={styles.emptyBadgeText}>Running Low</Text>
                  </View>
                )}
              </View>
              <Text style={styles.shelfBrand}>{item.brand}</Text>
              <Text style={styles.shelfName} numberOfLines={1}>{item.name}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.shelfAddCard} activeOpacity={0.7}>
            <View style={styles.shelfAddCircle}>
              <Package size={20} color="#059669" />
            </View>
            <Text style={styles.shelfAddText}>Add new</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* ── Recommended For You Banner ── */}
        <View style={styles.bannerWrapper}>
          <TouchableOpacity
            style={styles.recommendedBanner}
            activeOpacity={0.9}
            onPress={() => router.push('/recommendations' as any)}
          >
            <View style={styles.recBannerImgWrap}>
              <LinearGradient colors={['#D1FAE5', '#86EFAC', '#6EE7B7']} style={StyleSheet.absoluteFillObject} />
              <Image
                source={{ uri: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png' }}
                style={styles.recBannerImg}
                contentFit="contain"
              />
            </View>
            <View style={styles.recBannerContent}>
              <View style={styles.sparkleRow}>
                <Sparkles size={10} color="#059669" fill="#059669" />
                <Text style={styles.recBannerEyebrow}>AI CURATED</Text>
              </View>
              <Text style={styles.recBannerTitle}>Recommended for you</Text>
              <Text style={styles.recBannerDesc}>Products matched to your skin profile</Text>
            </View>
            <View style={styles.recBannerArrow}>
              <ChevronRight size={18} color="#059669" strokeWidth={3} />
            </View>
          </TouchableOpacity>
        </View>

        {/* ── My Journey Menu ── */}
        <View style={{ marginTop: 28, marginBottom: 40, paddingHorizontal: 24 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#F0FDF4',
              borderRadius: 22,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
              shadowColor: '#10B981',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.10,
              shadowRadius: 12,
              elevation: 3,
            }}
            activeOpacity={0.92}
            onPress={() => router.push('/my-journey' as any)}
          >
            <View style={{
              width: 48, height: 48, borderRadius: 16, backgroundColor: '#D1FAE5',
              alignItems: 'center', justifyContent: 'center', marginRight: 18
            }}>
              <Smile size={26} color="#10B981" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: AppTypography.bold, fontSize: 17, color: '#059669', marginBottom: 2 }}>My Journey</Text>
              <Text style={{ fontFamily: AppTypography.medium, fontSize: 13, color: '#4B5563' }}>Track your skincare progress, achievements, and milestones.</Text>
            </View>
            <ChevronRight size={22} color="#059669" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F2FBF7' },
  decorCircle: {
    position: 'absolute', width: 320, height: 320, borderRadius: 160,
    backgroundColor: '#10B981', opacity: 0.055, top: -120, right: -80,
  },

  // Header
  header: {
    paddingHorizontal: 22,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  greeting: {
    fontFamily: AppTypography.semibold,
    fontSize: 12,
    color: '#059669',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  heading: {
    fontFamily: AppTypography.bold,
    fontSize: 28,
    color: '#0A2218',
    letterSpacing: -0.6,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(5,150,105,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(5,150,105,0.15)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 4,
  },
  scoreText: {
    fontFamily: AppTypography.bold,
    fontSize: 11,
    color: '#059669',
    letterSpacing: 0.2,
  },

  // Dates
  datesContainer: {
    paddingHorizontal: wp('4.5%'),
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },
  datesBg: {
    backgroundColor: '#fff',
    borderRadius: wp('6%'),
    paddingVertical: hp('0.8%'),
    paddingHorizontal: wp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('11.5%'),
    height: hp('9%'),
    borderRadius: wp('5%'),
  },
  dateItemActive: {
    backgroundColor: '#fff',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  dateNum: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(17),
    color: '#1A3A2A',
    marginBottom: hp('0.3%'),
  },
  dateNumActive: {
    color: '#059669',
  },
  dateName: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(9.5),
    color: '#9CA3AF',
  },
  dateNameActive: {
    color: '#059669',
    fontFamily: AppTypography.bold,
  },

  // Check-in
  sectionHeader: {
    paddingHorizontal: 22,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 17,
    color: '#0A2218',
    letterSpacing: -0.3,
  },
  moodScroll: {
    paddingHorizontal: 22,
    gap: 12,
    paddingBottom: 4,
  },
  moodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: 24,
    paddingHorizontal: 8,
    paddingVertical: 6,
    paddingRight: 16,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  moodIconBg: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  moodLabel: {
    fontFamily: AppTypography.medium,
    fontSize: 13,
    color: '#1A3A2A',
  },

  // Recommendation
  recommendationCard: {
    marginHorizontal: 22,
    marginTop: hp('3%'),
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  recIconWrap: {
    width: 38, height: 38, borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
  },
  recTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  recDesc: {
    fontFamily: AppTypography.medium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
  },

  // Tasks
  tasksContainer: {
    paddingHorizontal: 22,
    gap: 8,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(16,185,129,0.06)',
    borderRadius: 20,
    padding: 14,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  taskRowDone: {
    backgroundColor: '#FAFFFE',
    borderColor: 'rgba(16,185,129,0.2)'
  },
  taskIconBg: {
    width: 34, height: 34, borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center', justifyContent: 'center',
  },
  taskIconBgDone: { backgroundColor: 'rgba(16,185,129,0.15)' },
  taskLabel: {
    flex: 1, fontFamily: AppTypography.semibold, fontSize: 13.5, color: '#1A3A2A',
  },
  taskLabelDone: { color: '#7BA898', textDecorationLine: 'line-through' },
  taskEmptyCircle: {
    width: 18, height: 18, borderRadius: 9,
    borderWidth: 1.5, borderColor: '#D1D5DB',
  },

  // Shelf
  seeAllText: {
    fontFamily: AppTypography.bold,
    fontSize: 13,
    color: '#059669',
  },
  shelfScroll: {
    paddingHorizontal: 22,
    gap: 12,
    paddingBottom: 4,
  },
  shelfCard: {
    width: 110,
  },
  shelfImgBox: {
    width: 110, height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1, borderColor: 'rgba(16,185,129,0.06)',
    shadowColor: '#059669', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
    position: 'relative',
  },
  shelfImg: {
    width: 70, height: 90,
  },
  emptyBadge: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: '#FEF2F2', borderColor: '#FCA5A5', borderWidth: 1,
    paddingHorizontal: 5, paddingVertical: 2, borderRadius: 6,
  },
  emptyBadgeText: { fontFamily: AppTypography.bold, fontSize: 8, color: '#EF4444', textTransform: 'uppercase' },
  shelfBrand: {
    fontFamily: AppTypography.bold, fontSize: 10, color: '#059669', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2,
  },
  shelfName: {
    fontFamily: AppTypography.bold, fontSize: 13, color: '#1A3A2A', lineHeight: 16,
  },
  shelfAddCard: {
    width: 110, height: 120,
    backgroundColor: 'rgba(16,185,129,0.05)',
    borderWidth: 2, borderColor: 'rgba(16,185,129,0.15)', borderStyle: 'dashed',
    borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  shelfAddCircle: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center', shadowColor: '#059669', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1,
  },
  shelfAddText: { fontFamily: AppTypography.semibold, fontSize: 12, color: '#059669' },

  // Recommended Banner
  bannerWrapper: {
    paddingHorizontal: 22,
    marginTop: hp('4%'),
  },
  recommendedBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.08)',
  },
  recBannerImgWrap: {
    width: 68,
    height: 78,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  recBannerImg: {
    width: 44,
    height: 60,
  },
  recBannerContent: {
    flex: 1,
    paddingLeft: 14,
  },
  sparkleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  recBannerEyebrow: {
    fontFamily: AppTypography.bold,
    fontSize: 9,
    color: '#059669',
    letterSpacing: 1,
  },
  recBannerTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 16,
    color: '#1A3A2A',
    marginBottom: 3,
  },
  recBannerDesc: {
    fontFamily: AppTypography.medium,
    fontSize: 12,
    color: '#7BA898',
  },
  recBannerArrow: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
});
