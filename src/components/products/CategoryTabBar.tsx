import { useEffect, useRef } from 'react';
import { LayoutChangeEvent, Pressable, ScrollView, Text, View } from 'react-native';

import { Category } from '@/src/types/product';

interface CategoryTabBarProps {
  categories: Category[];
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export function CategoryTabBar({
  categories,
  activeCategory,
  onCategoryChange,
  onLayout,
}: CategoryTabBarProps) {
  const scrollRef = useRef<ScrollView>(null);
  const positionsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const targetX = positionsRef.current[activeCategory];
    if (targetX !== undefined) {
      scrollRef.current?.scrollTo({ x: Math.max(targetX - 20, 0), animated: true });
    }
  }, [activeCategory]);

  return (
    <View onLayout={onLayout}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 py-2">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <Pressable
              key={category}
              onPress={() => onCategoryChange(category)}
              accessibilityRole="button"
              accessibilityLabel={`Category ${category}`}
              onLayout={(event) => {
                positionsRef.current[category] = event.nativeEvent.layout.x;
              }}
              className={`mr-2 rounded-full px-4 py-2 ${
                isActive ? 'bg-[#2D6A4F]' : 'bg-gray-100'
              }`}>
              <Text className={`text-[13px] ${isActive ? 'font-semibold text-white' : 'text-gray-600'}`}>
                {category}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
