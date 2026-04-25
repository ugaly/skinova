import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Image } from 'expo-image';
import { ChevronDown, MessageCircle, Info, Sparkles, AlertCircle, ShoppingBag, Send, CheckCircle2, X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { AppTypography } from '@/constants/design';

const ALTERNATIVES = [
  { id: 1, name: 'La Mer Moisturizer', brand: 'La Mer', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
  { id: 2, name: 'Hydra-Mist Prop', brand: 'Joyce Giraud', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
];

export default function RoutineDetail() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [comment, setComment] = useState('');
  const [isUsed, setIsUsed] = useState(false);

  const imageUrl = Array.isArray(params.image) ? params.image[0] : params.image;
  const productTitle = Array.isArray(params.title) ? params.title[0] : params.title;
  const productTime = Array.isArray(params.time) ? params.time[0] : params.time;

  // Mock data for the specific item
  const product = {
    title: productTitle || 'Tatcha The Water Cream',
    image: imageUrl || 'https://i.pinimg.com/736x/54/b9/78/54b978a3378725a86974d85b2361915f.jpg',
    time: productTime || '08:00 AM',
    supply: 'Running Low',
    supplyPercent: 15,
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={['#F0FDF4', '#FFFFFF']}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Pull Indicator */}
        <View style={styles.pullIndicator} />

        {/* Close Button */}
        <TouchableOpacity 
          style={styles.closeBtn} 
          onPress={() => router.back()}
        >
          <X size={20} color="#0A2218" />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Header Info */}
          <View style={styles.header}>
            <View style={styles.imgContainer}>
              <Image source={{ uri: product.image }} style={styles.productImg} contentFit="contain" />
            </View>
            <View style={styles.titleInfo}>
              <Text style={styles.eyebrow}>SCHEDULED FOR {product.time}</Text>
              <Text style={styles.title}>{product.title}</Text>
              
              <TouchableOpacity 
                style={[styles.statusBtn, isUsed && styles.statusBtnDone]} 
                onPress={() => setIsUsed(!isUsed)}
              >
                {isUsed ? (
                    <>
                        <CheckCircle2 size={16} color="#059669" />
                        <Text style={styles.statusBtnTextDone}>Applied Today</Text>
                    </>
                ) : (
                    <>
                        <View style={styles.dot} />
                        <Text style={styles.statusBtnText}>Mark as Done</Text>
                    </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Supply Level Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Supply Status</Text>
              <Text style={[styles.supplyLabel, { color: product.supplyPercent < 20 ? '#EF4444' : '#059669' }]}>
                {product.supply}
              </Text>
            </View>
            <View style={styles.supplyBarBg}>
              <View style={[styles.supplyBarFill, { width: `${product.supplyPercent}%`, backgroundColor: product.supplyPercent < 20 ? '#EF4444' : '#10B981' }]} />
            </View>
            <Text style={styles.supplyAdvice}>Only ~5 days of usage left. Consider ordering a refill now.</Text>
          </View>

          {/* How & Why */}
          <View style={styles.cardSection}>
            <View style={styles.infoCard}>
              <View style={styles.infoIconWrap}>
                <Sparkles size={18} color="#059669" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardHeading}>Why this time?</Text>
                <Text style={styles.cardText}>
                  Morning hydration is crucial to protect your skin barrier from environmental stressors like pollution and UV rays throughout the day.
                </Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoIconWrap}>
                <Info size={18} color="#059669" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardHeading}>How to use</Text>
                <Text style={styles.cardText}>
                  Apply a pearl-sized amount to clean skin. Gently massage in upward circular motions until fully absorbed. Best applied after your vitamin C serum.
                </Text>
              </View>
            </View>
          </View>

          {/* Alternatives */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expert Alternatives</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.altScroll}>
              {ALTERNATIVES.map(alt => (
                <TouchableOpacity key={alt.id} style={styles.altCard}>
                  <Image source={{ uri: alt.image }} style={styles.altImg} />
                  <Text style={styles.altBrand}>{alt.brand}</Text>
                  <Text style={styles.altName} numberOfLines={1}>{alt.name}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.viewStoreBtn}>
                <ShoppingBag size={20} color="#059669" />
                <Text style={styles.viewStoreText}>View Full Store</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Consultation Section */}
          <View style={styles.commentSection}>
            <View style={styles.commentHeader}>
              <MessageCircle size={20} color="#0A2218" />
              <Text style={styles.commentTitle}>Doctor Consultation</Text>
            </View>
            <View style={styles.doctorNote}>
              <Text style={styles.doctorNoteText}>
                Leave a comment or question about this product. Our skin specialist will review your progress and reply here.
              </Text>
            </View>
            
            <View style={styles.inputRow}>
              <TextInput 
                style={styles.input}
                placeholder="Ask a question about this product..."
                value={comment}
                onChangeText={setComment}
                placeholderTextColor="#9CA3AF"
                multiline
              />
              <TouchableOpacity style={styles.sendBtn}>
                <Send size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  pullIndicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 5,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    padding: 24,
    gap: 20,
  },
  imgContainer: {
    width: wp(35),
    height: wp(35),
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  productImg: {
    width: '80%',
    height: '80%',
  },
  titleInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  eyebrow: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(10),
    color: '#059669',
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(20),
    color: '#0A2218',
    marginBottom: 12,
  },
  statusBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusBtnDone: {
    backgroundColor: '#D1FAE5',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
  },
  statusBtnText: {
    fontFamily: AppTypography.semibold,
    fontSize: RFValue(12),
    color: '#4B5563',
  },
  statusBtnTextDone: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(12),
    color: '#059669',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(16),
    color: '#0A2218',
  },
  supplyLabel: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(12),
  },
  supplyBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
    marginBottom: 10,
  },
  supplyBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  supplyAdvice: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(11),
    color: '#6B7280',
    fontStyle: 'italic',
  },
  cardSection: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 30,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 22,
    padding: 16,
    gap: 15,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  infoIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
  },
  cardHeading: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(13),
    color: '#0A2218',
    marginBottom: 4,
  },
  cardText: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(11),
    color: '#4B5563',
    lineHeight: 18,
  },
  altScroll: {
    marginTop: 10,
  },
  altCard: {
    width: wp(30),
    marginRight: 15,
  },
  altImg: {
    width: '100%',
    height: wp(30),
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    marginBottom: 8,
  },
  altBrand: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(8),
    color: '#059669',
    textTransform: 'uppercase',
  },
  altName: {
    fontFamily: AppTypography.semibold,
    fontSize: RFValue(11),
    color: '#0A2218',
  },
  viewStoreBtn: {
    width: wp(30),
    height: wp(30),
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  viewStoreText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(9),
    color: '#059669',
    textAlign: 'center',
  },
  commentSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  commentTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(16),
    color: '#0A2218',
  },
  doctorNote: {
    backgroundColor: '#F0F9FF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#0EA5E9',
  },
  doctorNoteText: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(11),
    color: '#0369A1',
    lineHeight: 17,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    fontFamily: AppTypography.medium,
    fontSize: RFValue(13),
    color: '#0A2218',
    maxHeight: 100,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
