// import { Image } from 'expo-image';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import {
//   BookMarked,
//   Droplets,
//   Heart,
//   Leaf,
//   ScanLine,
//   Search,
//   ShieldCheck,
//   Sparkles,
//   Sun,
//   Wind,
//   X,
//   Star,
//   TrendingUp,
//   ShoppingBag,
//   ChevronRight,
// } from 'lucide-react-native';
// import { useRef, useState } from 'react';
// import {
//   Animated,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Dimensions,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { AppTypography } from '@/constants/design';

// const { width: SW } = Dimensions.get('window');

// // ── Design tokens ─────────────────────────────────────────────────────────────
// const C = {
//   bg: '#F2FBF7',
//   bgCard: '#FFFFFF',
//   primary: '#059669',
//   primaryLight: '#10B981',
//   primaryDim: 'rgba(5,150,105,0.09)',
//   primaryBorder: 'rgba(5,150,105,0.16)',
//   textDark: '#0A2218',
//   textSub: '#6B9E88',
//   textMuted: '#A8C4B8',
//   border: 'rgba(5,150,105,0.10)',
//   borderMid: 'rgba(5,150,105,0.18)',
//   wishRed: '#F87171',
//   starGold: '#FBBF24',
//   shadow: '#059669',
// };

// // ── Types ─────────────────────────────────────────────────────────────────────
// interface Product {
//   id: string; brand: string; name: string;
//   fit: number; fitColor: string; type: string;
//   image: string; price?: string; rating?: number;
// }
// interface Category {
//   id: string; title: string; description: string;
//   icon: React.ElementType; iconColor: string;
//   products: Product[]; trend?: string;
// }

// // ── Data ──────────────────────────────────────────────────────────────────────
// const ALL_CATEGORIES: Category[] = [
//   {
//     id: 'creams', title: 'Non-Comedogenic Rich Creams',
//     description: 'Rich, non-comedogenic creams that nourish dry, pore-prone skin.',
//     icon: Droplets, iconColor: '#34D399', trend: '+42% this week',
//     products: [
//       { id: 'c1', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 93, fitColor: '#8B5CF6', type: 'Moisturising', price: '$48', rating: 4.8, image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
//       { id: 'c2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 82, fitColor: '#34D399', type: 'Sun Protection', price: '$42', rating: 4.6, image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//       { id: 'c3', brand: 'Joyce Giraud', name: '2-Minute Hair Mask', fit: 78, fitColor: '#34D399', type: 'Hydrating', price: '$35', rating: 4.5, image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819' },
//     ],
//   },
//   {
//     id: 'essences', title: 'Hydrating Pore Essences',
//     description: 'Lightweight essences that help minimize the look of pores.',
//     icon: Wind, iconColor: '#60A5FA', trend: '🔥 Trending',
//     products: [
//       { id: 'e1', brand: 'Joyce Giraud', name: 'Pet Gentle Formula', fit: 60, fitColor: '#34D399', type: 'Treatment', price: '$28', rating: 4.3, image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142' },
//       { id: 'e2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 88, fitColor: '#34D399', type: 'Moisturising', price: '$42', rating: 4.6, image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//       { id: 'e3', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 74, fitColor: '#34D399', type: 'Treatment', price: '$48', rating: 4.8, image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
//     ],
//   },
//   {
//     id: 'exfoliants', title: 'Barrier-Safe Pore Exfoliants',
//     description: 'Gentle exfoliants clear pores without compromising your skin barrier.',
//     icon: Leaf, iconColor: '#86EFAC', trend: '⭐ Top Rated',
//     products: [
//       { id: 'x1', brand: 'Joyce Giraud', name: '2-Minute Hair Mask', fit: 77, fitColor: '#34D399', type: 'Exfoliating', price: '$35', rating: 4.5, image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819' },
//       { id: 'x2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 65, fitColor: '#34D399', type: 'Exfoliating', price: '$42', rating: 4.6, image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//       { id: 'x3', brand: 'Joyce Giraud', name: 'Gentle Cleanse', fit: 81, fitColor: '#34D399', type: 'Cleansing', price: '$32', rating: 4.7, image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142' },
//     ],
//   },
//   {
//     id: 'centella', title: 'Calming Centella Treatments',
//     description: 'Centella soothes sensitive skin while refining visible pores.',
//     icon: ShieldCheck, iconColor: '#FCD34D', trend: '🌿 Sensitive Skin',
//     products: [
//       { id: 't1', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 84, fitColor: '#34D399', type: 'Toning', price: '$48', rating: 4.8, image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
//       { id: 't2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 64, fitColor: '#8B5CF6', type: 'Treatment', price: '$42', rating: 4.6, image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//     ],
//   },
//   {
//     id: 'spf', title: 'Soothing SPF Moisturisers',
//     description: 'Oat-based creams calm sensitive skin and protect against UV damage.',
//     icon: Sun, iconColor: '#FBBF24', trend: '☀️ Best for Summer',
//     products: [
//       { id: 's1', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 92, fitColor: '#8B5CF6', type: 'Moisturising', price: '$42', rating: 4.9, image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//       { id: 's2', brand: 'Joyce Giraud', name: '2-Minute Hair Mask', fit: 88, fitColor: '#8B5CF6', type: 'Treatment', price: '$35', rating: 4.5, image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819' },
//       { id: 's3', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 79, fitColor: '#34D399', type: 'Recovery', price: '$48', rating: 4.8, image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
//     ],
//   },
//   {
//     id: 'glycerin', title: 'Hydrating Glycerin Serums',
//     description: 'Glycerin deeply hydrates dry skin and helps minimise pore appearance.',
//     icon: Sparkles, iconColor: '#A78BFA', trend: '💧 89% Hydration',
//     products: [
//       { id: 'g1', brand: 'Joyce Giraud', name: 'Gentle Cleanse Formula', fit: 88, fitColor: '#34D399', type: 'Moisturising', price: '$32', rating: 4.7, image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142' },
//       { id: 'g2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 87, fitColor: '#34D399', type: 'Moisturising', price: '$42', rating: 4.6, image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//     ],
//   },
// ];

