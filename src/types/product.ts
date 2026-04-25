export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  isWishlisted: boolean;
  isFeatured?: boolean;
  badge?: 'NEW' | 'BESTSELLER' | 'ORGANIC';
}

export interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  discount: number;
  image: string;
  bgColor: string;
}

export type Category =
  | 'All'
  | 'Moisturizer'
  | 'Serum'
  | 'Sunscreen'
  | 'Cleanser'
  | 'Toner'
  | 'Mask'
  | 'Eye Care';
