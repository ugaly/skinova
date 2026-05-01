// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
// import { useNavigation } from '@react-navigation/native';
// import { AppTypography } from '@/constants/design';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { X } from 'lucide-react-native';

// // Example events for the calendar
// const events = {
//   '2026-04-27': [{ name: 'Morning Routine', type: 'routine' }],
//   '2026-04-28': [{ name: 'Product Restock', type: 'reminder' }],
//   '2026-04-29': [{ name: 'Skin Analysis', type: 'event' }],
// };

// export default function RoutineCalendarScreen({ navigation }) {
//   const [selected, setSelected] = React.useState('2026-04-27');

//   const renderEvents = (date) => {
//     const dayEvents = events[date] || [];
//     return dayEvents.map((event, idx) => (
//       <View key={idx} style={styles.eventCard}>
//         <Text style={styles.eventName}>{event.name}</Text>
//         <Text style={styles.eventType}>{event.type}</Text>
//       </View>
//     ));
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Calendar</Text>
//         <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
//           <X size={22} color="#111827" />
//         </TouchableOpacity>
//       </View>
//       <Calendar
//         style={styles.calendar}
//         theme={{
//           backgroundColor: '#fff',
//           calendarBackground: '#fff',
//           textSectionTitleColor: '#22C55E',
//           selectedDayBackgroundColor: '#22C55E',
//           selectedDayTextColor: '#fff',
//           todayTextColor: '#22C55E',
//           dayTextColor: '#111827',
//           textDisabledColor: '#d9e1e8',
//           arrowColor: '#22C55E',
//           monthTextColor: '#22C55E',
//           textDayFontFamily: AppTypography.medium,
//           textMonthFontFamily: AppTypography.bold,
//           textDayHeaderFontFamily: AppTypography.semibold,
//         }}
//         onDayPress={day => setSelected(day.dateString)}
//         markedDates={{
//           ...Object.keys(events).reduce((acc, date) => {
//             acc[date] = { marked: true, dotColor: '#22C55E' };
//             return acc;
//           }, {}),
//           [selected]: { selected: true, selectedColor: '#22C55E' },
//         }}
//       />
//       <ScrollView style={styles.eventsWrap}>
//         <Text style={styles.eventsTitle}>Events for {selected}</Text>
//         {renderEvents(selected)}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//     paddingTop: 48,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 12,
//     position: 'relative',
//   },
//   headerTitle: {
//     fontFamily: AppTypography.bold,
//     fontSize: RFValue(22),
//     color: '#22C55E',
//     textAlign: 'center',
//   },
//   closeBtn: {
//     position: 'absolute',
//     right: 24,
//     top: 0,
//     padding: 4,
//     zIndex: 10,
//   },
//   calendar: {
//     borderRadius: 18,
//     marginHorizontal: 16,
//     marginBottom: 18,
//     elevation: 2,
//     shadowColor: '#22C55E',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//   },
//   eventsWrap: {
//     flex: 1,
//     marginHorizontal: 16,
//   },
//   eventsTitle: {
//     fontFamily: AppTypography.semibold,
//     fontSize: RFValue(15),
//     color: '#111827',
//     marginBottom: 8,
//   },
//   eventCard: {
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 10,
//     shadowColor: '#22C55E',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   eventName: {
//     fontFamily: AppTypography.bold,
//     fontSize: RFValue(14),
//     color: '#22C55E',
//     marginBottom: 2,
//   },
//   eventType: {
//     fontFamily: AppTypography.medium,
//     fontSize: RFValue(12),
//     color: '#6B7280',
//   },
// });









import { useRouter } from 'expo-router';
import { Calendar, DateData } from 'react-native-calendars';
import { CalendarCheck2, CalendarDays, ChevronLeft, Clock3, Flag, Plus, Target } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

type EventType = 'to-do' | 'event' | 'reminder' | 'milestone';
type EventItem = {
  id: string;
  title: string;
  start: string;
  end: string;
  type: EventType;
};

const TYPE_COLOR: Record<EventType, string> = {
  'to-do': '#38BDF8',
  event: '#10B981',
  reminder: '#14B8A6',
  milestone: '#059669',
};