// const SHELF_PRODUCTS = ALL_CATEGORIES[0].products;
// const WISHLIST_PRODUCTS = [ALL_CATEGORIES[1].products[1], ALL_CATEGORIES[2].products[0]];
// const RECENT_PRODUCTS = [ALL_CATEGORIES[0].products[0], ALL_CATEGORIES[3].products[0]];

// const TABS = [
//   { id: 'routine', label: 'For You', icon: Sparkles },
//   { id: 'shelf', label: 'My Shelf', icon: BookMarked },
//   { id: 'wishlist', label: 'Wish List', icon: Heart },
//   { id: 'scan', label: 'Last Scan', icon: ScanLine },
// ];

// const CARD_W = 172;

// // ── Product Card ──────────────────────────────────────────────────────────────
// function ProductCard({
//   item, onWishlist, wishlisted,
// }: { item: Product; onWishlist: () => void; wishlisted: boolean }) {
//   const scaleAnim = useRef(new Animated.Value(1)).current;
//   const pressIn = () => Animated.spring(scaleAnim, { toValue: 0.965, useNativeDriver: true, speed: 30, bounciness: 2 }).start();
//   const pressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20 }).start();

//   const fitLabel = item.fit >= 85 ? 'Top Match' : item.fit >= 70 ? 'Good Fit' : 'Fair Fit';
//   const fitBg = item.fit >= 85 ? '#7C3AED' : item.fit >= 70 ? '#059669' : '#D97706';

//   return (
//     <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
//       <TouchableOpacity activeOpacity={1} onPressIn={pressIn} onPressOut={pressOut} style={styles.card}>

//         {/* Image zone */}
//         <View style={styles.imgZone}>
//           <LinearGradient
//             colors={['#EDF7F2', '#F9FFFE', '#EDF7F2']}
//             start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
//             style={StyleSheet.absoluteFillObject}
//           />
//           <Image source={{ uri: item.image }} contentFit="contain" style={styles.img} />

//           {/* Fit badge — top left */}
//           <View style={[styles.fitBadge, { backgroundColor: fitBg }]}>
//             <Sparkles size={8} color="#fff" strokeWidth={2} />
//             <Text style={styles.fitBadgeText}>{item.fit}%</Text>
//           </View>

//           {/* Wish — top right */}
//           <Pressable style={[styles.wishBtn, wishlisted && styles.wishBtnActive]} onPress={onWishlist}>
//             <Heart size={12} color={wishlisted ? C.wishRed : C.textSub} fill={wishlisted ? C.wishRed : 'transparent'} strokeWidth={2} />
//           </Pressable>

//           {/* Rating — bottom right */}
//           {item.rating && (
//             <View style={styles.ratingBadge}>
//               <Star size={9} color={C.starGold} fill={C.starGold} strokeWidth={0} />
//               <Text style={styles.ratingBadgeText}>{item.rating.toFixed(1)}</Text>
//             </View>
//           )}
//         </View>

//         {/* Info zone */}
//         <View style={styles.cardInfo}>
//           <View style={styles.cardInfoTop}>
//             <Text style={styles.cardBrand}>{item.brand}</Text>
//             <View style={styles.typeChip}>
//               <Text style={styles.typeChipText}>{item.type}</Text>
//             </View>
//           </View>

//           <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>

//           <View style={styles.fitLabelRow}>
//             <View style={[styles.fitLabelDot, { backgroundColor: fitBg }]} />
//             <Text style={[styles.fitLabelText, { color: fitBg }]}>{fitLabel}</Text>
//           </View>

//           {/* Price + Add */}
//           <View style={styles.priceRow}>
//             {item.price
//               ? <Text style={styles.priceText}>{item.price}</Text>
//               : <View />
//             }
//             <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
//               <ShoppingBag size={11} color={C.primary} strokeWidth={2.2} />
//               <Text style={styles.addBtnText}>Add</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// }

// // ── Category Section ──────────────────────────────────────────────────────────
// function CategoryCard({
//   section, wishlist, onWishlist,
// }: { section: Category; wishlist: Record<string, boolean>; onWishlist: (id: string) => void }) {
//   const Icon = section.icon;
//   return (
//     <View style={styles.categorySection}>
//       <LinearGradient
//         colors={[section.iconColor + '18', C.bgCard]}
//         start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
//         style={styles.catHeaderGrad}
//       >
//         <View style={styles.catHeader}>
//           <View style={[styles.catIconWrap, { backgroundColor: section.iconColor + '22' }]}>
//             <Icon size={16} color={section.iconColor} strokeWidth={2} />
//           </View>
//           <View style={{ flex: 1 }}>
//             <View style={styles.catTitleRow}>
//               <Text style={styles.catTitle} numberOfLines={1}>{section.title}</Text>
//               {section.trend && (
//                 <View style={styles.trendBadge}>
//                   <TrendingUp size={9} color={C.primary} strokeWidth={2.2} />
//                   <Text style={styles.trendText}>{section.trend}</Text>
//                 </View>
//               )}
//             </View>
//             <Text style={styles.catDesc}>{section.description}</Text>
//           </View>
//           <ChevronRight size={16} color={C.textMuted} strokeWidth={2} />
//         </View>
//       </LinearGradient>

