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









import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { AppTypography } from '@/constants/design';
import { RFValue } from 'react-native-responsive-fontsize';
import { X, Calendar as CalendarIcon, Clock, Tag } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Types
interface CalendarEvent {
  id: string;
  name: string;
  type: 'routine' | 'reminder' | 'event';
  time?: string;
  description?: string;
}

interface MarkedDateProps {
  marked: boolean;
  dotColor: string;
  selected?: boolean;
  selectedColor?: string;
}

// Sample data structure
const SAMPLE_EVENTS: Record<string, CalendarEvent[]> = {
  '2026-04-27': [
    { id: '1', name: 'Morning Skincare Routine', type: 'routine', time: '08:00 AM', description: 'Cleanse → Tone → Moisturize → SPF' },
    { id: '2', name: 'Evening Routine', type: 'routine', time: '09:00 PM', description: 'Double Cleanse → Serum → Night Cream' },
  ],
  '2026-04-28': [
    { id: '3', name: 'Vitamin C Serum Restock', type: 'reminder', time: '02:00 PM', description: 'Running low on Vitamin C serum' },
  ],
  '2026-04-29': [
    { id: '4', name: 'Weekly Skin Analysis', type: 'event', time: '10:30 AM', description: 'Check progress and adjust routine' },
  ],
  '2026-05-01': [
    { id: '5', name: 'Exfoliation Day', type: 'routine', time: '08:00 PM', description: 'Chemical exfoliant application' },
  ],
};

const EVENT_COLORS = {
  routine: '#22C55E',
  reminder: '#F59E0B',
  event: '#3B82F6',
};

const EVENT_ICONS = {
  routine: '🪞',
  reminder: '🛍️',
  event: '📊',
};