const today = new Date();
const todayKey = today.toISOString().slice(0, 10);
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const tomorrowKey = tomorrow.toISOString().slice(0, 10);

const INITIAL_EVENTS: Record<string, EventItem[]> = {
  [todayKey]: [
    { id: 't1', title: 'Website have to audit as soon as possible', start: '11:20 AM', end: '12:20 PM', type: 'to-do' },
    { id: 't2', title: 'Meeting with Client', start: '12:30 PM', end: '1:00 PM', type: 'event' },
    { id: 't3', title: 'Hydration Reminder', start: '2:00 PM', end: '2:30 PM', type: 'reminder' },
    { id: 't4', title: 'Design milestone', start: '4:20 PM', end: '5:00 PM', type: 'milestone' },
  ],
  [tomorrowKey]: [
    { id: 'n1', title: 'Morning barrier routine', start: '8:00 AM', end: '8:25 AM', type: 'to-do' },
    { id: 'n2', title: 'Dermatology follow-up call', start: '3:00 PM', end: '3:30 PM', type: 'event' },
  ],
};

export default function RoutineCalendarScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [eventsByDate, setEventsByDate] = useState<Record<string, EventItem[]>>(INITIAL_EVENTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState('09:00 AM');
  const [eventEnd, setEventEnd] = useState('09:30 AM');
  const [eventType, setEventType] = useState<EventType>('to-do');

  const selectedEvents = eventsByDate[selectedDate] ?? [];

  const markedDates = useMemo(() => {
    const map: Record<string, any> = {};
    Object.keys(eventsByDate).forEach((date) => {
      const firstType = eventsByDate[date]?.[0]?.type ?? 'event';
      map[date] = {
        marked: true,
        dotColor: TYPE_COLOR[firstType],
      };
    });
    map[selectedDate] = {
      ...map[selectedDate],
      selected: true,
      selectedColor: '#10B981',
      selectedTextColor: '#FFFFFF',
    };
    return map;
  }, [eventsByDate, selectedDate]);

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const addEvent = () => {
    const title = eventTitle.trim();
    if (!title) return;
    const next: EventItem = {
      id: `${Date.now()}`,
      title,
      start: eventStart.trim() || '09:00 AM',
      end: eventEnd.trim() || '09:30 AM',
      type: eventType,
    };
    setEventsByDate((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] ?? []), next],
    }));
    setEventTitle('');
    setEventStart('09:00 AM');
    setEventEnd('09:30 AM');
    setEventType('to-do');
    setShowAddModal(false);
  };

  const headerDate = new Date(selectedDate);
  const monthTitle = headerDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
    weekday: 'long',
  });

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={20} color="#065F46" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Skin Calendar</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: insets.bottom + 30 }}
      >
        <View style={styles.calendarCard}>
          <View style={styles.calendarTop}>
            <Text style={styles.calendarDateLabel}>{monthTitle}</Text>
            <View style={styles.calendarTopIcon}>
              <CalendarDays size={16} color="#6B7280" />
            </View>
          </View>
          <Calendar
            current={selectedDate}
            markedDates={markedDates}
            onDayPress={onDayPress}
            enableSwipeMonths
            theme={{
              textMonthFontFamily: AppTypography.bold,
              textDayFontFamily: AppTypography.semibold,
              textDayHeaderFontFamily: AppTypography.medium,
              monthTextColor: '#111827',
              dayTextColor: '#111827',
              arrowColor: '#4B5563',
              textDisabledColor: '#D1D5DB',
              todayTextColor: '#10B981',
              calendarBackground: '#FFFFFF',
            }}
            style={styles.calendar}
          />
        </View>

        <View style={styles.tasksHeader}>
          <Text style={styles.tasksTitle}>Today&apos;s Task</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddModal(true)}>
            <Plus size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.taskList}>
          {selectedEvents.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No tasks yet. Tap + to add one.</Text>
            </View>
          ) : (
            selectedEvents.map((item) => (
              <View key={item.id} style={styles.taskItem}>
                <View style={[styles.taskTypeIconWrap, { backgroundColor: `${TYPE_COLOR[item.type]}18` }]}>
                  {item.type === 'to-do' && <Target size={14} color={TYPE_COLOR[item.type]} />}
                  {item.type === 'event' && <CalendarCheck2 size={14} color={TYPE_COLOR[item.type]} />}
                  {item.type === 'reminder' && <Clock3 size={14} color={TYPE_COLOR[item.type]} />}
                  {item.type === 'milestone' && <Flag size={14} color={TYPE_COLOR[item.type]} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.taskType}>{item.type.replace('-', ' ')}</Text>
                  <Text style={styles.taskTitle}>{item.title}</Text>
                  <View style={styles.taskTimeRow}>
                    <Clock3 size={12} color="#6B7280" />
                    <Text style={styles.taskTime}>{item.start} - {item.end}</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={showAddModal} transparent animationType="fade" onRequestClose={() => setShowAddModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Event</Text>
            <TextInput
              value={eventTitle}
              onChangeText={setEventTitle}
              placeholder="Event title"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
            />
            <View style={styles.timeRow}>
              <TextInput value={eventStart} onChangeText={setEventStart} placeholder="Start" style={[styles.input, styles.timeInput]} />
              <TextInput value={eventEnd} onChangeText={setEventEnd} placeholder="End" style={[styles.input, styles.timeInput]} />
            </View>
            <View style={styles.typeRow}>
              {(['to-do', 'event', 'reminder', 'milestone'] as EventType[]).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.typeChip, eventType === type && { backgroundColor: TYPE_COLOR[type] }]}
                  onPress={() => setEventType(type)}
                >
                  <Text style={[styles.typeChipText, eventType === type && { color: '#fff' }]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowAddModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={addEvent}>
                <Text style={styles.saveText}>Save Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3FCF8' },
  header: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
    backgroundColor: '#F3FCF8',
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
  headerTitle: { fontFamily: AppTypography.bold, fontSize: 19, color: '#0E3528' },
  calendarCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.14)',
    padding: 12,
    marginBottom: 18,
  },
  calendarTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  calendarDateLabel: { fontFamily: AppTypography.bold, color: '#111827', fontSize: 17 },
  calendarTopIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: { borderRadius: 14 },
  tasksHeader: {
    marginHorizontal: 18,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tasksTitle: { fontFamily: AppTypography.bold, fontSize: 22, color: '#0D2B20' },
  addBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskList: { marginHorizontal: 18, gap: 10 },
  taskItem: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(16,185,129,0.14)',
    paddingTop: 14,
    flexDirection: 'row',
    gap: 10,
  },
  taskTypeIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskType: { fontFamily: AppTypography.medium, fontSize: 12, color: '#9CA3AF', textTransform: 'capitalize' },
  taskTitle: { fontFamily: AppTypography.bold, fontSize: 15, color: '#102A21', marginTop: 2, marginBottom: 5, lineHeight: 21 },
  taskTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  taskTime: { fontFamily: AppTypography.medium, fontSize: 11.5, color: '#6B7280' },
  emptyCard: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(16,185,129,0.14)',
    paddingTop: 14,
    paddingBottom: 6,
  },
  emptyText: { fontFamily: AppTypography.medium, color: '#94A3B8', fontSize: 13 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: { width: '100%', borderRadius: 18, backgroundColor: '#fff', padding: 14, borderWidth: 1, borderColor: 'rgba(16,185,129,0.14)' },
  modalTitle: { fontFamily: AppTypography.bold, fontSize: 18, color: '#0E3528', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.16)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: AppTypography.medium,
    color: '#111827',
    fontSize: 13,
    marginBottom: 10,
  },
  timeRow: { flexDirection: 'row', gap: 8 },
  timeInput: { flex: 1 },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  typeChip: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#ECFDF5',
  },
  typeChipText: { fontFamily: AppTypography.semibold, color: '#334155', fontSize: 12, textTransform: 'capitalize' },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
  cancelBtn: { paddingHorizontal: 12, paddingVertical: 9 },
  cancelText: { fontFamily: AppTypography.semibold, color: '#6B7280', fontSize: 13 },
  saveBtn: { backgroundColor: '#10B981', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9 },
  saveText: { fontFamily: AppTypography.bold, color: '#fff', fontSize: 13 },
});