//       {/* Snap-scrolling product row */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         decelerationRate="fast"
//         snapToInterval={CARD_W + 12}
//         snapToAlignment="start"
//         contentContainerStyle={styles.hScroll}
//       >
//         {section.products.map(p => (
//           <ProductCard key={p.id} item={p} wishlisted={!!wishlist[p.id]} onWishlist={() => onWishlist(p.id)} />
//         ))}
//       </ScrollView>

//       <View style={styles.sectionRule} />
//     </View>
//   );
// }

// // ── Screen ────────────────────────────────────────────────────────────────────
// export default function ProductsTab() {
//   const insets = useSafeAreaInsets();
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState('routine');
//   const [search, setSearch] = useState('');
//   const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
//   const scrollY = useRef(new Animated.Value(0)).current;

//   const toggleWish = (id: string) => setWishlist(p => ({ ...p, [id]: !p[id] }));

//   const headerOpacity = scrollY.interpolate({ inputRange: [0, 50], outputRange: [1, 0], extrapolate: 'clamp' });
//   const headerHeight = scrollY.interpolate({ inputRange: [0, 50], outputRange: [68, 0], extrapolate: 'clamp' });

//   const filtered = (() => {
//     let cats = ALL_CATEGORIES;
//     if (activeTab === 'shelf') return [{ ...ALL_CATEGORIES[0], products: SHELF_PRODUCTS }];
//     if (activeTab === 'wishlist') return [{ ...ALL_CATEGORIES[1], title: 'Saved Products', description: 'Products you have saved for later.', products: WISHLIST_PRODUCTS }];
//     if (activeTab === 'scan') return [{ ...ALL_CATEGORIES[0], title: 'From Your Last Scan', description: 'Recommended from April 24 scan.', products: RECENT_PRODUCTS }];
//     if (search.trim()) {
//       cats = cats
//         .map(c => ({
//           ...c, products: c.products.filter(p =>
//             p.name.toLowerCase().includes(search.toLowerCase()) ||
//             p.type.toLowerCase().includes(search.toLowerCase()),
//           )
//         }))
//         .filter(c => c.products.length > 0);
//     }
//     return cats;
//   })();

//   return (
//     <View style={styles.screen}>
//       <LinearGradient
//         colors={['#EDFAF3', '#F2FBF7', '#F9FEFC']}
//         start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }}
//         style={StyleSheet.absoluteFillObject}
//       />
//       <View style={styles.decorCircle} />

//       {/* ── Fixed header ── */}
//       <View style={{ paddingTop: insets.top }}>

//         {/* Collapsible hero */}
//         <Animated.View style={{ height: headerHeight, opacity: headerOpacity, overflow: 'hidden' }}>
//           <View style={styles.heroRow}>
//             <View>
//               <Text style={styles.eyebrow}>✦ AI Personalised</Text>
//               <Text style={styles.heroTitle}>Products</Text>
//             </View>
//             <TouchableOpacity activeOpacity={0.85}>
//               <LinearGradient
//                 colors={['#10B981', '#059669']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={styles.matchPillGrad}
//               >
//                 <Sparkles size={11} color="#fff" strokeWidth={2} />
//                 <Text style={styles.matchPillText}>78% match</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>

//         {/* Search */}
//         <View style={styles.searchRow}>
//           <View style={styles.searchBar}>
//             <Search size={15} color={C.primary} strokeWidth={2.2} />
//             <TextInput
//               value={search}
//               onChangeText={setSearch}
//               placeholder="Search products, types…"
//               placeholderTextColor={C.textMuted}
//               style={styles.searchInput}
//             />
//             {search.length > 0 && (
//               <Pressable onPress={() => setSearch('')} style={styles.clearBtn}>
//                 <X size={12} color={C.textSub} strokeWidth={2.5} />
//               </Pressable>
//             )}
//             <View style={styles.searchDivider} />
//             <Pressable style={styles.scanBtn} onPress={() => router.push('/face-scan' as any)}>
//               <ScanLine size={15} color={C.primary} strokeWidth={2} />
//               <Text style={styles.scanBtnText}>Scan</Text>
//             </Pressable>
//           </View>
//         </View>

//         {/* Tabs */}
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
//           {TABS.map(t => {
//             const isActive = activeTab === t.id;
//             const Icon = t.icon;
//             return (
//               <Pressable key={t.id} onPress={() => setActiveTab(t.id)} style={[styles.tabChip, isActive && styles.tabChipActive]}>
//                 {isActive && (
//                   <LinearGradient colors={['#10B981', '#059669']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
//                 )}
//                 <Icon size={11} color={isActive ? '#fff' : C.textSub} strokeWidth={2.2} />
//                 <Text style={[styles.tabChipText, isActive && styles.tabChipTextActive]}>{t.label}</Text>
//               </Pressable>
//             );
//           })}
//         </ScrollView>
//       </View>

