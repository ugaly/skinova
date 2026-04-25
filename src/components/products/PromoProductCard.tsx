import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { Product } from '@/src/types/product';

interface PromoProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export function PromoProductCard({ product, onAddToCart }: PromoProductCardProps) {
  return (
    <View className="mr-3 h-[190px] w-[140px] rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
      <View className="relative overflow-hidden rounded-xl">
        <Image source={{ uri: product.image }} contentFit="cover" className="h-[92px] w-full" />
        {!!product.discount && (
          <View className="absolute right-1 top-1 rounded-full bg-discount px-2 py-0.5">
            <Text className="text-[10px] font-semibold text-white">{product.discount}% OFF</Text>
          </View>
        )}
      </View>
      <Text numberOfLines={2} className="mt-2 text-[12px] font-semibold text-[#1A1A2E]">
        {product.name}
      </Text>
      <View className="mt-1 flex-row items-center">
        <Text className="text-[13px] font-bold text-primary">${product.price.toFixed(2)}</Text>
        {!!product.originalPrice && (
          <Text className="ml-1 text-[11px] text-gray-400 line-through">${product.originalPrice.toFixed(2)}</Text>
        )}
      </View>
      <View className="mt-auto flex-row justify-end">
        <Pressable
          onPress={onAddToCart}
          accessibilityRole="button"
          accessibilityLabel={`Add ${product.name} to cart`}
          className="h-7 w-7 items-center justify-center rounded-full bg-primary">
          <Ionicons name="add" size={16} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}
