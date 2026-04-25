import { BannerSlide, Category, Product } from '@/src/types/product';

export const categories: Category[] = [
  'All',
  'Moisturizer',
  'Serum',
  'Sunscreen',
  'Cleanser',
  'Toner',
  'Mask',
  'Eye Care',
];

const picsum = (seed: string) => `https://picsum.photos/seed/${seed}/600/600`;

export const heroBanners: BannerSlide[] = [
  {
    id: 'b1',
    title: 'Glow Reset Week',
    subtitle: 'Build your AM + PM ritual',
    discount: 35,
    image: picsum('skincare-banner-1'),
    bgColor: '#2D6A4F',
  },
  {
    id: 'b2',
    title: 'Barrier Repair Collection',
    subtitle: 'For dehydrated and reactive skin',
    discount: 28,
    image: picsum('skincare-banner-2'),
    bgColor: '#1F5E46',
  },
  {
    id: 'b3',
    title: 'Daily SPF Event',
    subtitle: 'Lightweight UV protection',
    discount: 22,
    image: picsum('skincare-banner-3'),
    bgColor: '#3A7A59',
  },
  {
    id: 'b4',
    title: 'Clear Pore Bundle',
    subtitle: 'Cleanse + tone + treat',
    discount: 40,
    image: picsum('skincare-banner-4'),
    bgColor: '#265D43',
  },
  {
    id: 'b5',
    title: 'Night Recovery Picks',
    subtitle: 'Wake up with softer skin',
    discount: 30,
    image: picsum('skincare-banner-5'),
    bgColor: '#2B6B4C',
  },
];

export const flashDealProducts: Product[] = Array.from({ length: 8 }).map((_, idx) => {
  const price = 16 + idx * 3;
  const originalPrice = price + 10 + (idx % 3) * 4;
  return {
    id: `f-${idx + 1}`,
    name: ['Vitamin C Serum', 'Hydra Barrier Cream', 'Daily SPF 50', 'Pore Clean Gel'][idx % 4],
    brand: ['Lumea', 'DermaLab', 'PureLeaf'][idx % 3],
    category: ['Serum', 'Moisturizer', 'Sunscreen', 'Cleanser'][idx % 4],
    price,
    originalPrice,
    discount: Math.round(((originalPrice - price) / originalPrice) * 100),
    rating: 4.2 + (idx % 4) * 0.2,
    reviewCount: 80 + idx * 13,
    image: picsum(`flash-${idx + 1}`),
    isWishlisted: false,
    isFeatured: true,
    badge: idx % 2 === 0 ? 'BESTSELLER' : 'NEW',
  };
});

const productSeeds: Array<Pick<Product, 'name' | 'brand' | 'category' | 'badge'>> = [
  { name: 'Ceramide Rescue Cream', brand: 'Lumea', category: 'Moisturizer', badge: 'BESTSELLER' },
  { name: 'Niacinamide 10% Serum', brand: 'PureLeaf', category: 'Serum', badge: 'ORGANIC' },
  { name: 'Invisible SPF 50 Fluid', brand: 'DermaLab', category: 'Sunscreen', badge: 'NEW' },
  { name: 'AHA Gentle Cleanser', brand: 'Lumea', category: 'Cleanser', badge: 'BESTSELLER' },
  { name: 'Balancing Rice Toner', brand: 'GlowForm', category: 'Toner', badge: 'NEW' },
  { name: 'Overnight Cica Mask', brand: 'PureLeaf', category: 'Mask', badge: 'ORGANIC' },
  { name: 'Peptide Eye Revival', brand: 'DermaLab', category: 'Eye Care', badge: 'BESTSELLER' },
];

export const allProducts: Product[] = Array.from({ length: 20 }).map((_, idx) => {
  const seed = productSeeds[idx % productSeeds.length];
  const basePrice = 14 + (idx % 8) * 4 + Math.floor(idx / 6) * 3;
  return {
    id: `p-${idx + 1}`,
    name: seed.name,
    brand: seed.brand,
    category: seed.category,
    price: basePrice,
    originalPrice: idx % 3 === 0 ? basePrice + 8 : undefined,
    discount: idx % 3 === 0 ? 20 : undefined,
    rating: 4 + ((idx % 5) * 0.2),
    reviewCount: 40 + idx * 17,
    image: picsum(`product-${idx + 1}`),
    isWishlisted: idx % 6 === 0,
    badge: seed.badge,
  };
});
