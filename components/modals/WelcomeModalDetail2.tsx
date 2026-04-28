import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { Heart, X } from 'lucide-react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { AppTypography } from '@/constants/design';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

export const WelcomeModalDetail2 = ({ data, onClose }: { data: any; onClose: () => void }) => {
  const router = useRouter();

  const handlePress = () => {
    onClose();
    router.push({
      pathname: '/modal-detail2',
      params: {
        title: data?.title,
        message: data?.message,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        type: 'inspire',
      },
    });
  };

  return (
    <BlurView intensity={90} tint="dark" style={styles.card}>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <X size={20} color="#fff" />
      </TouchableOpacity>

      <View style={styles.lottieWrap}>
        <LottieView
          source={require('@/assets/bot.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>

      <View style={styles.heartChip}>
        <Heart size={14} color="#fff" />
        <Text style={styles.heartChipText}>Feel Inspired</Text>
      </View>

      <Text style={styles.title}>{data?.title || 'Welcome!'}</Text>
      <Text style={styles.message}>
        {data?.message || 'Discover a new way to care for yourself.'}
      </Text>

      <TouchableOpacity style={styles.cta} onPress={handlePress}>
        <Text style={styles.ctaText}>See Inspiration</Text>
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
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieWrap: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  lottie: {
    width: 112,
    height: 112,
  },
  heartChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F472B6',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 14,
  },
  heartChipText: {
    fontFamily: AppTypography.semibold,
    fontSize: RFValue(12),
    color: '#fff',
  },
  title: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(24),
    color: '#F472B6',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(15),
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
  },
  cta: {
    backgroundColor: '#F472B6',
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 22,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#F472B6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  ctaText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(17),
    color: '#fff',
  },
});