//       {/* ── Scrollable content ── */}
//       <Animated.ScrollView
//         showsVerticalScrollIndicator={false}
//         onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
//         scrollEventThrottle={16}
//         contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
//       >
//         {filtered.length === 0 && (
//           <View style={styles.emptyState}>
//             <View style={styles.emptyIcon}>
//               <Search size={22} color={C.textMuted} strokeWidth={1.5} />
//             </View>
//             <Text style={styles.emptyTitle}>No products found</Text>
//             <Text style={styles.emptyDesc}>Try a different search or category.</Text>
//           </View>
//         )}
//         {filtered.map(cat => (
//           <CategoryCard key={cat.id} section={cat} wishlist={wishlist} onWishlist={toggleWish} />
//         ))}
//       </Animated.ScrollView>
//     </View>
//   );
// }

// // ── Styles ────────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   screen: { flex: 1, backgroundColor: C.bg },

//   decorCircle: {
//     position: 'absolute', width: 320, height: 320, borderRadius: 160,
//     backgroundColor: C.primaryLight, opacity: 0.05, top: -120, right: -80,
//   },

//   heroRow: {
//     flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between',
//     paddingHorizontal: 20, paddingBottom: 10, paddingTop: 8,
//   },
//   eyebrow: {
//     fontFamily: AppTypography.semibold, fontSize: 11, color: C.primary,
//     textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2,
//   },
//   heroTitle: {
//     fontFamily: AppTypography.bold, fontSize: 28,
//     color: C.textDark, letterSpacing: -0.6, lineHeight: 32,
//   },
//   matchPillGrad: {
//     flexDirection: 'row', alignItems: 'center', gap: 5,
//     paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20,
//     shadowColor: C.primary, shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.28, shadowRadius: 10, elevation: 4,
//   },
//   matchPillText: { fontFamily: AppTypography.bold, fontSize: 12, color: '#fff', letterSpacing: 0.1 },

//   searchRow: { paddingHorizontal: 18, marginBottom: 12 },
//   searchBar: {
//     flexDirection: 'row', alignItems: 'center', gap: 8,
//     borderRadius: 16, paddingHorizontal: 14, paddingVertical: 11,
//     borderWidth: 1.5, borderColor: C.borderMid, backgroundColor: C.bgCard,
//     shadowColor: C.shadow, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 2,
//   },
//   searchInput: { flex: 1, fontFamily: AppTypography.regular, fontSize: 14, color: C.textDark, padding: 0 },
//   clearBtn: {
//     width: 20, height: 20, borderRadius: 10,
//     backgroundColor: 'rgba(0,0,0,0.06)', alignItems: 'center', justifyContent: 'center',
//   },
//   searchDivider: { width: 1, height: 20, backgroundColor: C.borderMid, marginHorizontal: 2 },
//   scanBtn: {
//     flexDirection: 'row', alignItems: 'center', gap: 5,
//     paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10,
//     backgroundColor: C.primaryDim, borderWidth: 1, borderColor: C.primaryBorder,
//   },
//   scanBtnText: { fontFamily: AppTypography.semibold, fontSize: 12, color: C.primary },

//   tabsRow: { paddingHorizontal: 18, gap: 8, flexDirection: 'row', paddingBottom: 14 },
//   tabChip: {
//     flexDirection: 'row', alignItems: 'center', gap: 5,
//     paddingHorizontal: 13, paddingVertical: 8, borderRadius: 22,
//     backgroundColor: C.bgCard, borderWidth: 1.5, borderColor: C.border, overflow: 'hidden',
//     shadowColor: C.textDark, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
//   },
//   tabChipActive: { borderColor: 'transparent', shadowColor: C.primary, shadowOpacity: 0.22, shadowRadius: 8, elevation: 4 },
//   tabChipText: { fontFamily: AppTypography.medium, fontSize: 12, color: C.textSub },
//   tabChipTextActive: { color: '#fff', fontFamily: AppTypography.semibold },

//   scrollContent: { paddingTop: 4 },

//   categorySection: { backgroundColor: C.bgCard, marginBottom: 6 },
//   catHeaderGrad: { paddingTop: 16, paddingBottom: 14, paddingHorizontal: 18 },
//   catHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
//   catIconWrap: {
//     width: 36, height: 36, borderRadius: 12,
//     alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
//   },
//   catTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' },
//   catTitle: { fontFamily: AppTypography.bold, fontSize: 15.5, color: C.textDark, letterSpacing: -0.2, flex: 1 },
//   trendBadge: {
//     flexDirection: 'row', alignItems: 'center', gap: 4,
//     backgroundColor: C.primaryDim, paddingHorizontal: 7, paddingVertical: 3,
//     borderRadius: 10, borderWidth: 1, borderColor: C.primaryBorder,
//   },
//   trendText: { fontFamily: AppTypography.semibold, fontSize: 9.5, color: C.primary },
//   catDesc: { fontFamily: AppTypography.regular, fontSize: 12.5, color: C.textSub, lineHeight: 18 },

//   hScroll: { paddingLeft: 18, paddingRight: 10, paddingBottom: 20, gap: 12 },
//   sectionRule: { height: 1, backgroundColor: C.border },

