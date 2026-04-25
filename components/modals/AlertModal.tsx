import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, X, ArrowRight } from 'lucide-react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { AppTypography } from '@/constants/design';
import { useRouter } from 'expo-router';

export const AlertModal = ({ data, onClose }: { data: any; onClose: () => void }) => {
  const router = useRouter();

  const handlePress = () => {
    onClose();
    router.push({
      pathname: '/modal-detail',
      params: {
        title: data?.title,
        message: data?.message,
        image: 'https://i.pinimg.com/736x/b2/f5/e3/b2f5e303366405c08f0aa18b94fb97c9.jpg',
        type: 'alert'
      }
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.bellIcon}>
          <Bell size={20} color="#059669" />
          <View style={styles.dot} />
        </View>
        <TouchableOpacity onPress={onClose}>
          <X size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{data?.title || 'New Alert'}</Text>
      <Text style={styles.message}>{data?.message || 'We have something new tailored just for you.'}</Text>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.actionBtn} onPress={handlePress}>
        <Text style={styles.actionText}>View Detail</Text>
        <ArrowRight size={16} color="#059669" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bellIcon: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
    justifyContent: 'center', alignItems: 'center',
    position: 'relative',
  },
  dot: {
    position: 'absolute', top: 12, right: 12,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#10B981', borderColor: '#FFF', borderWidth: 1.5,
  },
  title: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(18),
    color: '#0A2218',
    marginBottom: 8,
  },
  message: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(13),
    color: '#6B9E88',
    lineHeight: 20,
    marginBottom: 24,
  },
  divider: {
    height: 1, backgroundColor: '#F3F4F6', marginBottom: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(14),
    color: '#059669',
  },
});
