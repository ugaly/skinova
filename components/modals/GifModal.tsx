import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { X, Zap } from 'lucide-react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { AppTypography } from '@/constants/design';
import { useRouter } from 'expo-router';

export const GifModal = ({ data, onClose }: { data: any; onClose: () => void }) => {
  const router = useRouter();

  const handlePress = () => {
    onClose();
    router.push({
      pathname: '/modal-detail',
      params: {
        title: 'Apply in Circular Motion',
        message: 'Maximize absorption by gently massaging your cleanser in outward circles.',
        image: 'https://i.pinimg.com/1200x/4c/35/be/4c35be9301ba18cd78f5e2b36b7a5d0e.jpg',
        type: 'educational'
      }
    });
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Zyd3R5eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif' }}
        style={styles.gif}
        contentFit="cover"
      />

      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <X size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.overlay}>
        <View style={styles.badge}>
          <Zap size={14} color="#059669" fill="#059669" />
          <Text style={styles.badgeText}>QUICK TIP</Text>
        </View>
        <Text style={styles.title}>Apply in Circular Motion</Text>
        <Text style={styles.message}>Maximize absorption by gently massaging your cleanser in outward circles.</Text>

        <TouchableOpacity style={styles.cta} onPress={handlePress}>
          <Text style={styles.ctaText}>View Full Technique</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    height: 400,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  gif: {
    ...StyleSheet.absoluteFillObject,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 32, height: 32, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
    zIndex: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 24,
    justifyContent: 'flex-end',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(10),
    color: '#059669',
  },
  title: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(22),
    color: '#FFFFFF',
    marginBottom: 6,
  },
  message: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(13),
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
  },
  cta: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(14),
    color: '#059669',
  },
});
