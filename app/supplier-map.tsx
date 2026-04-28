import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Clock3, MapPin, Store, UserRound, ShieldCheck, ChevronRight } from 'lucide-react-native';
import React, { useMemo, useRef } from 'react';
import { Animated, Dimensions, PanResponder, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type Supplier = {
  id: string;
  name: string;
  provider: 'Bolt' | 'Uber' | 'Local';
  rating: number;
  reviews: number;
  eta: string;
  distanceKm: number;
  lat: number;
  lng: number;
};

const TANZANIA_REGION: Region = {
  latitude: -6.7924,
  longitude: 39.2083,
  latitudeDelta: 0.22,
  longitudeDelta: 0.22,
};

const RIDE_STYLE = [
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', stylers: [{ color: '#F1F5F9' }] },
  { featureType: 'landscape.natural', stylers: [{ color: '#F8FAFC' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#E5E7EB' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#475569' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#CBD5E1' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#CFFAFE' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#F8FAFC' }] },
];

const SUPPLIERS: Supplier[] = [
  { id: 's1', name: 'Skinova Dar Hub', provider: 'Bolt', rating: 4.8, reviews: 241, eta: '12 min', distanceKm: 2.1, lat: -6.7924, lng: 39.2083 },
  { id: 's2', name: 'Glow Pharm Upanga', provider: 'Uber', rating: 4.6, reviews: 198, eta: '16 min', distanceKm: 3.4, lat: -6.807, lng: 39.2908 },
  { id: 's3', name: 'Dermastore Mwenge', provider: 'Local', rating: 4.9, reviews: 312, eta: '9 min', distanceKm: 1.6, lat: -6.7833, lng: 39.2683 },
  { id: 's4', name: 'Ocean View Skin Shop', provider: 'Bolt', rating: 4.5, reviews: 157, eta: '20 min', distanceKm: 4.9, lat: -6.77, lng: 39.29 },
];

export default function SupplierMapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const title = (params.title as string) || 'Recommended Suppliers';

  const minHeight = SCREEN_HEIGHT * 0.3; // 30%
  const midHeight = SCREEN_HEIGHT * 0.75; // 75%
  const maxHeight = SCREEN_HEIGHT; // full screen
  const sheetMaxHeight = maxHeight;

  const collapsedY = SCREEN_HEIGHT - minHeight;
  const midY = SCREEN_HEIGHT - midHeight;
  const expandedY = 0;

  const snapPoints = useMemo(() => [collapsedY, midY, expandedY], [collapsedY, midY, expandedY]);

  const sheetY = useRef(new Animated.Value(collapsedY)).current;
  const startYRef = useRef(collapsedY);

  const headerOpacity = sheetY.interpolate({
    inputRange: [expandedY, midY, collapsedY],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });
  const headerTranslateY = sheetY.interpolate({
    inputRange: [expandedY, collapsedY],
    outputRange: [-8, 0],
    extrapolate: 'clamp',
  });
  const mapOpacity = sheetY.interpolate({
    inputRange: [expandedY, expandedY + 60, midY, collapsedY],
    outputRange: [0, 0, 0.6, 1],
    extrapolate: 'clamp',
  });
  const sheetRadius = sheetY.interpolate({
    inputRange: [expandedY, midY, collapsedY],
    outputRange: [0, 14, 24],
    extrapolate: 'clamp',
  });
  const sheetBorderWidth = sheetY.interpolate({
    inputRange: [expandedY, expandedY + 30, midY, collapsedY],
    outputRange: [0, 0, 1, 1],
    extrapolate: 'clamp',
  });

  const snapToClosest = (targetY: number) => {
    let nextSnap = collapsedY;
    if (targetY <= (expandedY + midY) / 2) nextSnap = expandedY;
    else if (targetY <= (midY + collapsedY) / 2) nextSnap = midY;
    else nextSnap = collapsedY;

    Animated.spring(sheetY, {
      toValue: nextSnap,
      useNativeDriver: false,
      damping: 24,
      stiffness: 300,
      mass: 0.8,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 2,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        sheetY.stopAnimation((value) => {
          startYRef.current = value;
        });
      },
      onPanResponderMove: (_, gestureState) => {
        const next = startYRef.current + gestureState.dy;
        const clamped = Math.max(expandedY, Math.min(collapsedY, next));
        sheetY.setValue(clamped);
      },
      onPanResponderRelease: (_, gestureState) => {
        const projected = startYRef.current + gestureState.dy + gestureState.vy * 140;
        snapToClosest(projected);
      },
    })
  ).current;

  return (
    <View style={styles.screen}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: mapOpacity }]}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={TANZANIA_REGION}
          customMapStyle={RIDE_STYLE as any}
          showsCompass
          showsUserLocation={false}
        >
          {SUPPLIERS.map((supplier) => (
            <Marker
              key={supplier.id}
              coordinate={{ latitude: supplier.lat, longitude: supplier.lng }}
              title={supplier.name}
              description={`${supplier.provider} • ${supplier.rating}★`}
            >
              <View style={styles.markerWrap}>
                <View
                  style={[
                    styles.markerPill,
                    styles.markerSimple,
                  ]}
                >
                  <ShieldCheck size={14} color="#FFFFFF" />
                </View>
                <View
                  style={[
                    styles.markerPointer,
                    styles.markerPointerSimple,
                  ]}
                />
              </View>
            </Marker>
          ))}
        </MapView>
      </Animated.View>

      <Animated.View
        style={[
          styles.topBar,
          {
            top: insets.top + 10,
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={22} color="#0A2218" />
        </TouchableOpacity>
        <View style={styles.topTitleWrap}>
          <Text style={styles.topLabel}>Map - Tanzania</Text>
          <Text style={styles.topTitle} numberOfLines={1}>{title}</Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.sheet,
          {
            height: sheetMaxHeight,
            transform: [{ translateY: sheetY }],
            borderTopLeftRadius: sheetRadius,
            borderTopRightRadius: sheetRadius,
            borderWidth: sheetBorderWidth,
          },
        ]}
      >
        <View style={styles.dragHandleWrap} {...panResponder.panHandlers}>
          <View style={styles.dragHandle} />
        </View>

        <View style={styles.sheetHeader} {...panResponder.panHandlers}>
          <Text style={styles.sheetTitle}>Nearby Supplier Listings</Text>
          <View style={styles.sheetBadge}>
            <MapPin size={12} color="#047857" />
            <Text style={styles.sheetBadgeText}>Tanzania Focus</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          {SUPPLIERS.map((supplier) => (
            <View key={supplier.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.providerIconWrap}>
                  <Store size={14} color="#047857" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{supplier.name}</Text>
                  <View style={styles.metaRow}>
                    <Clock3 size={12} color="#6B7280" />
                    <Text style={styles.metaText}>{supplier.eta}</Text>
                    <Text style={styles.dot}>•</Text>
                    <UserRound size={12} color="#6B7280" />
                    <Text style={styles.metaText}>{supplier.distanceKm} km away</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.productsMiniBtn} activeOpacity={0.85}>
                  <Text style={styles.productsMiniBtnText}>Products</Text>
                  <ChevronRight size={14} color="#065F46" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#E5E7EB' },
  topBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTitleWrap: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  topLabel: { fontFamily: AppTypography.semibold, fontSize: 11, color: '#059669' },
  topTitle: { fontFamily: AppTypography.bold, fontSize: 14, color: '#0A2218', marginTop: 2 },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  dragHandleWrap: {
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 12,
    minHeight: 52,
    justifyContent: 'center',
  },
  dragHandle: {
    width: 54,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
    marginBottom: 6,
  },
  sheetHeader: {
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 62,
  },
  sheetTitle: { fontFamily: AppTypography.bold, fontSize: 17, color: '#0A2218' },
  sheetBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  sheetBadgeText: { fontFamily: AppTypography.bold, fontSize: 10, color: '#047857' },
  listContent: { paddingHorizontal: 14, paddingBottom: 22, gap: 10 },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 12,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  providerIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontFamily: AppTypography.bold, fontSize: 14, color: '#0A2218', marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { fontFamily: AppTypography.medium, fontSize: 11.5, color: '#6B7280' },
  dot: { color: '#9CA3AF' },
  productsMiniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  productsMiniBtnText: {
    fontFamily: AppTypography.bold,
    fontSize: 10.5,
    color: '#065F46',
  },
  markerWrap: {
    alignItems: 'center',
  },
  markerPill: {
    width: 34,
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  markerSimple: {
    backgroundColor: '#059669',
    borderColor: '#14532D',
  },
  markerPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1.5,
  },
  markerPointerSimple: { borderTopColor: '#059669' },
});