//   card: {
//     width: CARD_W, borderRadius: 20, backgroundColor: C.bgCard, overflow: 'hidden',
//     shadowColor: C.shadow, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.08, shadowRadius: 14, elevation: 3,
//     borderWidth: 1.5, borderColor: C.border,
//   },
//   imgZone: { height: 172, alignItems: 'center', justifyContent: 'center', position: 'relative' },
//   img: { width: 118, height: 144 },

//   fitBadge: {
//     position: 'absolute', top: 10, left: 10,
//     flexDirection: 'row', alignItems: 'center', gap: 3,
//     paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.18, shadowRadius: 4,
//   },
//   fitBadgeText: { fontFamily: AppTypography.bold, fontSize: 10, color: '#fff', letterSpacing: 0.2 },

//   wishBtn: {
//     position: 'absolute', top: 10, right: 10,
//     width: 30, height: 30, borderRadius: 15,
//     backgroundColor: 'rgba(255,255,255,0.92)', borderWidth: 1, borderColor: C.border,
//     alignItems: 'center', justifyContent: 'center',
//     shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4,
//   },
//   wishBtnActive: { backgroundColor: '#FFF0F0', borderColor: 'rgba(248,113,113,0.25)' },

//   ratingBadge: {
//     position: 'absolute', bottom: 10, right: 10,
//     flexDirection: 'row', alignItems: 'center', gap: 3,
//     backgroundColor: 'rgba(255,255,255,0.92)',
//     paddingHorizontal: 7, paddingVertical: 4, borderRadius: 10,
//     borderWidth: 1, borderColor: 'rgba(251,191,36,0.25)',
//     shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 2,
//   },
//   ratingBadgeText: { fontFamily: AppTypography.bold, fontSize: 10, color: '#92400E' },

//   cardInfo: {
//     paddingHorizontal: 13, paddingTop: 11, paddingBottom: 13,
//     borderTopWidth: 1, borderTopColor: C.border, gap: 4,
//   },
//   cardInfoTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
//   cardBrand: { fontFamily: AppTypography.bold, fontSize: 9.5, color: C.primary, textTransform: 'uppercase', letterSpacing: 0.7 },
//   typeChip: { backgroundColor: C.primaryDim, borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 },
//   typeChipText: { fontFamily: AppTypography.medium, fontSize: 9, color: C.primary },
//   cardName: { fontFamily: AppTypography.bold, fontSize: 13, color: C.textDark, lineHeight: 18, letterSpacing: -0.1 },
//   fitLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
//   fitLabelDot: { width: 6, height: 6, borderRadius: 3 },
//   fitLabelText: { fontFamily: AppTypography.semibold, fontSize: 10.5, letterSpacing: 0.1 },

//   priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
//   priceText: { fontFamily: AppTypography.bold, fontSize: 15, color: C.textDark, letterSpacing: -0.2 },
//   addBtn: {
//     flexDirection: 'row', alignItems: 'center', gap: 4,
//     backgroundColor: C.primaryDim, borderWidth: 1, borderColor: C.primaryBorder,
//     paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12,
//   },
//   addBtnText: { fontFamily: AppTypography.semibold, fontSize: 11, color: C.primary },

//   emptyState: { alignItems: 'center', paddingVertical: 64, gap: 10 },
//   emptyIcon: {
//     width: 56, height: 56, borderRadius: 28,
//     backgroundColor: C.primaryDim, borderWidth: 1.5, borderColor: C.border,
//     alignItems: 'center', justifyContent: 'center', marginBottom: 4,
//   },
//   emptyTitle: { fontFamily: AppTypography.bold, fontSize: 16, color: C.textDark, letterSpacing: -0.2 },
//   emptyDesc: { fontFamily: AppTypography.regular, fontSize: 13, color: C.textSub, textAlign: 'center', paddingHorizontal: 40 },
// });





import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  BookMarked,
  Droplets,
  Heart,
  Leaf,
  ScanLine,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Wind,
  X,
} from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  // Backgrounds
  bg: '#F2FBF7',
  bgCard: '#FFFFFF',
  bgSection: '#FAFFFE',

  // Greens
  primary: '#059669',
  primaryLight: '#10B981',
  primaryDim: 'rgba(5,150,105,0.1)',
  primaryBorder: 'rgba(5,150,105,0.16)',
  primaryGlow: 'rgba(5,150,105,0.12)',

  // Text
  textDark: '#0A2218',
  textMid: '#2D6A4F',
  textSub: '#6B9E88',
  textMuted: '#A8C4B8',
  textOnGreen: '#FFFFFF',

  // Borders
  border: 'rgba(5,150,105,0.1)',
  borderMid: 'rgba(5,150,105,0.18)',

  // Misc
  wishRed: '#F87171',
  shadow: '#059669',
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  brand: string;
  name: string;
  fit: number;
  fitColor: string;
  type: string;
  image: string;
}
interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  products: Product[];
}

