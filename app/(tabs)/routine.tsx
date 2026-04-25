import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { ChevronLeft, Calendar, Share2, MoreHorizontal, Bell, CheckCircle2, Droplets, Moon, Sparkles, MessageSquare, ArrowRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

import { AppTypography } from '@/constants/design';

const getWeekDays = () => {
  const startOfWeek = new Date();
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  const monday = new Date(startOfWeek.setDate(diff));

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      id: i,
      day: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      date: d.getDate().toString().padStart(2, '0'),
      fullDate: d.toLocaleDateString('en-US', { weekday: 'long', day: '2-digit' }),
      isToday: d.toDateString() === new Date().toDateString()
    };
  });
};

const DAYS = getWeekDays();

const ROUTINE_ITEMS = [
  // ... (previous items)
  { id: 1, time: '8:00', period: 'AM', title: 'Tatcha The Water Cream', image: 'https://i.pinimg.com/736x/54/b9/78/54b978a3378725a86974d85b2361915f.jpg', color: '#E0F3FF', description: 'Cleanse & Hydrate' },
  { id: 2, time: '9:30', period: 'AM', title: 'Embryolisse Lait-Crème', image: 'https://i.pinimg.com/736x/6b/61/2c/6b612cbb2fa0770e6bde590f78e64e1a.jpg', color: '#FFF9E6', description: 'Nourish & Protect' },
  { id: 3, time: '1:00', period: 'PM', title: 'Lala Retro Whipped', image: 'https://i.pinimg.com/736x/b2/f5/e3/b2f5e303366405c08f0aa18b94fb97c9.jpg', color: '#F5EFFF', description: 'Barrier Repair' },
  { id: 4, time: '4:30', period: 'PM', title: 'Soft Creme/Mask', image: 'https://i.pinimg.com/1200x/4c/35/be/4c35be9301ba18cd78f5e2b36b7a5d0e.jpg', color: '#FFEAEE', description: 'Deep Overnight Mask' }
];

const DAILY_TASKS = [
  { id: 1, label: 'Drink 2.5L of Water', done: true, icon: Droplets },
  { id: 2, label: '30 min Morning Exercise', done: false, icon: Sparkles },
  { id: 3, label: 'Evening Facial Massage', done: false, icon: Moon },
];

