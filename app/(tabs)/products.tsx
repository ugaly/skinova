import { Image } from 'expo-image';
import { ShoppingBag, Star } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

const items = [
  {
    id: '1',
    name: 'Ultimate Beauty Sleep',
    brand: 'Joyce Giraud',
    focus: 'Night Recovery',
    rating: 4.8,
    image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919',
  },
  {
    id: '2',
    name: '2 Min Hair Mask',
    brand: 'Joyce Giraud',
    focus: 'Deep Repair',
    rating: 4.6,
    image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819',
  },
  {
    id: '3',
    name: 'Pure4 Serum',
    brand: 'Joyce Giraud',
    focus: 'Skin Renewal',
    rating: 4.9,
    image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331',
  },
  {
    id: '4',
    name: 'Pet Shampoo',
    brand: 'Joyce Giraud',
    focus: 'Gentle Cleanse',
    rating: 4.5,
    image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142',
  },
];

export default function ProductsTab() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <ShoppingBag size={22} color="#34D399" />
        <Text style={styles.heading}>Your Products</Text>
      </View>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.subText}>Personalized picks from your scan</Text>
        <View style={styles.grid}>
          {items.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.82}>
              <View style={styles.imgWrap}>
                <Image source={{ uri: item.image }} contentFit="contain" style={styles.img} />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardBrand}>{item.brand}</Text>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardFocus}>{item.focus}</Text>
                <View style={styles.ratingRow}>
                  <Star size={12} color="#FBBF24" fill="#FBBF24" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#011A12' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  heading: { fontFamily: AppTypography.bold, fontSize: 26, color: '#ECFDF5' },
  scroll: { paddingHorizontal: 20, paddingTop: 2 },
  subText: { fontFamily: AppTypography.regular, fontSize: 13, color: '#6EE7B7', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  card: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(52,211,153,0.15)',
    overflow: 'hidden',
  },
  imgWrap: {
    height: 130,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: { width: 100, height: 100 },
  cardBody: { padding: 12 },
  cardBrand: { fontFamily: AppTypography.medium, fontSize: 10, color: '#6EE7B7', letterSpacing: 0.5, textTransform: 'uppercase' },
  cardName: { fontFamily: AppTypography.semibold, fontSize: 13, color: '#ECFDF5', marginTop: 2 },
  cardFocus: { fontFamily: AppTypography.regular, fontSize: 11, color: '#A7F3D0', marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  ratingText: { fontFamily: AppTypography.medium, fontSize: 11, color: '#FBBF24' },
});
