import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, Text, useWindowDimensions, View } from 'react-native';

import { BannerSlide } from '@/src/types/product';

interface HeroPromoBannerProps {
  banners: BannerSlide[];
}

export function HeroPromoBanner({ banners }: HeroPromoBannerProps) {
  const listRef = useRef<FlatList<BannerSlide>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();
  const cardWidth = width - 32;

  useEffect(() => {
    if (!banners.length) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % banners.length;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <View>
      <FlatList
        ref={listRef}
        data={banners}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={{ width: cardWidth }} className="overflow-hidden rounded-2xl shadow-lg">
            <Image source={{ uri: item.image }} contentFit="cover" style={{ width: cardWidth, height: 200 }} />
            <View className="absolute inset-0 bg-black/30 p-4">
              <View className="self-start rounded-full bg-discount px-3 py-1">
                <Text className="text-[12px] font-semibold text-white">{item.discount}% OFF</Text>
              </View>
              <View className="mt-auto">
                <Text className="text-[24px] font-bold text-white">{item.title}</Text>
                <Text className="mt-1 text-[13px] text-gray-100">{item.subtitle}</Text>
                <Pressable
                  className="mt-3 self-start rounded-full bg-white px-4 py-2"
                  accessibilityLabel={`Shop ${item.title} offer`}>
                  <Text className="text-[12px] font-semibold text-primary">Shop Now</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
      <View className="mt-3 flex-row items-center justify-center">
        {banners.map((banner, index) => (
          <View
            key={banner.id}
            className={`mx-1 h-2 rounded-full ${index === activeIndex ? 'w-5 bg-primary' : 'w-2 bg-gray-300'}`}
          />
        ))}
      </View>
    </View>
  );
}