export default function RoutineTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const todayIndex = DAYS.findIndex(d => d.isToday);
  const [selectedDay, setSelectedDay] = useState(todayIndex !== -1 ? todayIndex : 0);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollRef.current && todayIndex > 2) {
      // Offset calculation: index * (chipWidth + gap)
      // wp(14.5) + wp(3.5) = wp(18)
      const offset = (todayIndex - 1.5) * (wp(18)); 
      setTimeout(() => {
        scrollRef.current?.scrollTo({ x: Math.max(0, offset), animated: true });
      }, 500);
    }
  }, [todayIndex]);

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#EDFAF3', '#F2FBF7', '#F9FEFC']}
        start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.decorCircle} />
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.iconBtn}>
            <ChevronLeft size={22} color="#0A2218" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Routine</Text>
        <TouchableOpacity style={styles.iconBtn}>
            <Calendar size={20} color="#0A2218" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Date Picker */}
        <View style={styles.datePickerContainer}>
          <ScrollView 
            ref={scrollRef}
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.dateScroll}
          >
            {DAYS.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                onPress={() => setSelectedDay(item.id)}
                style={[
                    styles.dateChip,
                    selectedDay === item.id && styles.activeDateChip
                ]}
              >
                <Text style={[styles.dayText, selectedDay === item.id && styles.activeText]}>{item.day}</Text>
                <Text style={[styles.dateText, selectedDay === item.id && styles.activeText]}>{item.date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Selected Date Header */}
        <View style={styles.sectionHeader}>
            <Text style={styles.currentDateLabel}>{DAYS[selectedDay].fullDate}</Text>
            <TouchableOpacity>
                <MoreHorizontal size={20} color="#9CA3AF" />
            </TouchableOpacity>
        </View>

        {/* Timeline */}
        <View style={styles.timelineContainer}>
            {ROUTINE_ITEMS.map((item) => (
                <View key={item.id} style={styles.timelineRow}>
                    {/* Time Column */}
                    <View style={styles.timeColumn}>
                        <Text style={styles.timeText}>{item.time}</Text>
                        <Text style={styles.periodText}>{item.period}</Text>
                    </View>

                    {/* Product Card */}
                    <TouchableOpacity 
                        style={[styles.productCard, { backgroundColor: item.color }]}
                        activeOpacity={0.9}
                        onPress={() => router.push({
                            pathname: '/routine-detail',
                            params: {
                                title: item.title,
                                image: item.image,
                                time: `${item.time} ${item.period}`
                            }
                        })}
                    >
                        <View style={styles.productImgContainer}>
                            <Image source={{ uri: item.image }} style={styles.productImg} contentFit="cover" />
                        </View>
                        <View style={styles.productInfo}>
                            <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.productDesc}>{item.description}</Text>
                        </View>
                        <TouchableOpacity style={styles.cardAction}>
                            <Bell size={16} color="#0A2218" opacity={0.4} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            ))}
        </View>

        {/* Beautiful Checklist Separator */}
        <View style={styles.separatorContainer}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>Checklist</Text>
            <View style={styles.line} />
        </View>

        {/* Daily Checklist */}
        <View style={styles.checklistContainer}>
            {DAILY_TASKS.map((task) => {
                const Icon = task.icon;
                return (
                    <TouchableOpacity key={task.id} style={[styles.taskItem, task.done && styles.taskDone]}>
                        <View style={[styles.taskIconWrap, task.done && styles.taskIconDone]}>
                            <Icon size={16} color={task.done ? '#fff' : '#059669'} />
                        </View>
                        <Text style={[styles.taskLabel, task.done && styles.taskLabelDone]}>{task.label}</Text>
                        <CheckCircle2 size={20} color={task.done ? '#059669' : '#E5E7EB'} />
                    </TouchableOpacity>
                );
            })}
        </View>

        {/* AI Daily Question Section */}
        <TouchableOpacity 
            style={styles.aiQuestionCard}
            activeOpacity={0.95}
            onPress={() => router.push('/ai-chat' as any)}
        >
            <LinearGradient colors={['#059669', '#064E3B']} style={StyleSheet.absoluteFillObject} />
            <View style={styles.aiHeader}>
                <View style={styles.botIcon}>
                    <Sparkles size={16} color="#059669" fill="#059669" />
                </View>
                <Text style={styles.aiTitle}>AI Daily Pulse</Text>
            </View>
            <Text style={styles.aiQuestion}>Do you use makeup apart from these products today?</Text>
            <View style={styles.aiFooter}>
                <Text style={styles.aiFooterText}>Tap to answer & get insight</Text>
                <ArrowRight size={16} color="#fff" opacity={0.6} />
            </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F2FBF7' },
  decorCircle: {
      position: 'absolute',
      width: 320, 
      height: 320, 
      borderRadius: 160,
      backgroundColor: '#10B981', 
      opacity: 0.055, 
      top: -120, 
      right: -80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(17),
    color: '#0A2218',
  },
  datePickerContainer: {
    marginTop: hp(1.5),
    paddingHorizontal: wp(5),
    marginBottom: hp(3),
  },
  dateScroll: {
      gap: wp(3.5),
  },
  dateChip: {
    width: wp(14.5),
    height: hp(9.5),
    borderRadius: wp(5.5),
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  activeDateChip: {
    backgroundColor: '#34D399', // Professional Green as requested
    borderColor: '#34D399',
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  dayText: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(9),
    color: '#9CA3AF',
    marginBottom: hp(0.5),
  },
  dateText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(14),
    color: '#0A2218',
  },
  activeText: {
    color: '#FFFFFF',
  },
  sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp(6),
      marginBottom: hp(2),
  },
  currentDateLabel: {
      fontFamily: AppTypography.bold,
      fontSize: RFValue(18),
      color: '#0A2218',
  },
  timelineContainer: {
      paddingHorizontal: wp(5),
  },
  timelineRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: hp(2),
      gap: wp(4),
  },
  timeColumn: {
      width: wp(12),
      alignItems: 'flex-start',
  },
  timeText: {
      fontFamily: AppTypography.bold,
      fontSize: RFValue(12),
      color: '#0A2218',
  },
  periodText: {
      fontFamily: AppTypography.medium,
      fontSize: RFValue(9),
      color: '#9CA3AF',
      marginTop: 2,
  },
  productCard: {
      flex: 1,
      height: hp(9.5),
      borderRadius: wp(5.5),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(3),
  },
  productImgContainer: {
      width: 50,
      height: 50,
      borderRadius: 15,
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
  },
  productImg: {
      width: '100%',
      height: '100%',
  },
  productInfo: {
      flex: 1,
      marginLeft: 15,
  },
  productTitle: {
      fontFamily: AppTypography.bold,
      fontSize: RFValue(13),
      color: '#0A2218',
  },
  productDesc: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(10),
    color: 'rgba(10, 34, 24, 0.4)',
    marginTop: 2,
  },
  cardAction: {
      padding: 8,
  },
  separatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      marginVertical: 24,
      gap: 15,
  },
  line: {
      flex: 1,
      height: 1,
      backgroundColor: '#E5E7EB',
  },
  separatorText: {
      fontFamily: AppTypography.bold,
      fontSize: RFValue(10),
      color: '#9CA3AF',
      letterSpacing: 2,
      textTransform: 'uppercase',
  },
  checklistContainer: {
      paddingHorizontal: 24,
      gap: 10,
      marginBottom: 30,
  },
  taskItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 14,
      backgroundColor: '#fff',
      borderRadius: 18,
      borderWidth: 1,
      borderColor: '#F3F4F6',
  },
  taskDone: {
      backgroundColor: '#F9FEFC',
      borderColor: 'rgba(5, 150, 105, 0.1)',
  },
  taskIconWrap: {
      width: 32,
      height: 32,
      borderRadius: 10,
      backgroundColor: 'rgba(5, 150, 105, 0.08)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
  },
  taskIconDone: {
      backgroundColor: '#059669',
  },
  taskLabel: {
      flex: 1,
      fontFamily: AppTypography.semibold,
      fontSize: RFValue(12),
      color: '#0A2218',
  },
  taskLabelDone: {
      color: '#9CA3AF',
      textDecorationLine: 'line-through',
  },
  aiQuestionCard: {
      marginHorizontal: 24,
      marginBottom: 40,
      padding: 20,
      borderRadius: 24,
      overflow: 'hidden',
      shadowColor: '#059669',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 15,
      elevation: 5,
  },
  aiHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 12,
  },
  botIcon: {
      width: 32,
      height: 32,
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
  },
  aiTitle: {
      fontFamily: AppTypography.bold,
      fontSize: RFValue(12),
      color: '#FFFFFF',
      opacity: 0.9,
  },
  aiQuestion: {
      fontFamily: AppTypography.bold,
      fontSize: RFValue(16),
      color: '#FFFFFF',
      lineHeight: 24,
      marginBottom: 15,
  },
  aiFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: 'rgba(255,255,255,0.1)',
      paddingTop: 12,
  },
  aiFooterText: {
      fontFamily: AppTypography.semibold,
      fontSize: RFValue(11),
      color: '#FFFFFF',
      opacity: 0.7,
  }
});
