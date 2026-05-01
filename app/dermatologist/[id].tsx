import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, DateData } from 'react-native-calendars';
import { CalendarClock, ChevronLeft, Clock3, MessageCircle, Star, Stethoscope } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';

import { AppTypography } from '@/constants/design';
import { getDermatologistById } from '@/src/data/dermatologists';

export default function DermatologistDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const doctor = getDermatologistById(id);

  const firstDate = doctor?.availability?.[0]?.date ?? new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(firstDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const slots = useMemo(() => {
    const day = doctor?.availability.find((d) => d.date === selectedDate);
    return day?.slots ?? [];
  }, [doctor, selectedDate]);

  const markedDates = useMemo(() => {
    const dates: Record<string, any> = {};
    doctor?.availability.forEach((entry) => {
      dates[entry.date] = {
        marked: true,
        dotColor: '#10B981',
      };
    });
    dates[selectedDate] = {
      ...dates[selectedDate],
      selected: true,
      selectedColor: '#10B981',
      selectedTextColor: '#fff',
    };
    return dates;
  }, [doctor, selectedDate]);

  if (!doctor) {
    return (
      <View style={[styles.screen, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ fontFamily: AppTypography.bold, fontSize: 18, color: '#0F172A' }}>Doctor not found</Text>
      </View>
    );
  }

  const bookNow = () => {
    const chosenTime = selectedTime ?? slots[0];
    if (!chosenTime) return;
    router.push(
      `/appointment-schedule?doctorId=${doctor.id}&date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(chosenTime)}` as any
    );
  };

  return (
    <View style={styles.screen}>
      <LinearGradient colors={['#EAFBF3', '#F5FCF8']} style={StyleSheet.absoluteFillObject} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: insets.bottom + 24 }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ChevronLeft size={20} color="#065F46" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dermatologist Profile</Text>
          <View style={{ width: 42 }} />
        </View>

        <View style={styles.heroCard}>
          <Image source={{ uri: doctor.image }} style={styles.heroImage} contentFit="cover" />
          <View style={{ flex: 1 }}>
            <Text style={styles.docName}>{doctor.name}</Text>
            <Text style={styles.docTitle}>{doctor.title}</Text>
            <Text style={styles.docHospital}>{doctor.hospital}</Text>
            <View style={styles.ratingRow}>
              <Star size={13} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>{doctor.rating.toFixed(1)} rating</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.ratingText}>{doctor.experienceYears} yrs</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>{doctor.about}</Text>
          <View style={styles.pillsWrap}>
            {doctor.specialties.map((specialty) => (
              <View key={specialty} style={styles.pill}>
                <Stethoscope size={11} color="#047857" />
                <Text style={styles.pillText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability Calendar</Text>
          <Calendar
            markedDates={markedDates}
            minDate={doctor.availability[0]?.date}
            maxDate={doctor.availability[doctor.availability.length - 1]?.date}
            onDayPress={(day: DateData) => {
              setSelectedDate(day.dateString);
              setSelectedTime(null);
            }}
            theme={{
              todayTextColor: '#059669',
              arrowColor: '#059669',
              textDayFontFamily: AppTypography.medium,
              textMonthFontFamily: AppTypography.bold,
              textDayHeaderFontFamily: AppTypography.semibold,
            }}
            style={styles.calendar}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.slotHeader}>
            <Text style={styles.sectionTitle}>Timeline Slots</Text>
            <View style={styles.nextAvail}>
              <CalendarClock size={12} color="#059669" />
              <Text style={styles.nextAvailText}>{doctor.nextAvailable}</Text>
            </View>
          </View>
          <View style={styles.slotWrap}>
            {slots.map((slot) => {
              const active = selectedTime === slot;
              return (
                <TouchableOpacity
                  key={slot}
                  onPress={() => setSelectedTime(slot)}
                  style={[styles.slotChip, active && styles.slotChipActive]}
                >
                  <Clock3 size={12} color={active ? '#FFFFFF' : '#047857'} />
                  <Text style={[styles.slotText, active && styles.slotTextActive]}>{slot}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={() => router.push(`/dermatology-chat?doctorId=${doctor.id}` as any)}
          >
            <MessageCircle size={16} color="#059669" />
            <Text style={styles.secondaryActionText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={() => router.push(`/appointment-history?doctorId=${doctor.id}` as any)}
          >
            <CalendarClock size={16} color="#059669" />
            <Text style={styles.secondaryActionText}>History</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.bookBtn} onPress={bookNow} activeOpacity={0.9}>
          <Text style={styles.bookBtnText}>
            Book Appointment {selectedTime ? `• ${selectedTime}` : ''}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4FCF8' },
  header: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9FAF1',
  },
  headerTitle: { fontFamily: AppTypography.bold, fontSize: 18, color: '#0E3528' },
  heroCard: {
    marginHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.1)',
  },
  heroImage: { width: 98, height: 120, borderRadius: 14, backgroundColor: '#DCFCE7' },
  docName: { fontFamily: AppTypography.bold, fontSize: 17, color: '#0B2E21', marginBottom: 3 },
  docTitle: { fontFamily: AppTypography.semibold, fontSize: 13, color: '#059669', marginBottom: 2 },
  docHospital: { fontFamily: AppTypography.medium, fontSize: 12, color: '#667085', marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  ratingText: { fontFamily: AppTypography.semibold, fontSize: 11.5, color: '#166534' },
  dot: { fontFamily: AppTypography.bold, color: '#9CA3AF' },
  section: {
    marginHorizontal: 18,
    marginTop: 14,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.09)',
  },
  sectionTitle: { fontFamily: AppTypography.bold, fontSize: 16, color: '#0A2D22', marginBottom: 8 },
  aboutText: { fontFamily: AppTypography.medium, fontSize: 13, color: '#4B6359', lineHeight: 19 },
  pillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#EBFAF2',
  },
  pillText: { fontFamily: AppTypography.semibold, fontSize: 11, color: '#047857' },
  calendar: { borderRadius: 12, overflow: 'hidden' },
  slotHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  nextAvail: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  nextAvailText: { fontFamily: AppTypography.semibold, fontSize: 11, color: '#059669' },
  slotWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slotChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    backgroundColor: '#F0FDF4',
  },
  slotChipActive: { backgroundColor: '#10B981', borderColor: '#10B981' },
  slotText: { fontFamily: AppTypography.semibold, color: '#047857', fontSize: 12 },
  slotTextActive: { color: '#fff' },
  actions: { marginHorizontal: 18, marginTop: 14, flexDirection: 'row', gap: 10 },
  secondaryAction: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.2)',
    backgroundColor: '#EDFAF3',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    height: 46,
  },
  secondaryActionText: { fontFamily: AppTypography.bold, color: '#059669', fontSize: 13 },
  bookBtn: {
    marginHorizontal: 18,
    marginTop: 12,
    borderRadius: 16,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 4,
  },
  bookBtnText: { fontFamily: AppTypography.bold, color: '#fff', fontSize: 15 },
});

