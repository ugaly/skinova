import { useEffect, useMemo, useState } from 'react';

import { allProducts, categories, flashDealProducts, heroBanners } from '@/src/data/mockProducts';
import { Category } from '@/src/types/product';

export function useProductsTab() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [cartCount, setCartCount] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(
    () =>
      activeCategory === 'All'
        ? allProducts
        : allProducts.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  const onChangeCategory = (category: Category) => setActiveCategory(category);

  const onAddToCart = () => setCartCount((prev) => prev + 1);

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1100);
  };

  return {
    activeCategory,
    allProducts: filteredProducts,
    cartCount,
    categories,
    flashDealProducts,
    heroBanners,
    isLoading,
    isRefreshing,
    onAddToCart,
    onChangeCategory,
    onRefresh,
  };
}
