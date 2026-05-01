import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { CalendarClock, ChevronLeft, ChevronRight, MessageCircle, ShieldCheck, Star } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';
import { DERMATOLOGISTS } from '@/src/data/dermatologists';

export default function DermatologistsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#EAFBF3', '#F3FCF8', '#FCFFFD']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={[styles.fixedHeader, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={20} color="#065F46" />
        </TouchableOpacity>
        <Text style={styles.fixedHeaderTitle}>Meet Our Dermatologists</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 72, paddingBottom: insets.bottom + 30 }}
      >
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>PRO CARE</Text>
          <Text style={styles.heroTitle}>Meet Our Dermatologists</Text>
          <Text style={styles.heroSubtitle}>
            Board-certified skin experts with live availability, same-week appointments, and personalized treatment plans.
          </Text>
          <View style={styles.heroBadges}>
            <View style={styles.badge}>
              <ShieldCheck size={14} color="#047857" />
              <Text style={styles.badgeText}>Verified specialists</Text>
            </View>
            <View style={styles.badge}>
              <CalendarClock size={14} color="#047857" />
              <Text style={styles.badgeText}>Live schedules</Text>
            </View>
          </View>
        </View>

        <View style={styles.listWrapper}>
          {DERMATOLOGISTS.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              activeOpacity={0.92}
              style={styles.card}
              onPress={() => router.push(`/dermatologist/${doctor.id}` as any)}
            >
              <Image source={{ uri: doctor.image }} style={styles.avatar} contentFit="cover" />
              <View style={{ flex: 1 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.name}>{doctor.name}</Text>
                  <View style={styles.ratingWrap}>
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.rating}>{doctor.rating.toFixed(1)}</Text>
                  </View>
                </View>
                <Text style={styles.title}>{doctor.title}</Text>
                <Text style={styles.hospital}>{doctor.hospital}</Text>

                <View style={styles.metaRow}>
                  <Text style={styles.metaPill}>{doctor.experienceYears} yrs</Text>
                  <Text style={styles.metaPill}>{doctor.patients} patients</Text>
                  <Text style={styles.metaPill}>${doctor.priceUsd} consult</Text>
                </View>

                <View style={styles.footerRow}>
                  <Text style={styles.availability}>Next: {doctor.nextAvailable}</Text>
                  <View style={styles.openProfile}>
                    <MessageCircle size={13} color="#059669" />
                    <ChevronRight size={15} color="#059669" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4FCF8' },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 30,
    paddingHorizontal: 18,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(243,252,248,0.96)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16,185,129,0.12)',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8FAF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedHeaderTitle: {
    fontFamily: AppTypography.bold,
    color: '#0D2B20',
    fontSize: 17,
  },
  hero: { paddingHorizontal: 22, marginBottom: 14 },
  heroEyebrow: {
    fontFamily: AppTypography.bold,
    color: '#059669',
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: AppTypography.bold,
    color: '#0A2A1E',
    fontSize: 32,
    lineHeight: 36,
    marginBottom: 10,
    letterSpacing: -0.6,
  },
  heroSubtitle: {
    fontFamily: AppTypography.medium,
    color: '#4E6E62',
    fontSize: 14,
    lineHeight: 20,
  },
  heroBadges: { flexDirection: 'row', gap: 10, marginTop: 14 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#E7F9EF',
    borderWidth: 1,
    borderColor: 'rgba(5,150,105,0.16)',
  },
  badgeText: { fontFamily: AppTypography.semibold, color: '#047857', fontSize: 11.5 },
  listWrapper: { paddingHorizontal: 18, gap: 12 },
  card: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: 20,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.1)',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  avatar: { width: 88, height: 100, borderRadius: 14, backgroundColor: '#D1FAE5' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { fontFamily: AppTypography.bold, fontSize: 15, color: '#0D2B20', flex: 1, marginRight: 6 },
  ratingWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontFamily: AppTypography.bold, color: '#A16207', fontSize: 12 },
  title: { fontFamily: AppTypography.semibold, color: '#0F6A4C', fontSize: 12.5, marginTop: 3 },
  hospital: { fontFamily: AppTypography.medium, color: '#6B7280', fontSize: 11.5, marginTop: 2 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  metaPill: {
    fontFamily: AppTypography.semibold,
    color: '#226C53',
    fontSize: 10.5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#EDFAF3',
  },
  footerRow: { marginTop: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  availability: { fontFamily: AppTypography.bold, color: '#059669', fontSize: 11.5 },
  openProfile: { flexDirection: 'row', alignItems: 'center', gap: 2 },
});

