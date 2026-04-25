import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Sparkles, X } from 'lucide-react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { AppTypography } from '@/constants/design';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

export const WelcomeModal = ({ data, onClose }: { data: any; onClose: () => void }) => {
  const router = useRouter();

  const handlePress = () => {
    onClose();
    router.push({
      pathname: '/modal-detail',
      params: {
        title: data?.title,
        message: data?.message,
        image: 'https://i.pinimg.com/1200x/5e/de/f4/5edef430718b1da3e50b78e319f6c30c.jpg',
        type: 'welcome'
      }
    });
  };

  return (
    <BlurView intensity={70} tint="light" style={styles.card}>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <X size={20} color="#111827" />
      </TouchableOpacity>

      <View style={styles.lottieWrap}>
        <LottieView
          source={require('@/assets/bot.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>

      <View style={styles.aiChip}>
        <Sparkles size={12} color="#111827" />
        <Text style={styles.aiChipText}>AI Assistant</Text>
      </View>

      <Text style={styles.title}>{data?.title || 'Hello!'}</Text>
      <Text style={styles.message}>
        {data?.message || 'Your personalized skincare guidance is ready.'}
      </Text>

      <TouchableOpacity style={styles.cta} onPress={handlePress}>
        <Text style={styles.ctaText}>Open Recommendation</Text>
      </TouchableOpacity>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    padding: 30,
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(17, 24, 39, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(17, 24, 39, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieWrap: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: '#F4F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(17, 24, 39, 0.08)',
  },
  lottie: {
    width: 112,
    height: 112,
  },
  aiChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EEF2FF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 14,
  },
  aiChipText: {
    fontFamily: AppTypography.semibold,
    fontSize: RFValue(11),
    color: '#111827',
  },
  title: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(22),
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(14),
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  cta: {
    backgroundColor: '#111827',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  ctaText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(16),
    color: '#FFFFFF',
  },
});
