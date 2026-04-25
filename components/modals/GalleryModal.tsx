import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { X, Layers } from 'lucide-react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { AppTypography } from '@/constants/design';
import { useRouter } from 'expo-router';

export const GalleryModal = ({ data, onClose }: { data: any; onClose: () => void }) => {
  const router = useRouter();

  const handlePress = () => {
    onClose();
    router.push({
      pathname: '/modal-detail',
      params: { 
        title: data?.title, 
        message: data?.message, 
        image: data?.image,
        type: 'gallery'
      }
    });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <X size={20} color="#0A2218" />
      </TouchableOpacity>

      <View style={styles.gallery}>
        <View style={styles.mainImgWrap}>
            <Image source={{ uri: data?.image }} style={styles.img} />
        </View>
        <View style={styles.sideCol}>
            <View style={styles.smallImgWrap}>
                <Image source={{ uri: data?.secondaryImage }} style={styles.img} />
            </View>
            <View style={[styles.smallImgWrap, { backgroundColor: '#F0FBF6', justifyContent: 'center', alignItems: 'center' }]}>
                <Layers size={24} color="#059669" />
                <Text style={styles.galleryCount}>+4 More</Text>
            </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.message}>{data?.message}</Text>
        <TouchableOpacity style={styles.cta} onPress={handlePress}>
          <Text style={styles.ctaText}>Explore Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    padding: 16,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: 32, height: 32, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
  },
  gallery: {
    flexDirection: 'row',
    height: 240,
    gap: 10,
    marginTop: 30,
  },
  mainImgWrap: {
    flex: 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  sideCol: {
    flex: 1,
    gap: 10,
  },
  smallImgWrap: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  galleryCount: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(10),
    color: '#059669',
    marginTop: 4,
  },
  footer: {
    padding: 16,
    paddingTop: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(20),
    color: '#0A2218',
    marginBottom: 6,
  },
  message: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(13),
    color: '#6B9E88',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  cta: {
    backgroundColor: '#059669',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(14),
    color: '#FFFFFF',
  },
});
