
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { Smile, CheckCircle2, Star, ChevronRight, Droplets } from 'lucide-react-native';
import { AppTypography } from '@/constants/design';

const { width } = Dimensions.get('window');

const JOURNEY_STEPS = [
  {
    id: 1,
    title: 'Joined Skin Journey',
    desc: 'Welcome! You started your skincare journey.',
    date: '2024-01-10',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    Icon: Smile,
    color: '#10B981',
  },
  {
    id: 2,
    title: 'First Routine Completed',
    desc: 'You finished your first daily routine! Consistency is key.',
    date: '2024-01-12',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    Icon: CheckCircle2,
    color: '#6366F1',
  },
  {
    id: 3,
    title: 'Skin Condition Improved',
    desc: 'Your skin hydration improved by 15%.',
    date: '2024-02-01',
    image: 'https://randomuser.me/api/portraits/women/46.jpg',
    Icon: Droplets,
    color: '#0EA5E9',
  },
  {
    id: 4,
    title: 'Milestone: 30 Days',
    desc: '30 days of healthy skin habits!',
    date: '2024-02-10',
    image: 'https://randomuser.me/api/portraits/women/47.jpg',
    Icon: Star,
    color: '#F59E0B',
  },
  {
    id: 5,
    title: 'Community Joined',
    desc: 'You joined the skincare community.',
    date: '2024-03-01',
    image: 'https://randomuser.me/api/portraits/women/48.jpg',
    Icon: ChevronRight,
    color: '#A21CAF',
  },
];



export default function MyJourneyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const progress = JOURNEY_STEPS.length / 6; // Assume 6 is max for demo

  // Calculate header top padding
  const headerTop = (insets?.top || 0) + 12;

  return (
    <LinearGradient colors={["#F0FDF4", "#F9FAFB"]} style={styles.bg}>
      {/* Fixed Header with Back Button */}
      <View style={[styles.fixedHeader, { paddingTop: headerTop, height: headerTop + 48 }]}> 
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} hitSlop={{top:10, left:10, right:10, bottom:10}}>
          <ChevronRight size={26} color="#059669" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text style={styles.fixedHeaderTitle}>My Journey</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Card */}
        <LinearGradient colors={["#10B981", "#059669"]} style={styles.headerCard}>
          <Text style={styles.headerTitle}>My Skin Journey</Text>
          <Text style={styles.headerSubtitle}>Track your progress, milestones, and skin improvements over time.</Text>
          {/* Progress Bar */}
          <View style={styles.progressBarWrap}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
        </LinearGradient>

        {/* Timeline */}
        <View style={styles.timelineWrap}>
          {[...JOURNEY_STEPS].reverse().map((step, idx, arr) => (
            <View key={step.id} style={styles.stepRow}>
              <View style={styles.stepLeft}>
                <LinearGradient colors={[step.color + '99', step.color]} style={styles.badgeCirclePro}>
                  <step.Icon size={22} color={'#fff'} />
                </LinearGradient>
                {idx < arr.length - 1 && <View style={styles.verticalLine} />}
              </View>
              <View style={styles.stepContentPro}>
                <View style={styles.stepHeader}>
                  <Image source={{ uri: step.image }} style={styles.stepImgPro} />
                  <Text style={styles.stepTitlePro}>{step.title}</Text>
                </View>
                <Text style={styles.stepDescPro}>{step.desc}</Text>
                <Text style={styles.stepDatePro}>{step.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Community Button */}
        <TouchableOpacity style={styles.communityBtnPro} activeOpacity={0.85}>
          <LinearGradient colors={["#10B981", "#059669"]} style={styles.communityBtnGradient}>
            <Star size={18} color="#fff" />
            <Text style={styles.communityBtnTextPro}>Join Community</Text>
            <ChevronRight size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  fixedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingTop and height set dynamically
    paddingBottom: 10,
    paddingHorizontal: 18,
    backgroundColor: '#F0FDF4',
    borderBottomWidth: 1,
    borderBottomColor: '#E0F2FE',
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F2FE',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  fixedHeaderTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(18),
    color: '#059669',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  container: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 32) + 80 : 112,
    paddingBottom: 40,
    paddingHorizontal: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  headerCard: {
    width: width - 32,
    alignSelf: 'center',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginTop: 36,
    marginBottom: 28,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 16,
    elevation: 4,
  },
  headerTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(26),
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(14),
    color: '#D1FAE5',
    marginBottom: 18,
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  progressBarWrap: {
    width: '100%',
    height: 8,
    backgroundColor: '#A7F3D0',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  timelineWrap: {
    width: width - 32,
    alignSelf: 'center',
    marginBottom: 36,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  stepLeft: {
    alignItems: 'center',
    width: 36,
  },
  badgeCirclePro: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  verticalLine: {
    width: 3,
    flex: 1,
    backgroundColor: '#A7F3D0',
    marginTop: 2,
    borderRadius: 2,
  },
  stepContentPro: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginLeft: 10,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#F0FDF4',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepImgPro: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  stepTitlePro: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(16),
    color: '#059669',
    letterSpacing: 0.2,
  },
  stepDescPro: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(13),
    color: '#374151',
    marginBottom: 6,
    letterSpacing: 0.1,
  },
  stepDatePro: {
    fontFamily: AppTypography.regular,
    fontSize: RFValue(11),
    color: '#9CA3AF',
    textAlign: 'right',
  },
  communityBtnPro: {
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 2,
  },
  communityBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    gap: 12,
    borderRadius: 22,
  },
  communityBtnTextPro: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(16),
    color: '#fff',
    letterSpacing: 0.2,
  },
});
