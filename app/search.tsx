import { useRouter } from 'expo-router';
import { ArrowLeft, Clock3, Search, Sparkles, UserRound } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

type SearchItem = {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  category: 'feature' | 'user' | 'tool';
};

const SEARCH_ITEMS: SearchItem[] = [
  { id: 's1', title: 'Face Scan', subtitle: 'Start AI skin scan', route: '/face-scan', category: 'feature' },
  { id: 's2', title: 'Calendar', subtitle: 'Schedule routines and reminders', route: '/routine-calendar', category: 'feature' },
  { id: 's3', title: 'Dermatologists', subtitle: 'Find and book doctors', route: '/dermatologists', category: 'feature' },
  { id: 's4', title: 'Chat List', subtitle: 'Open conversations', route: '/chat-list', category: 'feature' },
  { id: 's5', title: 'Supplier Map', subtitle: 'Explore suppliers by product', route: '/supplier-map?title=All%20Suppliers%20%E2%80%A2%20All%20Products&source=search&product=all', category: 'feature' },
  { id: 's6', title: 'Feedback', subtitle: 'Share app feedback', route: '/feedback', category: 'tool' },
  { id: 's7', title: 'Appointment History', subtitle: 'View timeline and past visits', route: '/appointment-history', category: 'feature' },
  { id: 'u1', title: 'Dr. Amina Ochieng', subtitle: 'Consultant Dermatologist', route: '/dermatologist/dr-amina', category: 'user' },
  { id: 'u2', title: 'Dr. Brian Kimani', subtitle: 'Dermatologic Surgeon', route: '/dermatologist/dr-kimani', category: 'user' },
];

const RECENT = ['Face Scan', 'Dr. Amina Ochieng', 'Supplier Map'];
const TRENDING = ['Acne care', 'Booking', 'AI Skinova', 'Hydration routine'];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_ITEMS.slice(0, 6);
    return SEARCH_ITEMS.filter(
      (item) => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#065F46" />
        </TouchableOpacity>
        <View style={styles.searchInputWrap}>
          <Search size={16} color="#86A89A" />
          <TextInput
            autoFocus
            value={query}
            onChangeText={setQuery}
            placeholder="Search app, users, features..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}>
        {!query ? (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHead}>
                <Clock3 size={14} color="#059669" />
                <Text style={styles.sectionTitle}>Recent searches</Text>
              </View>
              <View style={styles.tagWrap}>
                {RECENT.map((item) => (
                  <TouchableOpacity key={item} style={styles.tag} activeOpacity={0.85} onPress={() => setQuery(item)}>
                    <Text style={styles.tagText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHead}>
                <Sparkles size={14} color="#059669" />
                <Text style={styles.sectionTitle}>Trending</Text>
              </View>
              <View style={styles.tagWrap}>
                {TRENDING.map((item) => (
                  <TouchableOpacity key={item} style={[styles.tag, styles.trendTag]} activeOpacity={0.85} onPress={() => setQuery(item)}>
                    <Text style={styles.tagText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Results</Text>
          <View style={styles.resultList}>
            {results.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No results found</Text>
                <Text style={styles.emptySub}>Try different keywords like doctor, scan, calendar, supplier.</Text>
              </View>
            ) : (
              results.map((item) => (
                <TouchableOpacity key={item.id} style={styles.resultCard} onPress={() => router.push(item.route as any)} activeOpacity={0.9}>
                  <View style={styles.resultIcon}>
                    {item.category === 'user' ? (
                      <UserRound size={15} color="#059669" />
                    ) : (
                      <Search size={15} color="#059669" />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.resultTitle}>{item.title}</Text>
                    <Text style={styles.resultSub}>{item.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3FCF8' },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8FAF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputWrap: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.16)',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: AppTypography.medium,
    color: '#111827',
    fontSize: 14,
  },
  section: { paddingHorizontal: 16, marginBottom: 16 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  sectionTitle: { fontFamily: AppTypography.bold, fontSize: 15, color: '#0F2E23', marginBottom: 8 },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.14)',
  },
  trendTag: { backgroundColor: '#ECFDF5' },
  tagText: { fontFamily: AppTypography.semibold, color: '#1F2937', fontSize: 12 },
  resultList: { gap: 8 },
  resultCard: {
    borderRadius: 14,
    padding: 11,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  resultIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTitle: { fontFamily: AppTypography.bold, fontSize: 13.5, color: '#0C2B21', marginBottom: 2 },
  resultSub: { fontFamily: AppTypography.medium, fontSize: 11.5, color: '#6B7280' },
  emptyCard: {
    borderRadius: 14,
    padding: 13,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.14)',
    backgroundColor: '#FFFFFF',
  },
  emptyTitle: { fontFamily: AppTypography.bold, fontSize: 14, color: '#0F172A', marginBottom: 3 },
  emptySub: { fontFamily: AppTypography.medium, fontSize: 12, color: '#6B7280', lineHeight: 17 },
});