export default function RoutineCalendarScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('2026-04-27');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Get events for selected date
  const selectedDateEvents = useMemo(
    () => SAMPLE_EVENTS[selectedDate] || [],
    [selectedDate]
  );

  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Prepare marked dates for calendar
  const markedDates = useMemo(() => {
    const marked: Record<string, MarkedDateProps> = {};
    
    // Mark dates with events
    Object.keys(SAMPLE_EVENTS).forEach(date => {
      marked[date] = {
        marked: true,
        dotColor: EVENT_COLORS[SAMPLE_EVENTS[date][0]?.type] || '#22C55E',
      };
    });
    
    // Mark selected date
    marked[selectedDate] = {
      ...marked[selectedDate],
      selected: true,
      selectedColor: '#22C55E',
    };
    
    return marked;
  }, [selectedDate]);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setSelectedEvent(null);
  };

  const handleEventPress = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'routine':
        return <View style={[styles.eventTypeIcon, { backgroundColor: '#22C55E15' }]}>
          <Text style={styles.eventIconText}>🪞</Text>
        </View>;
      case 'reminder':
        return <View style={[styles.eventTypeIcon, { backgroundColor: '#F59E0B15' }]}>
          <Text style={styles.eventIconText}>🛍️</Text>
        </View>;
      case 'event':
        return <View style={[styles.eventTypeIcon, { backgroundColor: '#3B82F615' }]}>
          <Text style={styles.eventIconText}>📊</Text>
        </View>;
      default:
        return null;
    }
  };

  return (
    
      <LinearGradient
        colors={['#FFFFFF', '#F9FAFB']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <CalendarIcon size={24} color="#22C55E" strokeWidth={1.5} />
          </View>
          <Text style={styles.headerTitle}>Skincare Calendar</Text>
          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <X size={24} color="#111827" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <Calendar
            style={styles.calendar}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: '#6B7280',
              selectedDayBackgroundColor: '#22C55E',
              selectedDayTextColor: '#FFFFFF',
              todayTextColor: '#22C55E',
              dayTextColor: '#111827',
              textDisabledColor: '#D1D5DB',
              arrowColor: '#22C55E',
              monthTextColor: '#111827',
              textDayFontFamily: AppTypography.medium,
              textMonthFontFamily: AppTypography.bold,
              textDayHeaderFontFamily: AppTypography.semibold,
              textDayFontSize: RFValue(14),
              textMonthFontSize: RFValue(16),
              textDayHeaderFontSize: RFValue(12),
            }}
            onDayPress={handleDayPress}
            markedDates={markedDates}
            markingType={'simple'}
            enableSwipeMonths={true}
            firstDay={1}
          />
        </View>

        {/* Events Section */}
        <View style={styles.eventsSection}>
          <View style={styles.eventsHeader}>
            <Text style={styles.eventsTitle}>
              {selectedDateEvents.length > 0 ? 'Today\'s Schedule' : 'No Events Planned'}
            </Text>
            <Text style={styles.eventsDate}>
              {formatDisplayDate(selectedDate)}
            </Text>
          </View>

          <ScrollView 
            style={styles.eventsList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.eventsListContent}
          >
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={[
                    styles.eventCard,
                    selectedEvent?.id === event.id && styles.eventCardSelected,
                  ]}
                  onPress={() => handleEventPress(event)}
                  activeOpacity={0.7}
                >
                  <View style={styles.eventCardContent}>
                    {getEventTypeIcon(event.type)}
                    
                    <View style={styles.eventDetails}>
                      <Text style={styles.eventName}>{event.name}</Text>
                      
                      {event.time && (
                        <View style={styles.eventMetaRow}>
                          <Clock size={12} color="#6B7280" strokeWidth={1.5} />
                          <Text style={styles.eventTime}>{event.time}</Text>
                        </View>
                      )}
                      
                      {event.description && selectedEvent?.id === event.id && (
                        <Text style={styles.eventDescription}>{event.description}</Text>
                      )}
                    </View>
                    
                    <View style={[styles.eventBadge, { backgroundColor: EVENT_COLORS[event.type] + '15' }]}>
                      <Text style={[styles.eventBadgeText, { color: EVENT_COLORS[event.type] }]}>
                        {event.type.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>📅</Text>
                <Text style={styles.emptyStateTitle}>No events scheduled</Text>
                <Text style={styles.emptyStateText}>
                  Tap the + button to add routines, reminders, or events to your calendar
                </Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Add Event Button - Uncomment when implementing add functionality */}
        {/* <TouchableOpacity style={styles.fab} onPress={() => {}}>
          <LinearGradient
            colors={['#22C55E', '#16A34A']}
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.fabIcon}>+</Text>
          </LinearGradient>
        </TouchableOpacity> */}
        </SafeAreaView>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    width: 40,
  },
  headerTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(20),
    color: '#111827',
    textAlign: 'center',
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  calendar: {
    paddingBottom: 8,
  },
  eventsSection: {
    flex: 1,
    marginTop: 20,
  },
  eventsHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  eventsTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(18),
    color: '#111827',
    marginBottom: 4,
  },
  eventsDate: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(13),
    color: '#6B7280',
  },
  eventsList: {
    flex: 1,
  },
  eventsListContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  eventCardSelected: {
    borderColor: '#22C55E',
    borderWidth: 2,
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  eventCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  eventTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  eventIconText: {
    fontSize: RFValue(22),
  },
  eventDetails: {
    flex: 1,
  },
  eventName: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(15),
    color: '#111827',
    marginBottom: 6,
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventTime: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(12),
    color: '#6B7280',
    marginLeft: 4,
  },
  eventDescription: {
    fontFamily: AppTypography.regular,
    fontSize: RFValue(12),
    color: '#6B7280',
    marginTop: 8,
    lineHeight: 18,
  },
  eventBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventBadgeText: {
    fontFamily: AppTypography.semibold,
    fontSize: RFValue(10),
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateIcon: {
    fontSize: RFValue(48),
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontFamily: AppTypography.semibold,
    fontSize: RFValue(16),
    color: '#111827',
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: AppTypography.regular,
    fontSize: RFValue(13),
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    fontSize: RFValue(28),
    color: '#FFFFFF',
    fontWeight: '300',
  },
});