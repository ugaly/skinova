import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { X, Play } from 'lucide-react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { AppTypography } from '@/constants/design';
import { useRouter } from 'expo-router';

export const VideoModal = ({ data, onClose }: { data: any; onClose: () => void }) => {
  const router = useRouter();

  const handlePress = () => {
    onClose();
    router.push({
      pathname: '/modal-detail',
      params: { 
        title: data?.title, 
        message: data?.message, 
        image: 'https://template.canva.com/EAGSe-jkm2o/2/0/800w-osmFSUl-3IY.jpg',
        type: 'video'
      }
    });
  };

  return (
    <View style={styles.card}>
      <Video
        source={{ uri: data?.videoUrl }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
      />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <X size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.content}>
            <View style={styles.playIcon}>
                <Play size={24} color="#059669" fill="#059669" />
            </View>
          <Text style={styles.title}>{data?.title || 'Watch & Learn'}</Text>
          <Text style={styles.message}>{data?.message}</Text>
          
          <TouchableOpacity style={styles.cta} onPress={handlePress}>
            <Text style={styles.ctaText}>View Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    height: 520,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 30,
    justifyContent: 'flex-end',
  },
  closeBtn: {
    position: 'absolute',
    top: 24,
    right: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  playIcon: {
      width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFFFFF',
      justifyContent: 'center', alignItems: 'center', marginBottom: 20,
  },
  title: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(22),
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(14),
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  cta: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  ctaText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(16),
    color: '#059669',
  },
});
