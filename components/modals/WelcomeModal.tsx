import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Sparkles, X } from 'lucide-react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { AppTypography } from '@/constants/design';
import { useRouter } from 'expo-router';

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
    <BlurView intensity={80} tint="light" style={styles.card}>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <X size={20} color="#059669" />
      </TouchableOpacity>

      <View style={styles.iconCircle}>
        <Sparkles size={32} color="#059669" />
      </View>

      <Text style={styles.title}>{data?.title || 'Hello!'}</Text>
      <Text style={styles.message}>{data?.message}</Text>

      <TouchableOpacity style={styles.cta} onPress={handlePress}>
        <Text style={styles.ctaText}>Let's Glow</Text>
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
    borderColor: 'rgba(5, 150, 105, 0.2)',
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(22),
    color: '#0A2218',
    marginBottom: 10,
  },
  message: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(14),
    color: '#6B9E88',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  cta: {
    backgroundColor: '#059669',
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
