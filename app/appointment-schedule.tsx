import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, DateData } from 'react-native-calendars';
import { CheckCircle2, ChevronLeft, Clock3, Video } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';

import { AppTypography } from '@/constants/design';
import { getDermatologistById } from '@/src/data/dermatologists';

export default function AppointmentScheduleScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { doctorId, date, time } = useLocalSearchParams<{ doctorId?: string; date?: string; time?: string }>();
  const doctor = getDermatologistById(doctorId);

  const initialDate = date ?? doctor?.availability[0]?.date ?? new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(time ?? '');
  const [confirmed, setConfirmed] = useState(false);

  const slots = useMemo(() => {
    const day = doctor?.availability.find((d) => d.date === selectedDate);
    return day?.slots ?? [];
  }, [doctor, selectedDate]);

  const marks = useMemo(() => {
    const m: Record<string, any> = {};
    doctor?.availability.forEach((entry) => {
      m[entry.date] = { marked: true, dotColor: '#10B981' };
    });
    m[selectedDate] = { ...m[selectedDate], selected: true, selectedColor: '#10B981', selectedTextColor: '#fff' };
    return m;
  }, [doctor, selectedDate]);

  if (!doctor) {
    return (
      <View style={[styles.screen, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={styles.notFound}>Doctor not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: insets.bottom + 20 }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ChevronLeft size={20} color="#065F46" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Schedule Appointment</Text>
          <View style={{ width: 42 }} />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Selected Specialist</Text>
          <Text style={styles.value}>{doctor.name}</Text>
          <Text style={styles.subValue}>{doctor.title}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Choose Date</Text>
          <Calendar
            markedDates={marks}
            minDate={doctor.availability[0]?.date}
            maxDate={doctor.availability[doctor.availability.length - 1]?.date}
            onDayPress={(d: DateData) => setSelectedDate(d.dateString)}
            theme={{
              todayTextColor: '#059669',
              arrowColor: '#059669',
              textDayFontFamily: AppTypography.medium,
              textMonthFontFamily: AppTypography.bold,
              textDayHeaderFontFamily: AppTypography.semibold,
            }}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Available Time Timeline</Text>
          <View style={styles.slotWrap}>
            {slots.map((slot) => {
              const active = selectedTime === slot;
              return (
                <TouchableOpacity key={slot} onPress={() => setSelectedTime(slot)} style={[styles.slot, active && styles.slotActive]}>
                  <Clock3 size={12} color={active ? '#fff' : '#047857'} />
                  <Text style={[styles.slotText, active && styles.slotTextActive]}>{slot}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Consultation Type</Text>
          <View style={styles.consultType}>
            <Video size={14} color="#059669" />
            <Text style={styles.consultText}>Video Consultation • ${doctor.priceUsd}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.confirmBtn, !selectedTime && { opacity: 0.5 }]}
          disabled={!selectedTime}
          onPress={() => {
            setConfirmed(true);
            setTimeout(() => router.push(`/appointment-history?doctorId=${doctor.id}` as any), 1200);
          }}
        >
          <Text style={styles.confirmText}>{confirmed ? 'Appointment Confirmed' : 'Confirm Booking'}</Text>
        </TouchableOpacity>
      </ScrollView>

      {confirmed && (
        <View style={[styles.toast, { bottom: insets.bottom + 16 }]}>
          <CheckCircle2 size={16} color="#fff" />
          <Text style={styles.toastText}>Booked for {selectedDate} at {selectedTime}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3FCF8' },
  notFound: { fontFamily: AppTypography.bold, fontSize: 18, color: '#0F172A' },
  header: { paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  backBtn: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E9FAF1' },
  headerTitle: { fontFamily: AppTypography.bold, fontSize: 18, color: '#0E3528' },
  card: {
    marginHorizontal: 18,
    marginBottom: 12,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.1)',
    padding: 14,
  },
  label: { fontFamily: AppTypography.semibold, fontSize: 12, color: '#059669', marginBottom: 4 },
  value: { fontFamily: AppTypography.bold, fontSize: 17, color: '#0D2B20' },
  subValue: { fontFamily: AppTypography.medium, fontSize: 13, color: '#6B7280', marginTop: 2 },
  sectionTitle: { fontFamily: AppTypography.bold, fontSize: 15, color: '#102A21', marginBottom: 10 },
  slotWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    backgroundColor: '#ECFDF5',
  },
  slotActive: { backgroundColor: '#10B981', borderColor: '#10B981' },
  slotText: { fontFamily: AppTypography.semibold, color: '#047857', fontSize: 11.5 },
  slotTextActive: { color: '#fff' },
  consultType: {
    borderRadius: 12,
    backgroundColor: '#EBFAF2',
    padding: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  consultText: { fontFamily: AppTypography.semibold, color: '#065F46', fontSize: 13 },
  confirmBtn: {
    marginHorizontal: 18,
    marginTop: 4,
    borderRadius: 16,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
  },
  confirmText: { fontFamily: AppTypography.bold, color: '#fff', fontSize: 15 },
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(5,150,105,0.95)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  toastText: { fontFamily: AppTypography.semibold, color: '#fff', fontSize: 12.5 },
});

