import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Animated, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryTabBar } from '@/src/components/products/CategoryTabBar';
import { HeroPromoBanner } from '@/src/components/products/HeroPromoBanner';
import { ProductCard } from '@/src/components/products/ProductCard';
import { PromoProductCard } from '@/src/components/products/PromoProductCard';
import { SearchBar } from '@/src/components/products/SearchBar';
import { useProductsTab } from '@/src/hooks/useProductsTab';

export default function ProductsTabScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const categoryBarY = useRef(0);
  const [showStickyCategory, setShowStickyCategory] = useState(false);
  const [search, setSearch] = useState('');
  const [wishlistMap, setWishlistMap] = useState<Record<string, boolean>>({});

  const {
    activeCategory,
    allProducts,
    cartCount,
    categories,
    flashDealProducts,
    heroBanners,
    isLoading,
    isRefreshing,
    onAddToCart,
    onChangeCategory,
    onRefresh,
  } = useProductsTab();

  const searchedProducts = useMemo(() => {
    if (!search.trim()) return allProducts;
    const needle = search.toLowerCase();
    return allProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(needle) ||
        item.brand.toLowerCase().includes(needle) ||
        item.category.toLowerCase().includes(needle),
    );
  }, [allProducts, search]);

  const categoryDescriptions: Record<string, string> = {
    Moisturizer: 'Deep hydration picks to support a soft, balanced skin barrier.',
    Serum: 'Concentrated actives for glow, tone correction, and texture refinement.',
    Sunscreen: 'Lightweight UV shields for daily protection without white cast.',
    Cleanser: 'Gentle cleansers that remove buildup while respecting skin balance.',
    Toner: 'Prep and rebalance your skin before treatment layers.',
    Mask: 'Targeted treatment masks for weekly reset and visible smoothness.',
    'Eye Care': 'Depuffing and brightening formulas for the delicate eye area.',
  };

  const sectionData = useMemo(() => {
    if (activeCategory !== 'All') {
      return [
        {
          category: activeCategory,
          description: categoryDescriptions[activeCategory] ?? 'Curated products for your skin goals.',
          products: searchedProducts,
        },
      ];
    }

    return categories
      .filter((category) => category !== 'All')
      .map((category) => ({
        category,
        description: categoryDescriptions[category] ?? 'Curated products for your skin goals.',
        products: searchedProducts.filter((product) => product.category === category).slice(0, 8),
      }))
      .filter((section) => section.products.length > 0);
  }, [activeCategory, categories, searchedProducts]);

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: false,
    listener: (event: any) => {
      const y = event.nativeEvent.contentOffset.y;
      setShowStickyCategory(y >= categoryBarY.current);
    },
  });

  return (
    <View className="flex-1 bg-surface">
      <View
        className="absolute left-0 right-0 z-40 bg-surface px-4 pb-3"
        style={{ paddingTop: insets.top + 8 }}>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[12px] text-gray-500">Skincare Store</Text>
            <Text className="text-[28px] font-bold text-[#1A1A2E]">Discover</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open cart"
            className="relative h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
            <Ionicons name="bag-outline" size={22} color="#2D6A4F" />
            <View className="absolute right-1 top-1 min-w-[18px] rounded-full bg-discount px-1">
              <Text className="text-center text-[10px] font-bold text-white">{cartCount}</Text>
            </View>
          </Pressable>
        </View>
      </View>

      {showStickyCategory && (
        <View className="absolute left-0 right-0 z-50 bg-surface shadow-sm" style={{ top: insets.top + 88 }}>
          <CategoryTabBar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onChangeCategory}
          />
        </View>
      )}

      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 pb-32"
        contentContainerStyle={{ paddingTop: insets.top + 104 }}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#2D6A4F" />}>
        <SearchBar value={search} onChangeText={setSearch} onScanPress={() => {}} />

        <View className="mt-5">
          <HeroPromoBanner banners={heroBanners} />
        </View>

        <View className="mt-6">
          <Text className="text-[18px] font-bold text-[#1A1A2E]">🔥 Flash Deals</Text>
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3"
            accessibilityLabel="Flash deals carousel">
            {isLoading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <View key={`flash-skeleton-${idx}`} className="mr-3 h-[190px] w-[140px] rounded-2xl bg-gray-200" />
                ))
              : flashDealProducts.map((product) => (
                  <PromoProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
          </Animated.ScrollView>
        </View>

        <View className="mt-6">
          <CategoryTabBar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onChangeCategory}
            onLayout={(event) => {
              categoryBarY.current = event.nativeEvent.layout.y + insets.top + 88;
            }}
          />
        </View>

        <View className="mt-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <View key={`section-skeleton-${idx}`} className="mb-6">
                  <View className="h-6 w-52 rounded-md bg-gray-200" />
                  <View className="mt-2 h-4 w-72 rounded-md bg-gray-100" />
                  <View className="mt-3 flex-row">
                    {Array.from({ length: 2 }).map((__, cardIdx) => (
                      <View
                        key={`section-skeleton-card-${idx}-${cardIdx}`}
                        className="mr-3 h-[214px] w-[168px] rounded-xl bg-gray-200"
                      />
                    ))}
                  </View>
                </View>
              ))
            : sectionData.map((section) => (
                <View key={section.category} className="mb-7 rounded-2xl border border-gray-200 bg-white p-3">
                  <Text className="text-[18px] font-bold text-[#1A1A2E]">{section.category}</Text>
                  <Text className="mt-1 text-[14px] leading-5 text-gray-500">{section.description}</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mt-3"
                    accessibilityLabel={`${section.category} products`}>
                    {section.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        compact
                        product={{ ...product, isWishlisted: wishlistMap[product.id] ?? product.isWishlisted }}
                        onPress={() => router.push(`/product/${product.id}` as any)}
                        onToggleWishlist={() =>
                          setWishlistMap((prev) => ({ ...prev, [product.id]: !(prev[product.id] ?? product.isWishlisted) }))
                        }
                      />
                    ))}
                  </ScrollView>
                </View>
              ))}
        </View>

        {!isLoading && sectionData.length === 0 && (
          <View className="items-center py-10">
            <Text className="text-[14px] text-gray-500">No products found for your search.</Text>
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
}
