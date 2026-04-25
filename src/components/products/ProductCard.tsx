import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

import { Product } from '@/src/types/product';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onToggleWishlist: () => void;
  compact?: boolean;
}

export function ProductCard({ product, onPress, onToggleWishlist, compact = false }: ProductCardProps) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 48) / 2;
  const compactWidth = 168;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open details for ${product.name}`}
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${compact ? 'mr-3' : 'mb-4'}`}
      style={{ width: compact ? compactWidth : cardWidth }}>
      <View className="relative">
        <Image
          source={{ uri: product.image }}
          contentFit="cover"
          className={`${compact ? 'h-[112px]' : 'h-[130px]'} w-full rounded-t-xl`}
        />
        <Pressable
          onPress={onToggleWishlist}
          accessibilityRole="button"
          accessibilityLabel={`Toggle wishlist for ${product.name}`}
          className="absolute right-2 top-2 h-7 w-7 items-center justify-center rounded-full bg-white/95">
          <Ionicons
            name={product.isWishlisted ? 'heart' : 'heart-outline'}
            size={15}
            color={product.isWishlisted ? '#E63946' : '#374151'}
          />
        </Pressable>
      </View>

      <View className="px-3 pb-3 pt-2">
        <Text className="text-[10px] uppercase tracking-wider text-gray-400">{product.brand}</Text>
        <Text numberOfLines={2} className="mt-1 text-[13px] font-semibold text-[#1A1A2E]">
          {product.name}
        </Text>

        <View className="mt-1 flex-row items-center">
          {Array.from({ length: 5 }).map((_, idx) => {
            const filled = idx < Math.round(product.rating);
            return (
              <Ionicons
                key={`${product.id}-star-${idx}`}
                name={filled ? 'star' : 'star-outline'}
                size={12}
                color={filled ? '#F59E0B' : '#D1D5DB'}
              />
            );
          })}
          <Text className="ml-1 text-[11px] text-gray-500">({product.reviewCount})</Text>
        </View>

        <Text className="mt-1 text-[14px] font-bold text-primary">${product.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}
