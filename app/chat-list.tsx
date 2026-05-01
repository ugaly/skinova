import { useRouter } from 'expo-router';
import { Bot, ChevronLeft, ChevronRight, MessageCircleMore, ShieldCheck, Stethoscope } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

const CHATS = [
  {
    id: 'ai',
    name: 'Skinova AI',
    preview: 'I prepared your updated evening routine based on today scan.',
    time: '09:42',
    unread: 2,
    icon: Bot,
    color: '#10B981',
    route: '/ai-chat?title=Skinova%20AI&status=Online%20%26%20Analyzing',
  },
  {
    id: 'derm',
    name: 'Dermatology Support',
    preview: 'Dr. Amina: Share a clear photo of current flare area.',
    time: 'Yesterday',
    unread: 1,
    icon: Stethoscope,
    color: '#0EA5E9',
    route: '/dermatology-chat',
  },
  {
    id: 'system',
    name: 'Skinova System Desk',
    preview: 'Your appointment reminder is scheduled for tomorrow 10:00 AM.',
    time: 'Wed',
    unread: 0,
    icon: ShieldCheck,
    color: '#8B5CF6',
    route: '/ai-chat?title=System%20Desk&status=Care%20Updates',
  },
];

export default function ChatListScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={20} color="#065F46" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerIcon}>
          <MessageCircleMore size={18} color="#059669" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        <View style={styles.listWrap}>
          {CHATS.map((chat) => {
            const Icon = chat.icon;
            return (
              <TouchableOpacity
                key={chat.id}
                style={styles.chatCard}
                activeOpacity={0.9}
                onPress={() => router.push(chat.route as any)}
              >
                <View style={[styles.avatar, { backgroundColor: `${chat.color}20` }]}>
                  <Icon size={20} color={chat.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.nameRow}>
                    <Text style={styles.chatName}>{chat.name}</Text>
                    <Text style={styles.chatTime}>{chat.time}</Text>
                  </View>
                  <Text numberOfLines={1} style={styles.chatPreview}>{chat.preview}</Text>
                </View>
                <View style={styles.trailing}>
                  {chat.unread > 0 ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{chat.unread}</Text>
                    </View>
                  ) : (
                    <ChevronRight size={17} color="#9CA3AF" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3FCF8' },
  header: {
    paddingHorizontal: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerTitle: { fontFamily: AppTypography.bold, fontSize: 20, color: '#0E3528' },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.12)',
  },
  listWrap: { paddingHorizontal: 14, paddingTop: 12, gap: 8 },
  chatCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.1)',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  chatName: { fontFamily: AppTypography.bold, fontSize: 14.5, color: '#0C2B21' },
  chatTime: { fontFamily: AppTypography.medium, fontSize: 11.5, color: '#6B7280' },
  chatPreview: { fontFamily: AppTypography.medium, fontSize: 12.5, color: '#60756B' },
  trailing: { width: 26, alignItems: 'flex-end' },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#10B981',
  },
  badgeText: { fontFamily: AppTypography.bold, color: '#fff', fontSize: 10.5 },
});

