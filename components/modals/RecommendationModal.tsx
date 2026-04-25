import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { X, Star } from 'lucide-react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { AppTypography } from '@/constants/design';
import { LinearGradient } from 'expo-linear-gradient';

import { useRouter } from 'expo-router';

export const RecommendationModal = ({ data, onClose }: { data: any; onClose: () => void }) => {
  const router = useRouter();

  const handlePress = () => {
    onClose();
    router.push({
      pathname: '/modal-detail',
      params: { 
        title: data?.title, 
        message: data?.message, 
        image: data?.image,
        type: 'recommendation'
      }
    });
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: data?.image }} style={styles.bannerImg} />
      <LinearGradient colors={['transparent', 'rgba(10, 34, 24, 0.9)']} style={styles.gradient} />
      
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <X size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.badge}>
          <Star size={10} color="#059669" fill="#059669" />
          <Text style={styles.badgeText}>TOP RATED</Text>
        </View>
        
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.message}>{data?.message}</Text>
        
        <TouchableOpacity style={styles.cta} onPress={handlePress}>
          <Text style={styles.ctaText}>{data?.ctaText || 'View Product'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    height: 480,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  closeBtn: {
    position: 'absolute',
    top: 24,
    right: 24,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 30,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(10),
    color: '#059669',
    letterSpacing: 0.5,
  },
  title: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(24),
    color: '#FFFFFF',
    marginBottom: 8,
  },
  message: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(14),
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 24,
    lineHeight: 20,
  },
  cta: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  ctaText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(16),
    color: '#FFFFFF',
  },
});
