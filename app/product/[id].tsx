import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ShieldCheck, Sparkles, Star } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Go back" style={styles.backBtn}>
          <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Product Detail</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <LinearGradient
          colors={['#EAFBF3', '#F7FDF9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.badge}>
            <Sparkles size={12} color="#059669" />
            <Text style={styles.badgeText}>AI PROFILE MATCHED</Text>
          </View>
          <Text style={styles.productTitle}>Skinova Product #{id}</Text>
          <Text style={styles.productSub}>This product detail page is now ready for richer content, pricing, and supplier links.</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.metaText}>4.8 Rating</Text>
            </View>
            <View style={styles.metaPill}>
              <ShieldCheck size={12} color="#059669" />
              <Text style={styles.metaText}>Derm Safe</Text>
            </View>
          </View>
        </LinearGradient>

        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.backMainBtn}
        >
          <Ionicons name="arrow-back" size={16} color="#FFFFFF" />
          <Text style={styles.backMainBtnText}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5FCF8' },
  header: {
    paddingHorizontal: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16,185,129,0.12)',
    backgroundColor: 'rgba(245,252,248,0.95)',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 18,
    color: '#0C2B21',
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  heroCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.14)',
    padding: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.14)',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginBottom: 10,
  },
  badgeText: { fontFamily: AppTypography.bold, fontSize: 10.5, color: '#047857' },
  productTitle: { fontFamily: AppTypography.bold, fontSize: 24, color: '#0A2218', marginBottom: 8 },
  productSub: { fontFamily: AppTypography.medium, fontSize: 13.5, color: '#466357', lineHeight: 20, marginBottom: 14 },
  metaRow: { flexDirection: 'row', gap: 8 },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.08)',
  },
  metaText: { fontFamily: AppTypography.semibold, fontSize: 11.5, color: '#334155' },
  backMainBtn: {
    marginTop: 18,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  backMainBtnText: { fontFamily: AppTypography.bold, fontSize: 14, color: '#FFFFFF' },
});
