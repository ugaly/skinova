import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, SendHorizonal } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';

import { AppTypography } from '@/constants/design';
import { getDermatologistById } from '@/src/data/dermatologists';

type ChatMessage = {
  id: string;
  from: 'doctor' | 'user';
  text: string;
  time: string;
};

export default function DermatologyChatScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { doctorId } = useLocalSearchParams<{ doctorId?: string }>();
  const doctor = getDermatologistById(doctorId);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', from: 'doctor', text: 'Hi! Share your concern and recent routine changes.', time: '09:14' },
    { id: '2', from: 'user', text: 'I have redness and small breakouts around cheeks.', time: '09:15' },
    { id: '3', from: 'doctor', text: 'Noted. Please avoid new active ingredients for 72h and keep hydration high.', time: '09:16' },
  ]);

  const name = useMemo(() => doctor?.name ?? 'Dermatologist', [doctor]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        from: 'user',
        text: trimmed,
        time: 'Now',
      },
    ]);
    setInput('');
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={20} color="#065F46" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerName}>{name}</Text>
          <Text style={styles.headerSub}>Online now</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.chatContent} showsVerticalScrollIndicator={false}>
        {messages.map((message) => {
          const mine = message.from === 'user';
          return (
            <View key={message.id} style={[styles.msgWrap, mine ? styles.msgWrapMine : styles.msgWrapOther]}>
              <View style={[styles.msgBubble, mine ? styles.msgMine : styles.msgOther]}>
                <Text style={[styles.msgText, mine && { color: '#FFFFFF' }]}>{message.text}</Text>
                <Text style={[styles.msgTime, mine && { color: 'rgba(255,255,255,0.78)' }]}>{message.time}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={[styles.inputBar, { paddingBottom: insets.bottom + 12 }]}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <SendHorizonal size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F1FCF7' },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#E8FAF1',
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  headerName: { fontFamily: AppTypography.bold, color: '#0C2E22', fontSize: 16 },
  headerSub: { fontFamily: AppTypography.medium, color: '#059669', fontSize: 12 },
  chatContent: { paddingHorizontal: 14, paddingVertical: 14, gap: 10 },
  msgWrap: { flexDirection: 'row' },
  msgWrapMine: { justifyContent: 'flex-end' },
  msgWrapOther: { justifyContent: 'flex-start' },
  msgBubble: { maxWidth: '82%', borderRadius: 16, paddingHorizontal: 12, paddingTop: 10, paddingBottom: 8 },
  msgMine: { backgroundColor: '#10B981', borderBottomRightRadius: 6 },
  msgOther: { backgroundColor: '#FFFFFF', borderBottomLeftRadius: 6 },
  msgText: { fontFamily: AppTypography.medium, color: '#1F2937', fontSize: 13.5, lineHeight: 18 },
  msgTime: { fontFamily: AppTypography.medium, color: '#6B7280', fontSize: 10, marginTop: 5, alignSelf: 'flex-end' },
  inputBar: {
    paddingHorizontal: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(16,185,129,0.12)',
    backgroundColor: '#F7FFFB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.16)',
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontFamily: AppTypography.medium,
    color: '#0F172A',
    fontSize: 13.5,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
  },
});

