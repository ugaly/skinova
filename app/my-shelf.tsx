import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { ChevronLeft, Plus, Scan, Camera, MoreHorizontal, ShoppingBag, Droplets, Sparkles, Wind } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

import { AppTypography } from '@/constants/design';
import { useJourneyStore } from './store/useJourneyStore';

const CATEGORIES = ['All', 'Creams', 'Serums', 'Cleansers', 'Sunscreen'];

export default function MyShelfScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { items: SHELF_DATA } = useJourneyStore();
  const [activeCat, setActiveCat] = useState('All');

  const filteredItems = activeCat === 'All'
    ? SHELF_DATA
    : SHELF_DATA.filter(item => item.category === activeCat);

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#EDFAF3', '#F2FBF7', '#F9FEFC']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Hero Header Section */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: 'https://i.pinimg.com/1200x/78/1d/1d/781d1d8640f8f405cdcc76eeaffd670a.jpg' }}
          style={styles.heroImg}
          contentFit="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(237, 250, 243, 1)']}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Floating Top Nav */}
        <View style={[styles.headerOverlay, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity style={styles.glassBtn} onPress={() => router.back()}>
            <ChevronLeft size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.heroTitle}>My Shelf</Text>
          <TouchableOpacity style={styles.glassBtn}>
            <MoreHorizontal size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Compact Action Pill */}
        <View style={styles.actionPill}>
          <TouchableOpacity style={styles.pillItem}>
            <Scan size={18} color="#059669" />
            <Text style={styles.pillText}>Scan</Text>
          </TouchableOpacity>
          <View style={styles.pillDivider} />
          <TouchableOpacity style={styles.pillItem}>
            <Plus size={18} color="#059669" />
            <Text style={styles.pillText}>Add New</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        <View style={{ height: hp('5%') }} />
        {/* Spacer for overlap */}

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCat(cat)}
              style={[styles.catChip, activeCat === cat && styles.activeCatChip]}
            >
              <Text style={[styles.catText, activeCat === cat && styles.activeCatText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Gallery Grid or Empty State */}
        <View style={styles.grid}>
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.productCell}
                activeOpacity={0.9}
                onPress={() => router.push({
                  pathname: '/routine-detail',
                  params: {
                    title: item.name,
                    image: item.image,
                    time: 'Daily Usage'
                  }
                } as any)}
              >
                <View style={[styles.imageContainer, { backgroundColor: item.color }]}>
                  <Image source={{ uri: item.image }} style={styles.productImg} contentFit="contain" />
                  {item.usage <= 15 && (
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>Low</Text>
                    </View>
                  )}
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.itemBrand}>{item.brand}</Text>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.usageContainer}>
                    <View style={styles.usageBarBg}>
                      <View style={[styles.usageBarFill, { width: `${item.usage}%`, backgroundColor: item.usage <= 15 ? '#EF4444' : '#10B981' }]} />
                    </View>
                    <Text style={styles.usagePercent}>{item.usage}% left</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <LottieView
                source={require('../assets/bot.json')}
                autoPlay
                loop
                style={styles.emptyLottie}
              />
              <Text style={styles.emptyTitle}>Nothing here yet!</Text>
              <Text style={styles.emptySubtitle}>You don't have any {activeCat.toLowerCase()} in your shelf.</Text>

              <TouchableOpacity
                style={styles.shopBtn}
                onPress={() => router.push('/(tabs)/products' as any)}
              >
                <ShoppingBag size={20} color="#fff" />
                <Text style={styles.shopBtnText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#EDFAF3' },
  heroContainer: {
    height: hp('33%'),
    width: '100%',
    position: 'relative',
    zIndex: 20,
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(20),
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  glassBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  actionPill: {
    position: 'absolute',
    bottom: -25,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 20,
    width: '75%',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100,
  },
  pillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 15,
  },
  pillText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(13),
    color: '#0A2218',
  },
  pillDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#F3F4F6',
  },
  catScroll: {
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 25,
  },
  catChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  activeCatChip: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  catText: {
    fontFamily: AppTypography.semibold,
    fontSize: RFValue(12),
    color: '#4B5563',
  },
  activeCatText: {
    color: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  productCell: {
    width: '50%',
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  imageContainer: {
    height: 180,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  productImg: {
    width: '80%',
    height: '80%',
  },
  statusBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontFamily: AppTypography.bold,
    fontSize: 8,
    color: '#fff',
    textTransform: 'uppercase',
  },
  productInfo: {
    marginTop: 12,
    paddingHorizontal: 4,
  },
  itemBrand: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(10),
    color: '#059669',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  itemName: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(14),
    color: '#0A2218',
    marginBottom: 10,
  },
  usageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  usageBarBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  usageBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  usagePercent: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(9),
    color: '#6B7280',
  },
  emptyContainer: {
    width: wp('100%') - 20,
    alignItems: 'center',
    paddingVertical: hp('5%'),
  },
  emptyLottie: {
    width: 200,
    height: 200,
  },
  emptyTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(18),
    color: '#0A2218',
    marginTop: -20,
  },
  emptySubtitle: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(13),
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
    marginBottom: 25,
  },
  shopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
    gap: 10,
    shadowColor: '#059669',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  shopBtnText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(14),
    color: '#fff',
  }
});
