import React, { useState, useEffect, useRef } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  Animated
} from 'react-native';
import { Image } from 'expo-image';
import { ChevronLeft, Camera, Send, Sparkles, User, Bot, ArrowLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

import { AppTypography } from '@/constants/design';

interface Message {
  id: number;
  text: string;
  sender: 'ai' | 'user';
  isTyping?: boolean;
}

export default function AiChatScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ title?: string; status?: string }>();
  const chatTitle = params.title || 'Skinova AI';
  const chatStatus = params.status || 'Online & Analyzing';
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! I noticed your routine today. Do you use any makeup apart from these products?", 
      sender: 'ai' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    
    // Simulate AI thinking and typing
    setIsAiTyping(true);
    setTimeout(() => {
      const aiResponse: Message = { 
        id: Date.now() + 1, 
        text: "Understood. Using makeup occasionally is fine, but make sure to use a double-cleanse method tonight. It will help prevent your pores from clogging while using the Tatcha Water Cream.", 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsAiTyping(false);
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isAiTyping]);

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#059669', '#064E3B']}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.aiInfo}>
            <Text style={styles.aiTitle}>{chatTitle}</Text>
             <Text style={styles.aiStatus}>{chatStatus}</Text>
          </View>
          <View style={styles.lottieWrap}>
            <LottieView
              source={require('../assets/bot.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.chatContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.msgWrapper, msg.sender === 'user' ? styles.userWrapper : styles.aiWrapper]}>
              <View style={[styles.bubble, msg.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
                <Text style={[styles.msgText, msg.sender === 'user' ? styles.userText : styles.aiText]}>
                  {msg.text}
                </Text>
              </View>
              {msg.sender === 'ai' && (
                <View style={styles.aiAvatar}>
                  <Bot size={12} color="#059669" />
                </View>
              )}
            </View>
          ))}
          
          {isAiTyping && (
            <View style={[styles.msgWrapper, styles.aiWrapper]}>
              <View style={[styles.bubble, styles.aiBubble, { paddingVertical: 12 }]}>
                <Text style={styles.aiText}>AI is thinking...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={[styles.inputArea, { marginBottom: insets.bottom + 10 }]}>
          <TouchableOpacity style={styles.captureBtn}>
            <Camera size={22} color="#4B5563" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Write your answer..."
            value={inputText}
            onChangeText={setInputText}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Send size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiInfo: {
    flex: 1,
    marginLeft: 15,
  },
  aiTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(18),
    color: '#fff',
  },
  aiStatus: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(11),
    color: 'rgba(255,255,255,0.7)',
  },
  lottieWrap: {
    width: 80,
    height: 80,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  chatContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  msgWrapper: {
    marginBottom: 20,
    maxWidth: '85%',
  },
  userWrapper: {
    alignSelf: 'flex-end',
  },
  aiWrapper: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#059669',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  msgText: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(13),
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  aiText: {
    color: '#1F2937',
  },
  aiAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom: -5,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  captureBtn: {
    padding: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontFamily: AppTypography.medium,
    fontSize: RFValue(14),
    color: '#1F2937',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
