import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Heart, MapPin, Megaphone, ShieldCheck, ShoppingBag, Sparkles, Star, Truck } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

const RELATED_PRODUCTS = [
  {
    id: 'r1',
    name: 'Barrier Restore Cream',
    price: '$52',
    image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331',
    tag: 'Top Match',
  },
  {
    id: 'r2',
    name: 'Hydra Calm Serum',
    price: '$45',
    image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919',
    tag: 'Recommended',
  },
];

export default function ModalDetail2Screen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const title = (params.title as string) || 'Skinova Signature Product';
  const image = (params.image as string) || 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331';
  const message = (params.message as string) || 'Designed for visible glow, hydration, and barrier support.';

  return (
    <View style={styles.screen}>
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <ChevronLeft size={22} color="#0A2218" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Product Details</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Heart size={18} color="#0A2218" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}>
        <View style={{ height: insets.top + 70 }} />

        <View style={styles.heroCard}>
          <LinearGradient colors={['#ECFDF5', '#FFFFFF']} style={StyleSheet.absoluteFillObject} />
          <View style={styles.heroImageWrap}>
            <Image source={{ uri: image }} style={styles.heroImage} contentFit="contain" />
          </View>
          <View style={styles.heroContent}>
            <View style={styles.ratingRow}>
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>4.8 (2.1k reviews)</Text>
            </View>
            <Text style={styles.heroTitle}>{title}</Text>
            <Text style={styles.heroSubtitle}>{message}</Text>
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <ShieldCheck size={12} color="#047857" />
                <Text style={styles.badgeText}>Derm Approved</Text>
              </View>
              <View style={styles.badge}>
                <Truck size={12} color="#047857" />
                <Text style={styles.badgeText}>Fast Delivery</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.adsCard}>
          <View style={styles.adsHeader}>
            <Megaphone size={16} color="#059669" />
            <Text style={styles.adsTitle}>Sponsored Offer</Text>
          </View>
          <Text style={styles.adsMainText}>Buy 2 items and get free mini-kit + 15% off this week.</Text>
          <TouchableOpacity style={styles.adsBtn} activeOpacity={0.9}>
            <Text style={styles.adsBtnText}>Unlock Offer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Why this works for you</Text>
          <Text style={styles.infoText}>
            This formula is selected from your skin profile to improve hydration retention, reduce dullness,
            and support barrier recovery with daily use.
          </Text>
        </View>

        <TouchableOpacity style={styles.supplierCard} activeOpacity={0.9} onPress={() => router.push({
          pathname: '/supplier-map',
          params: { title: title as string || 'Product Suppliers' }
        })}>
          <View style={styles.supplierIconWrap}>
            <Truck size={18} color="#059669" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.supplierTitle}>Recommended Suppliers Nearby</Text>
            <Text style={styles.supplierSub}>Open map to compare nearby partners and star ratings.</Text>
          </View>
          <MapPin size={18} color="#059669" />
        </TouchableOpacity>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>You may also like</Text>
        </View>
        <View style={styles.relatedWrap}>
          {RELATED_PRODUCTS.map((item) => (
            <View key={item.id} style={styles.relatedCard}>
              <Image source={{ uri: item.image }} style={styles.relatedImage} contentFit="contain" />
              <Text style={styles.relatedTag}>{item.tag}</Text>
              <Text style={styles.relatedName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.relatedPrice}>{item.price}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.mainBtn} activeOpacity={0.9}>
          <ShoppingBag size={18} color="#FFFFFF" />
          <Text style={styles.mainBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FCFA' },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(248,252,250,0.98)',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  topTitle: { fontFamily: AppTypography.bold, fontSize: 18, color: '#0A2218' },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  heroCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    marginBottom: 14,
  },
  heroImageWrap: {
    height: 220,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: { width: '72%', height: '80%' },
  heroContent: { padding: 16 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8 },
  ratingText: { fontFamily: AppTypography.semibold, fontSize: 11, color: '#6B7280' },
  heroTitle: { fontFamily: AppTypography.bold, fontSize: 22, color: '#0A2218', marginBottom: 6 },
  heroSubtitle: { fontFamily: AppTypography.medium, fontSize: 13.5, color: '#41574D', lineHeight: 20 },
  badgeRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  badgeText: { fontFamily: AppTypography.bold, fontSize: 10, color: '#047857' },
  adsCard: {
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  adsHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  adsTitle: { fontFamily: AppTypography.bold, fontSize: 14, color: '#0A2218' },
  adsMainText: { fontFamily: AppTypography.medium, fontSize: 13, color: '#5F7169', lineHeight: 20 },
  adsBtn: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#059669',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  adsBtnText: { fontFamily: AppTypography.bold, fontSize: 12, color: '#FFFFFF' },
  infoCard: {
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  sectionRow: { paddingHorizontal: 20, marginBottom: 10 },
  sectionTitle: { fontFamily: AppTypography.bold, fontSize: 17, color: '#0A2218' },
  infoText: { marginTop: 8, fontFamily: AppTypography.medium, fontSize: 13.5, color: '#41574D', lineHeight: 21 },
  supplierCard: {
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    backgroundColor: '#F0FDF4',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  supplierIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supplierTitle: { fontFamily: AppTypography.bold, fontSize: 13, color: '#14532D', marginBottom: 3 },
  supplierSub: { fontFamily: AppTypography.medium, fontSize: 12, color: '#5F7169', lineHeight: 17 },
  relatedWrap: { flexDirection: 'row', paddingHorizontal: 20, gap: 10 },
  relatedCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    padding: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  relatedImage: { width: '100%', height: 90, marginBottom: 8 },
  relatedTag: { fontFamily: AppTypography.bold, fontSize: 10, color: '#059669', marginBottom: 3 },
  relatedName: { fontFamily: AppTypography.bold, fontSize: 12.5, color: '#0A2218', lineHeight: 17 },
  relatedPrice: { fontFamily: AppTypography.semibold, fontSize: 12, color: '#4B5563', marginTop: 6 },
  mainBtn: {
    marginHorizontal: 20,
    marginTop: 18,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 4,
  },
  mainBtnText: { fontFamily: AppTypography.bold, fontSize: 16, color: '#FFFFFF' },
});
