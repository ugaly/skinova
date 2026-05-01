import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ArrowRight,
  CalendarClock,
  Camera,
  MessageCircle,
  Search,
  Sparkles,
  Stethoscope,
  ClipboardList,
  Users,
  MapPinned,
  UserRound,
} from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

const SERVICES = [
  { id: 'scan', label: 'Face Scan', icon: Camera, bg: '#DDF7EC', color: '#047857', route: '/face-scan' },
  { id: 'calendar', label: 'Calendar', icon: CalendarClock, bg: '#FFF3E0', color: '#B45309', route: '/routine-calendar', badge: '2' },
  { id: 'doctors', label: 'Doctors', icon: Stethoscope, bg: '#E4F4FF', color: '#0369A1', route: '/dermatologists' },
  { id: 'chat', label: 'Chat', icon: MessageCircle, bg: '#F3E8FF', color: '#7E22CE', route: '/chat-list', badge: '4' },
];

const ACTIVITIES = [
  { id: 'a0', title: 'Open Skin Calendar', subtitle: 'Plan routines, reminders, and daily care events', route: '/routine-calendar' },
  { id: 'a1', title: 'Meet Our Dermatologists', subtitle: 'Book live consultations with specialists', route: '/dermatologists' },
  { id: 'a2', title: 'Track Appointment Timeline', subtitle: 'See upcoming sessions and visit history', route: '/appointment-history' },
  { id: 'a3', title: 'Continue Feedback Journey', subtitle: 'Share your experience and get better care', route: '/feedback' },
  { id: 'a4', title: 'Open AI Skin Assistant', subtitle: 'Ask product and routine questions instantly', route: '/chat-list' },
  { id: 'a5', title: 'Browse Supplier Map', subtitle: 'View all suppliers and filter by product', route: '/supplier-map?title=All%20Suppliers%20%E2%80%A2%20All%20Products&source=menu&product=all' },
  { id: 'a6', title: 'Community', subtitle: 'Discover skincare stories and posts', route: '/(tabs)/community' },
  { id: 'a7', title: 'Products', subtitle: 'Explore curated skin products', route: '/(tabs)/products' },
];

const ACTIVITY_ICON_BY_ID = {
  a0: CalendarClock,
  a1: Stethoscope,
  a2: ClipboardList,
  a3: Sparkles,
  a4: MessageCircle,
  a5: MapPinned,
  a6: Users,
  a7: Sparkles,
} as const;

