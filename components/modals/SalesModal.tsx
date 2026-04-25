import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { X, ShoppingBag, ArrowRight, Tag } from 'lucide-react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { AppTypography } from '@/constants/design';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const SALE_PRODUCTS = [
  {
    id: 'p1',
    name: 'Radiance Serum',
    price: '$24',
    oldPrice: '$32',
    image: 'https://i.pinimg.com/736x/54/b9/78/54b978a3378725a86974d85b2361915f.jpg'
  },
  {
    id: 'p2',
    name: 'Hydra Cream',
    price: '$18',
    oldPrice: '$28',
    image: 'https://i.pinimg.com/736x/6b/61/2c/6b612cbb2fa0770e6bde590f78e64e1a.jpg'
  }
];

export const SalesModal = ({ data, onClose }: { data: any; onClose: () => void }) => {
  const router = useRouter();

  const handleProductPress = (product: any) => {
    onClose();
    router.push({
      pathname: '/modal-detail',
      params: {
        title: product.name,
        message: `Exclusive deal: Get ${product.name} at ${product.price} today only!`,
        image: product.image,
        type: 'sale'
      }
    });
  };

  return (
    <View style={styles.card}>
      <LinearGradient colors={['#F0FDF4', '#FFFFFF']} style={styles.bgGradient} />

      <View style={styles.header}>
        <View style={styles.saleBadge}>
          <Tag size={12} color="#FFFFFF" fill="#FFFFFF" />
          <Text style={styles.saleBadgeText}>LIMITED OFFER</Text>
        </View>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <X size={20} color="#059669" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Deals for your current skin state</Text>
      <Text style={styles.message}>We've unlocked special pricing for these essentials to help with your dehydration.</Text>

      <View style={styles.productList}>
        {SALE_PRODUCTS.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={styles.productRow}
            activeOpacity={0.8}
            onPress={() => handleProductPress(p)}
          >
            <View style={styles.imgWrap}>
              <Image source={{ uri: p.image }} style={styles.img} />
            </View>
            <View style={styles.info}>
              <Text style={styles.pName}>{p.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{p.price}</Text>
                <Text style={styles.oldPrice}>{p.oldPrice}</Text>
              </View>
            </View>
            <View style={styles.addBtn}>
              <ShoppingBag size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.mainCta} onPress={onClose}>
        <Text style={styles.mainCtaText}>Claim All Offers</Text>
        <ArrowRight size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    padding: 24,
    shadowColor: '#059669',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  bgGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  saleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  saleBadgeText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(10),
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(5, 150, 105, 0.05)',
    justifyContent: 'center', alignItems: 'center',
  },
  title: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(20),
    color: '#0A2218',
    marginBottom: 8,
  },
  message: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(14),
    color: '#6B9E88',
    lineHeight: 20,
    marginBottom: 24,
  },
  productList: {
    gap: 12,
    marginBottom: 24,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.08)',
    shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 5, elevation: 1,
  },
  imgWrap: {
    width: 56, height: 56, borderRadius: 14,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
  },
  img: { width: '100%', height: '100%' },
  info: {
    flex: 1,
    paddingLeft: 14,
  },
  pName: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(14),
    color: '#0A2218',
    marginBottom: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(15),
    color: '#059669',
  },
  oldPrice: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(12),
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  addBtn: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: '#059669',
    justifyContent: 'center', alignItems: 'center',
  },
  mainCta: {
    backgroundColor: '#0A2218',
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  mainCtaText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(16),
    color: '#FFFFFF',
  }
});