// ── Data ──────────────────────────────────────────────────────────────────────
const ALL_CATEGORIES: Category[] = [
  {
    id: 'creams', title: 'Non-Comedogenic Rich Creams',
    description: 'Rich, non-comedogenic creams that nourish dry, pore-prone skin.',
    icon: Droplets, iconColor: '#34D399',
    products: [
      { id: 'c1', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 93, fitColor: '#8B5CF6', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
      { id: 'c2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 82, fitColor: '#34D399', type: 'Sun Protection', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
      { id: 'c3', brand: 'Joyce Giraud', name: '2-Minute Hair Mask', fit: 78, fitColor: '#34D399', type: 'Hydrating', image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819' },
    ],
  },
  {
    id: 'essences', title: 'Hydrating Pore Essences',
    description: 'Lightweight, hydrating essences that help minimize the look of pores.',
    icon: Wind, iconColor: '#60A5FA',
    products: [
      { id: 'e1', brand: 'Joyce Giraud', name: 'Pet Gentle Formula', fit: 60, fitColor: '#34D399', type: 'Treatment', image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142' },
      { id: 'e2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 88, fitColor: '#34D399', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
      { id: 'e3', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 74, fitColor: '#34D399', type: 'Treatment', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
    ],
  },
  {
    id: 'exfoliants', title: 'Barrier-Safe Pore Exfoliants',
    description: 'Gentle exfoliants clear pores without compromising your skin barrier.',
    icon: Leaf, iconColor: '#86EFAC',
    products: [
      { id: 'x1', brand: 'Joyce Giraud', name: '2-Minute Hair Mask', fit: 77, fitColor: '#34D399', type: 'Exfoliating', image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819' },
      { id: 'x2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 65, fitColor: '#34D399', type: 'Exfoliating', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
      { id: 'x3', brand: 'Joyce Giraud', name: 'Gentle Cleanse', fit: 81, fitColor: '#34D399', type: 'Cleansing', image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142' },
    ],
  },
  {
    id: 'centella', title: 'Calming Centella Treatments',
    description: 'Centella soothes your sensitive skin while refining visible pores.',
    icon: ShieldCheck, iconColor: '#FCD34D',
    products: [
      { id: 't1', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 84, fitColor: '#34D399', type: 'Toning', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
      { id: 't2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 64, fitColor: '#8B5CF6', type: 'Treatment', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
    ],
  },
  {
    id: 'spf', title: 'Soothing SPF Moisturisers',
    description: 'Oat-based creams calm sensitive skin and protect against UV damage.',
    icon: Sun, iconColor: '#FBBF24',
    products: [
      { id: 's1', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 92, fitColor: '#8B5CF6', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
      { id: 's2', brand: 'Joyce Giraud', name: '2-Minute Hair Mask', fit: 88, fitColor: '#8B5CF6', type: 'Treatment', image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819' },
      { id: 's3', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 79, fitColor: '#34D399', type: 'Recovery', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
    ],
  },
  {
    id: 'glycerin', title: 'Hydrating Glycerin Serums',
    description: 'Glycerin deeply hydrates dry skin and helps minimise pore appearance.',
    icon: Sparkles, iconColor: '#A78BFA',
    products: [
      { id: 'g1', brand: 'Joyce Giraud', name: 'Gentle Cleanse Formula', fit: 88, fitColor: '#34D399', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142' },
      { id: 'g2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 87, fitColor: '#34D399', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
    ],
  },
];

const SHELF_PRODUCTS = ALL_CATEGORIES[0].products;
const WISHLIST_PRODUCTS = [ALL_CATEGORIES[1].products[1], ALL_CATEGORIES[2].products[0]];
const RECENT_PRODUCTS = [ALL_CATEGORIES[0].products[0], ALL_CATEGORIES[3].products[0]];

const TABS = [
  { id: 'routine', label: 'For You', icon: Sparkles },
  { id: 'shelf', label: 'My Shelf', icon: BookMarked },
  { id: 'wishlist', label: 'Wish List', icon: Heart },
  { id: 'scan', label: 'Recent Scan', icon: ScanLine },
];

// ── Fit score ring ────────────────────────────────────────────────────────────
function FitRing({ fit, color }: { fit: number; color: string }) {
  const size = 36;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (fit / 100) * circ;

  return (
    <View style={[fitRingStyles.wrap, { width: size, height: size }]}>
      <Text style={[fitRingStyles.label, { color }]}>{fit}</Text>
    </View>
  );
}
const fitRingStyles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', borderRadius: 18, borderWidth: 2, borderColor: 'rgba(0,0,0,0.06)', backgroundColor: '#F6FFF9' },
  label: { fontFamily: AppTypography.bold, fontSize: 10, letterSpacing: -0.3 },
});

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({
  item, onWishlist, wishlisted,
}: { item: Product; onWishlist: () => void; wishlisted: boolean }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, speed: 30, bounciness: 2 }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20 }).start();

  // Fit label colors
  const fitLabel = item.fit >= 85 ? 'Top Match' : item.fit >= 70 ? 'Good Fit' : 'Fair Fit';
  const fitBg = item.fit >= 85 ? '#8B5CF6' : item.fit >= 70 ? '#10B981' : '#F59E0B';

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        {/* Image area */}
        <View style={styles.imgWrap}>
          {/* Subtle mesh gradient backdrop */}
          <LinearGradient
            colors={['#EDF7F2', '#F8FFFD', '#EDF7F2']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <Image source={{ uri: item.image }} contentFit="contain" style={styles.img} />

          {/* Wish button */}
          <Pressable style={[styles.wishBtn, wishlisted && styles.wishBtnActive]} onPress={onWishlist}>
            <Heart
              size={12}
              color={wishlisted ? C.wishRed : C.textSub}
              fill={wishlisted ? C.wishRed : 'transparent'}
              strokeWidth={2.2}
            />
          </Pressable>

          {/* Fit badge — bottom left of image */}
          <View style={[styles.fitBadge, { backgroundColor: fitBg }]}>
            <Text style={styles.fitBadgeText}>{item.fit}%</Text>
          </View>
        </View>

        {/* Info area */}
        <View style={styles.cardInfo}>
          <View style={styles.cardInfoTop}>
            <Text style={styles.cardBrand}>{item.brand}</Text>
            <View style={[styles.typeChip]}>
              <Text style={styles.typeChipText}>{item.type}</Text>
            </View>
          </View>
          <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>

          {/* Fit match label */}
          <View style={styles.fitLabelRow}>
            <View style={[styles.fitLabelDot, { backgroundColor: fitBg }]} />
            <Text style={[styles.fitLabelText, { color: fitBg }]}>{fitLabel}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Category Section ──────────────────────────────────────────────────────────
function CategoryCard({
  section, wishlist, onWishlist,
}: { section: Category; wishlist: Record<string, boolean>; onWishlist: (id: string) => void }) {
  const Icon = section.icon;

  return (
    <View style={styles.categorySection}>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        <View style={[styles.sectionIconWrap, { backgroundColor: section.iconColor + '1A' }]}>
          <Icon size={14} color={section.iconColor} strokeWidth={2.2} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionDesc}>{section.description}</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{section.products.length}</Text>
        </View>
      </View>

      {/* Horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hScroll}
      >
        {section.products.map((p) => (
          <ProductCard
            key={p.id}
            item={p}
            wishlisted={!!wishlist[p.id]}
            onWishlist={() => onWishlist(p.id)}
          />
        ))}
      </ScrollView>

      {/* Bottom rule */}
      <View style={styles.sectionRule} />
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function ProductsTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('routine');
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const scrollY = useRef(new Animated.Value(0)).current;

  const toggleWish = (id: string) => setWishlist(p => ({ ...p, [id]: !p[id] }));

  const headerOpacity = scrollY.interpolate({ inputRange: [0, 50], outputRange: [1, 0], extrapolate: 'clamp' });
  const headerHeight = scrollY.interpolate({ inputRange: [0, 50], outputRange: [68, 0], extrapolate: 'clamp' });

  const filtered = (() => {
    let cats = ALL_CATEGORIES;
    if (activeTab === 'shelf') return [{ ...ALL_CATEGORIES[0], products: SHELF_PRODUCTS }];
    if (activeTab === 'wishlist') return [{ ...ALL_CATEGORIES[1], title: 'Saved Products', description: 'Products you have saved for later.', products: WISHLIST_PRODUCTS }];
    if (activeTab === 'scan') return [{ ...ALL_CATEGORIES[0], title: 'From Your Last Scan', description: 'Products recommended from April 24 scan.', products: RECENT_PRODUCTS }];
    if (search.trim()) {
      cats = cats.map(c => ({
        ...c,
        products: c.products.filter(p =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.type.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(c => c.products.length > 0);
    }
    return cats;
  })();

  return (
    <View style={styles.screen}>
      {/* Background */}
      <LinearGradient
        colors={['#EDFAF3', '#F2FBF7', '#F9FEFC']}
        start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Decorative top circle */}
      <View style={styles.decorCircle} />

      {/* ── Fixed header ── */}
      <View style={{ paddingTop: insets.top }}>

        {/* Collapsible hero row */}
        <Animated.View style={{ height: headerHeight, opacity: headerOpacity, overflow: 'hidden' }}>
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.eyebrow}>✦ AI Personalised</Text>
              <Text style={styles.heroTitle}>Products</Text>
            </View>
            <View style={styles.matchPill}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.matchPillGrad}
              >
                <Sparkles size={11} color="#fff" strokeWidth={2} />
                <Text style={styles.matchPillText}>78% match</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        {/* Search bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Search size={15} color={C.primary} strokeWidth={2.2} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search products, types…"
              placeholderTextColor={C.textMuted}
              style={styles.searchInput}
            />
            {search.length > 0 && (
              <Pressable onPress={() => setSearch('')} style={styles.clearBtn}>
                <X size={12} color={C.textSub} strokeWidth={2.5} />
              </Pressable>
            )}
            {/* Divider */}
            <View style={styles.searchDivider} />
            <Pressable
              style={styles.scanBtn}
              onPress={() => router.push('/face-scan' as any)}
            >
              <ScanLine size={16} color={C.primary} strokeWidth={2} />
              <Text style={styles.scanBtnText}>Scan</Text>
            </Pressable>
          </View>
        </View>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {TABS.map(t => {
            const isActive = activeTab === t.id;
            const Icon = t.icon;
            return (
              <Pressable
                key={t.id}
                onPress={() => setActiveTab(t.id)}
                style={[styles.tabChip, isActive && styles.tabChipActive]}
              >
                {isActive ? (
                  <LinearGradient
                    colors={['#10B981', '#059669']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFillObject}
                  />
                ) : null}
                <Icon
                  size={11}
                  color={isActive ? '#fff' : C.textSub}
                  strokeWidth={2.2}
                />
                <Text style={[styles.tabChipText, isActive && styles.tabChipTextActive]}>
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Scrollable content ── */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
      >
        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Search size={22} color={C.textMuted} strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyDesc}>Try a different search term or category.</Text>
          </View>
        )}
        {filtered.map(cat => (
          <CategoryCard key={cat.id} section={cat} wishlist={wishlist} onWishlist={toggleWish} />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const CARD_W = 168;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },

  // Decorative circle
  decorCircle: {
    position: 'absolute',
    width: 320, height: 320, borderRadius: 160,
    backgroundColor: C.primaryLight,
    opacity: 0.055,
    top: -120, right: -80,
  },

  // ── Hero row ──────────────────────────────────────────────────────────────
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 8,
  },
  eyebrow: {
    fontFamily: AppTypography.semibold,
    fontSize: 11,
    color: C.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  heroTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 28,
    color: C.textDark,
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  matchPill: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  matchPillGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  matchPillText: {
    fontFamily: AppTypography.bold,
    fontSize: 12,
    color: '#fff',
    letterSpacing: 0.1,
  },

  // ── Search ────────────────────────────────────────────────────────────────
  searchRow: { paddingHorizontal: 18, marginBottom: 12 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 1.5,
    borderColor: C.borderMid,
    backgroundColor: C.bgCard,
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontFamily: AppTypography.regular,
    fontSize: 14,
    color: C.textDark,
    padding: 0,
  },
  clearBtn: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  searchDivider: {
    width: 1, height: 20,
    backgroundColor: C.borderMid,
    marginHorizontal: 2,
  },
  scanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: C.primaryDim,
    borderWidth: 1,
    borderColor: C.primaryBorder,
  },
  scanBtnText: {
    fontFamily: AppTypography.semibold,
    fontSize: 12,
    color: C.primary,
  },

  // ── Tabs ──────────────────────────────────────────────────────────────────
  tabsRow: {
    paddingHorizontal: 18,
    gap: 8,
    flexDirection: 'row',
    paddingBottom: 14,
  },
  tabChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 22,
    backgroundColor: C.bgCard,
    borderWidth: 1.5,
    borderColor: C.border,
    overflow: 'hidden',
    shadowColor: C.textDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  tabChipActive: {
    borderColor: 'transparent',
    shadowColor: C.primary,
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },
  tabChipText: {
    fontFamily: AppTypography.medium,
    fontSize: 12,
    color: C.textSub,
  },
  tabChipTextActive: {
    color: '#fff',
    fontFamily: AppTypography.semibold,
  },

  // ── Scroll ────────────────────────────────────────────────────────────────
  scrollContent: { paddingTop: 4 },

  // ── Category section ──────────────────────────────────────────────────────
  categorySection: {
    backgroundColor: C.bgCard,
    marginBottom: 6,
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  sectionIconWrap: {
    width: 34, height: 34, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  sectionTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 15.5,
    color: C.textDark,
    letterSpacing: -0.2,
    marginBottom: 3,
    lineHeight: 21,
  },
  sectionDesc: {
    fontFamily: AppTypography.regular,
    fontSize: 12.5,
    color: C.textSub,
    lineHeight: 18,
  },
  countBadge: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: C.primaryDim,
    borderWidth: 1, borderColor: C.primaryBorder,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  countBadgeText: {
    fontFamily: AppTypography.bold,
    fontSize: 11,
    color: C.primary,
  },
  hScroll: {
    paddingLeft: 18,
    paddingRight: 10,
    paddingBottom: 20,
    gap: 12,
  },
  sectionRule: {
    height: 1,
    backgroundColor: C.border,
    marginHorizontal: 0,
  },

  // ── Product card ──────────────────────────────────────────────────────────
  card: {
    width: CARD_W,
    borderRadius: 20,
    backgroundColor: C.bgCard,
    overflow: 'hidden',
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: C.border,
  },

  // Image
  imgWrap: {
    height: 168,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  img: { width: 115, height: 140 },

  // Wish button — top right
  wishBtn: {
    position: 'absolute',
    top: 10, right: 10,
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  wishBtnActive: {
    backgroundColor: '#FFF0F0',
    borderColor: 'rgba(248,113,113,0.25)',
  },

  // Fit badge — bottom left of image
  fitBadge: {
    position: 'absolute',
    bottom: 10, left: 10,
    borderRadius: 10,
    paddingHorizontal: 8, paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
  fitBadgeText: {
    fontFamily: AppTypography.bold,
    fontSize: 10,
    color: '#fff',
    letterSpacing: 0.2,
  },

  // Info area
  cardInfo: {
    paddingHorizontal: 13,
    paddingTop: 11,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: C.border,
    gap: 4,
  },
  cardInfoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  cardBrand: {
    fontFamily: AppTypography.bold,
    fontSize: 9.5,
    color: C.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  typeChip: {
    backgroundColor: C.primaryDim,
    borderRadius: 8,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  typeChipText: {
    fontFamily: AppTypography.medium,
    fontSize: 9,
    color: C.primary,
    letterSpacing: 0.2,
  },
  cardName: {
    fontFamily: AppTypography.bold,
    fontSize: 13,
    color: C.textDark,
    lineHeight: 18,
    letterSpacing: -0.1,
  },
  fitLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  fitLabelDot: {
    width: 6, height: 6, borderRadius: 3,
  },
  fitLabelText: {
    fontFamily: AppTypography.semibold,
    fontSize: 11,
    letterSpacing: 0.1,
  },

  // ── Empty state ───────────────────────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    gap: 10,
  },
  emptyIcon: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(5,150,105,0.07)',
    borderWidth: 1.5, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    fontFamily: AppTypography.bold,
    fontSize: 16,
    color: C.textDark,
    letterSpacing: -0.2,
  },
  emptyDesc: {
    fontFamily: AppTypography.regular,
    fontSize: 13,
    color: C.textSub,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});