export default function MenuTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#EDFAF3', '#F3FCF8', '#FAFEFC']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: insets.bottom + 95 }}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello!</Text>
            <Text style={styles.heading}>Activity Menu</Text>
          </View>
          <View style={styles.avatarCircle}>
            <UserRound size={20} color="#047857" />
          </View>
        </View>

        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.85}
          onPress={() => router.push('/search' as any)}
        >
          <Search size={16} color="#86A89A" />
          <Text style={styles.searchText}>Search activities...</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.serviceGrid}>
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceItem}
                  activeOpacity={0.85}
                  onPress={() => router.push(service.route as any)}
                >
                  <View style={[styles.serviceIcon, { backgroundColor: service.bg }]}>
                    <Icon size={20} color={service.color} />
                    {service.badge ? (
                      <View style={styles.serviceBadge}>
                        <Text style={styles.serviceBadgeText}>{service.badge}</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.serviceLabel}>{service.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.heroWrap}>
          <LinearGradient colors={['#C7F0E4', '#9EE3CE']} style={styles.heroCard}>
            <View style={styles.heroCircleBig} />
            <View style={styles.heroCircleSmall} />
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>Get the Best Dermatology Services</Text>
              <Text style={styles.heroDesc}>Discover top skin experts, schedule fast, and track your full care journey.</Text>
              <TouchableOpacity style={styles.heroButton} onPress={() => router.push('/dermatologists' as any)}>
                <Sparkles size={13} color="#FFFFFF" />
                <Text style={styles.heroButtonText}>Explore doctors</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Activities</Text>
          <View style={styles.activityGrid}>
            {ACTIVITIES.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.activityIconCard}
                activeOpacity={0.92}
                onPress={() => router.push(item.route as any)}
              >
                <View style={styles.activityIconWrap}>
                  {(() => {
                    const Icon = ACTIVITY_ICON_BY_ID[item.id as keyof typeof ACTIVITY_ICON_BY_ID] || Sparkles;
                    return <Icon size={18} color="#059669" />;
                  })()}
                </View>
                <Text style={styles.activityIconTitle} numberOfLines={2}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Previous version (kept for later use)
          <View style={styles.activityList}>
            {ACTIVITIES.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.activityCard}
                activeOpacity={0.92}
                onPress={() => router.push(item.route as any)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
                </View>
                <ArrowRight size={18} color="#059669" />
              </TouchableOpacity>
            ))}
          </View>
          */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3FCF8' },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  greeting: { fontFamily: AppTypography.semibold, color: '#16A34A', fontSize: 13, marginBottom: 2 },
  heading: { fontFamily: AppTypography.bold, color: '#0A2A1E', fontSize: 30, letterSpacing: -0.7 },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(5,150,105,0.14)',
  },
  searchBar: {
    marginHorizontal: 20,
    height: 50,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    backgroundColor: '#F3F4F6',
    marginBottom: 18,
  },
  searchText: { fontFamily: AppTypography.medium, color: '#9CA3AF', fontSize: 14 },
  section: { paddingHorizontal: 20, marginBottom: 18 },
  sectionTitle: { fontFamily: AppTypography.bold, fontSize: 17, color: '#0F2E23', marginBottom: 12 },
  serviceGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  serviceItem: { alignItems: 'center', width: '23%' },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    position: 'relative',
  },
  serviceBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  serviceBadgeText: {
    fontFamily: AppTypography.bold,
    color: '#FFFFFF',
    fontSize: 10,
  },
  serviceLabel: {
    fontFamily: AppTypography.semibold,
    color: '#4B6359',
    fontSize: 11,
    textAlign: 'center',
  },
  heroWrap: { paddingHorizontal: 20, marginBottom: 20 },
  heroCard: {
    borderRadius: 24,
    padding: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.62)',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 5,
  },
  heroCircleBig: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.2)',
    right: -60,
    top: -40,
  },
  heroCircleSmall: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.26)',
    right: 20,
    bottom: -28,
  },
  heroTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 30,
    lineHeight: 34,
    color: '#0A2B20',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  heroDesc: {
    fontFamily: AppTypography.medium,
    fontSize: 13,
    lineHeight: 19,
    color: '#3A6A58',
    marginBottom: 14,
    paddingRight: 58,
  },
  heroButton: {
    alignSelf: 'flex-start',
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  heroButtonText: { fontFamily: AppTypography.bold, color: '#fff', fontSize: 12.5 },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  activityIconCard: {
    width: '31%',
    minHeight: 108,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.1)',
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
  activityIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activityIconTitle: {
    fontFamily: AppTypography.semibold,
    fontSize: 11.5,
    color: '#0F2E23',
    textAlign: 'center',
    lineHeight: 15,
  },

  // Previous All Activities styles (kept commented above for future toggle)
  // activityList: { gap: 10 },
  // activityCard: {
  //   borderRadius: 18,
  //   backgroundColor: '#FFFFFF',
  //   borderWidth: 1,
  //   borderColor: 'rgba(16,185,129,0.1)',
  //   padding: 14,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 10,
  //   shadowColor: '#059669',
  //   shadowOffset: { width: 0, height: 6 },
  //   shadowOpacity: 0.07,
  //   shadowRadius: 12,
  //   elevation: 2,
  // },
  // activityTitle: { fontFamily: AppTypography.bold, fontSize: 14.5, color: '#0C2B21', marginBottom: 2 },
  // activitySubtitle: { fontFamily: AppTypography.medium, fontSize: 12, color: '#6A8278', lineHeight: 17 },
});
