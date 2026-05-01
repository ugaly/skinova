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
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { AppTypography } from '@/constants/design';

// // ── Design tokens ─────────────────────────────────────────────────────────────
// const C = {
//   // Backgrounds
//   bg: '#F7FCFA',
//   bgCard: '#FFFFFF',
//   bgSection: '#FAFFFE',

//   // Greens
//   primary: '#059669',
//   primaryLight: '#10B981',
//   primaryDim: 'rgba(5,150,105,0.1)',
//   primaryBorder: 'rgba(5,150,105,0.16)',
//   primaryGlow: 'rgba(5,150,105,0.12)',

//   // Text
//   textDark: '#0A2218',
//   textMid: '#2D6A4F',
//   textSub: '#6B9E88',
//   textMuted: '#A8C4B8',
//   textOnGreen: '#FFFFFF',

//   // Borders
//   border: 'rgba(15,23,42,0.08)',
//   borderMid: 'rgba(15,23,42,0.14)',

//   // Misc
//   wishRed: '#F87171',
//   shadow: '#059669',
// };

// // ── Types ─────────────────────────────────────────────────────────────────────
// interface Product {
//   id: string;
//   brand: string;
//   name: string;
//   fit: number;
//   fitColor: string;
//   type: string;
//   image: string;
// }
// interface Category {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ElementType;
//   iconColor: string;
//   products: Product[];
// }

// // ── Data ──────────────────────────────────────────────────────────────────────
// const ALL_CATEGORIES: Category[] = [
//   {
//     id: 'creams', title: 'Non-Comedogenic Rich Creams',
//     description: 'Rich, non-comedogenic creams that nourish dry, pore-prone skin.',
//     icon: Droplets, iconColor: '#34D399',
//     products: [
//       { id: 'c1', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 93, fitColor: '#8B5CF6', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
//       { id: 'c2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 82, fitColor: '#34D399', type: 'Sun Protection', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//       { id: 'c3', brand: 'Joyce Giraud', name: '2-Minute Hair Mask', fit: 78, fitColor: '#34D399', type: 'Hydrating', image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819' },
//     ],
//   },
//   {
//     id: 'essences', title: 'Hydrating Pore Essences',
//     description: 'Lightweight, hydrating essences that help minimize the look of pores.',
//     icon: Wind, iconColor: '#60A5FA',
//     products: [
//       { id: 'e1', brand: 'Joyce Giraud', name: 'Pet Gentle Formula', fit: 60, fitColor: '#34D399', type: 'Treatment', image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142' },
//       { id: 'e2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 88, fitColor: '#34D399', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//       { id: 'e3', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 74, fitColor: '#34D399', type: 'Treatment', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
//     ],
//   },
//   {
//     id: 'exfoliants', title: 'Barrier-Safe Pore Exfoliants',
//     description: 'Gentle exfoliants clear pores without compromising your skin barrier.',
//     icon: Leaf, iconColor: '#86EFAC',
//     products: [
//       { id: 'x1', brand: 'Joyce Giraud', name: '2-Minute Hair Mask', fit: 77, fitColor: '#34D399', type: 'Exfoliating', image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819' },
//       { id: 'x2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 65, fitColor: '#34D399', type: 'Exfoliating', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//       { id: 'x3', brand: 'Joyce Giraud', name: 'Gentle Cleanse', fit: 81, fitColor: '#34D399', type: 'Cleansing', image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142' },
//     ],
//   },
//   {
//     id: 'centella', title: 'Calming Centella Treatments',
//     description: 'Centella soothes your sensitive skin while refining visible pores.',
//     icon: ShieldCheck, iconColor: '#FCD34D',
//     products: [
//       { id: 't1', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 84, fitColor: '#34D399', type: 'Toning', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
//       { id: 't2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 64, fitColor: '#8B5CF6', type: 'Treatment', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//     ],
//   },
//   {
//     id: 'spf', title: 'Soothing SPF Moisturisers',
//     description: 'Oat-based creams calm sensitive skin and protect against UV damage.',
//     icon: Sun, iconColor: '#FBBF24',
//     products: [
//       { id: 's1', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 92, fitColor: '#8B5CF6', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//       { id: 's2', brand: 'Joyce Giraud', name: '2-Minute Hair Mask', fit: 88, fitColor: '#8B5CF6', type: 'Treatment', image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819' },
//       { id: 's3', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 79, fitColor: '#34D399', type: 'Recovery', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
//     ],
//   },
//   {
//     id: 'glycerin', title: 'Hydrating Glycerin Serums',
//     description: 'Glycerin deeply hydrates dry skin and helps minimise pore appearance.',
//     icon: Sparkles, iconColor: '#A78BFA',
//     products: [
//       { id: 'g1', brand: 'Joyce Giraud', name: 'Gentle Cleanse Formula', fit: 88, fitColor: '#34D399', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142' },
//       { id: 'g2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 87, fitColor: '#34D399', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
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
//   { id: 'scan', label: 'Recent Scan', icon: ScanLine },
// ];

// // ── Fit score ring ────────────────────────────────────────────────────────────
// function FitRing({ fit, color }: { fit: number; color: string }) {
//   const size = 36;
//   const stroke = 3;
//   const r = (size - stroke) / 2;
//   const circ = 2 * Math.PI * r;
//   const dash = (fit / 100) * circ;

//   return (
//     <View style={[fitRingStyles.wrap, { width: size, height: size }]}>
//       <Text style={[fitRingStyles.label, { color }]}>{fit}</Text>
//     </View>
//   );
// }
// const fitRingStyles = StyleSheet.create({
//   wrap: { alignItems: 'center', justifyContent: 'center', borderRadius: 18, borderWidth: 2, borderColor: 'rgba(0,0,0,0.06)', backgroundColor: '#F6FFF9' },
//   label: { fontFamily: AppTypography.bold, fontSize: 10, letterSpacing: -0.3 },
// });

// // ── Product Card ──────────────────────────────────────────────────────────────
// function ProductCard({
//   item, onWishlist, wishlisted,
// }: { item: Product; onWishlist: () => void; wishlisted: boolean }) {
//   const scaleAnim = useRef(new Animated.Value(1)).current;

//   const handlePressIn = () =>
//     Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, speed: 30, bounciness: 2 }).start();
//   const handlePressOut = () =>
//     Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20 }).start();

//   // Fit label colors
//   const fitLabel = item.fit >= 85 ? 'Top Match' : item.fit >= 70 ? 'Good Fit' : 'Fair Fit';
//   const fitBg = item.fit >= 85 ? '#8B5CF6' : item.fit >= 70 ? '#10B981' : '#F59E0B';

//   return (
//     <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
//       <TouchableOpacity
//         activeOpacity={1}
//         onPressIn={handlePressIn}
//         onPressOut={handlePressOut}
//         style={styles.card}
//       >
//         {/* Image area */}
//         <View style={styles.imgWrap}>
//           {/* Subtle mesh gradient backdrop */}
//           <LinearGradient
//             colors={['#EDF7F2', '#F8FFFD', '#EDF7F2']}
//             start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
//             style={StyleSheet.absoluteFillObject}
//           />
//           <Image source={{ uri: item.image }} contentFit="contain" style={styles.img} />

//           {/* Wish button */}
//           <Pressable style={[styles.wishBtn, wishlisted && styles.wishBtnActive]} onPress={onWishlist}>
//             <Heart
//               size={12}
//               color={wishlisted ? C.wishRed : C.textSub}
//               fill={wishlisted ? C.wishRed : 'transparent'}
//               strokeWidth={2.2}
//             />
//           </Pressable>

//           {/* Fit badge — bottom left of image */}
//           <View style={[styles.fitBadge, { backgroundColor: fitBg }]}>
//             <Text style={styles.fitBadgeText}>{item.fit}%</Text>
//           </View>
//         </View>

//         {/* Info area */}
//         <View style={styles.cardInfo}>
//           <View style={styles.cardInfoTop}>
//             <Text style={styles.cardBrand}>{item.brand}</Text>
//             <View style={[styles.typeChip]}>
//               <Text style={styles.typeChipText}>{item.type}</Text>
//             </View>
//           </View>
//           <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>

//           {/* Fit match label */}
//           <View style={styles.fitLabelRow}>
//             <View style={[styles.fitLabelDot, { backgroundColor: fitBg }]} />
//             <Text style={[styles.fitLabelText, { color: fitBg }]}>{fitLabel}</Text>
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
//       {/* Section header */}
//       <View style={styles.sectionHeader}>
//         <View style={[styles.sectionIconWrap, { backgroundColor: section.iconColor + '1A' }]}>
//           <Icon size={14} color={section.iconColor} strokeWidth={2.2} />
//         </View>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.sectionTitle}>{section.title}</Text>
//           <Text style={styles.sectionDesc}>{section.description}</Text>
//         </View>
//         <View style={styles.countBadge}>
//           <Text style={styles.countBadgeText}>{section.products.length}</Text>
//         </View>
//       </View>

//       {/* Horizontal scroll */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.hScroll}
//       >
//         {section.products.map((p) => (
//           <ProductCard
//             key={p.id}
//             item={p}
//             wishlisted={!!wishlist[p.id]}
//             onWishlist={() => onWishlist(p.id)}
//           />
//         ))}
//       </ScrollView>

//       {/* Bottom rule */}
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
//     if (activeTab === 'scan') return [{ ...ALL_CATEGORIES[0], title: 'From Your Last Scan', description: 'Products recommended from April 24 scan.', products: RECENT_PRODUCTS }];
//     if (search.trim()) {
//       cats = cats.map(c => ({
//         ...c,
//         products: c.products.filter(p =>
//           p.name.toLowerCase().includes(search.toLowerCase()) ||
//           p.type.toLowerCase().includes(search.toLowerCase())
//         ),
//       })).filter(c => c.products.length > 0);
//     }
//     return cats;
//   })();

//   return (
//     <View style={styles.screen}>
//       {/* Background */}
//       <LinearGradient
//         colors={['#EDFAF3', '#F2FBF7', '#F9FEFC']}
//         start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }}
//         style={StyleSheet.absoluteFillObject}
//       />
//       {/* Decorative top circle */}
//       <View style={styles.decorCircle} />

//       {/* ── Fixed header ── */}
//       <View style={[styles.fixedTop, { paddingTop: insets.top }]}>

//         {/* Collapsible hero row */}
//         <Animated.View style={{ height: headerHeight, opacity: headerOpacity, overflow: 'hidden' }}>
//           <View style={styles.heroRow}>
//             <View>
//               <Text style={styles.eyebrow}>✦ AI Personalised</Text>
//               <Text style={styles.heroTitle}>Products</Text>
//             </View>
//             <View style={styles.matchPill}>
//               <LinearGradient
//                 colors={['#10B981', '#059669']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={styles.matchPillGrad}
//               >
//                 <Sparkles size={11} color="#fff" strokeWidth={2} />
//                 <Text style={styles.matchPillText}>78% match</Text>
//               </LinearGradient>
//             </View>
//           </View>
//         </Animated.View>

//         {/* Search bar */}
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
//             {/* Divider */}
//             <View style={styles.searchDivider} />
//             <Pressable
//               style={styles.scanBtn}
//               onPress={() => router.push('/face-scan' as any)}
//             >
//               <ScanLine size={16} color={C.primary} strokeWidth={2} />
//               <Text style={styles.scanBtnText}>Scan</Text>
//             </Pressable>
//           </View>
//         </View>

//         {/* Tabs */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.tabsRow}
//         >
//           {TABS.map(t => {
//             const isActive = activeTab === t.id;
//             const Icon = t.icon;
//             return (
//               <Pressable
//                 key={t.id}
//                 onPress={() => setActiveTab(t.id)}
//                 style={[styles.tabChip, isActive && styles.tabChipActive]}
//               >
//                 {isActive ? (
//                   <LinearGradient
//                     colors={['#10B981', '#059669']}
//                     start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                     style={StyleSheet.absoluteFillObject}
//                   />
//                 ) : null}
//                 <Icon
//                   size={11}
//                   color={isActive ? '#fff' : C.textSub}
//                   strokeWidth={2.2}
//                 />
//                 <Text style={[styles.tabChipText, isActive && styles.tabChipTextActive]}>
//                   {t.label}
//                 </Text>
//               </Pressable>
//             );
//           })}
//         </ScrollView>
//       </View>

//       {/* ── Scrollable content ── */}
//       <Animated.ScrollView
//         showsVerticalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//         scrollEventThrottle={16}
//         contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
//       >
//         {filtered.length === 0 && (
//           <View style={styles.emptyState}>
//             <View style={styles.emptyIcon}>
//               <Search size={22} color={C.textMuted} strokeWidth={1.5} />
//             </View>
//             <Text style={styles.emptyTitle}>No products found</Text>
//             <Text style={styles.emptyDesc}>Try a different search term or category.</Text>
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
// const CARD_W = 168;

// const styles = StyleSheet.create({
//   screen: { flex: 1, backgroundColor: C.bg },
//   fixedTop: {
//     backgroundColor: 'rgba(255,255,255,0.94)',
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(15,23,42,0.06)',
//     shadowColor: '#0F172A',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.06,
//     shadowRadius: 14,
//     elevation: 3,
//   },

//   // Decorative circle
//   decorCircle: {
//     position: 'absolute',
//     width: 320, height: 320, borderRadius: 160,
//     backgroundColor: C.primaryLight,
//     opacity: 0.03,
//     top: -120, right: -80,
//   },

//   // ── Hero row ──────────────────────────────────────────────────────────────
//   heroRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//     paddingTop: 8,
//   },
//   eyebrow: {
//     fontFamily: AppTypography.semibold,
//     fontSize: 11,
//     color: C.primary,
//     textTransform: 'uppercase',
//     letterSpacing: 0.8,
//     marginBottom: 2,
//   },
//   heroTitle: {
//     fontFamily: AppTypography.bold,
//     fontSize: 28,
//     color: C.textDark,
//     letterSpacing: -0.6,
//     lineHeight: 32,
//   },
//   matchPill: {
//     borderRadius: 20,
//     overflow: 'hidden',
//     shadowColor: C.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.28,
//     shadowRadius: 10,
//     elevation: 4,
//   },
//   matchPillGrad: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//     paddingHorizontal: 12,
//     paddingVertical: 7,
//     borderRadius: 20,
//   },
//   matchPillText: {
//     fontFamily: AppTypography.bold,
//     fontSize: 12,
//     color: '#fff',
//     letterSpacing: 0.1,
//   },

//   // ── Search ────────────────────────────────────────────────────────────────
//   searchRow: { paddingHorizontal: 18, marginBottom: 12 },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     borderRadius: 16,
//     paddingHorizontal: 14,
//     paddingVertical: 11,
//     borderWidth: 1,
//     borderColor: C.borderMid,
//     backgroundColor: C.bgCard,
//     shadowColor: C.shadow,
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 1,
//   },
//   searchInput: {
//     flex: 1,
//     fontFamily: AppTypography.regular,
//     fontSize: 14,
//     color: C.textDark,
//     padding: 0,
//   },
//   clearBtn: {
//     width: 20, height: 20, borderRadius: 10,
//     backgroundColor: 'rgba(0,0,0,0.06)',
//     alignItems: 'center', justifyContent: 'center',
//   },
//   searchDivider: {
//     width: 1, height: 20,
//     backgroundColor: C.borderMid,
//     marginHorizontal: 2,
//   },
//   scanBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 10,
//     backgroundColor: C.primaryDim,
//     borderWidth: 1,
//     borderColor: C.primaryBorder,
//   },
//   scanBtnText: {
//     fontFamily: AppTypography.semibold,
//     fontSize: 12,
//     color: C.primary,
//   },

//   // ── Tabs ──────────────────────────────────────────────────────────────────
//   tabsRow: {
//     paddingHorizontal: 18,
//     gap: 8,
//     flexDirection: 'row',
//     paddingBottom: 14,
//   },
//   tabChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//     paddingHorizontal: 13,
//     paddingVertical: 8,
//     borderRadius: 22,
//     backgroundColor: C.bgCard,
//     borderWidth: 1,
//     borderColor: C.border,
//     overflow: 'hidden',
//     shadowColor: C.textDark,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 1,
//   },
//   tabChipActive: {
//     borderColor: 'transparent',
//     shadowColor: C.primary,
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 4,
//   },
//   tabChipText: {
//     fontFamily: AppTypography.medium,
//     fontSize: 12,
//     color: C.textSub,
//   },
//   tabChipTextActive: {
//     color: '#fff',
//     fontFamily: AppTypography.semibold,
//   },

//   // ── Scroll ────────────────────────────────────────────────────────────────
//   scrollContent: { paddingTop: 8 },

//   // ── Category section ──────────────────────────────────────────────────────
//   categorySection: {
//     backgroundColor: C.bgCard,
//     marginBottom: 10,
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: 'rgba(15,23,42,0.06)',
//     shadowColor: '#0F172A',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.04,
//     shadowRadius: 10,
//     elevation: 2,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     gap: 10,
//     paddingHorizontal: 18,
//     marginBottom: 14,
//   },
//   sectionIconWrap: {
//     width: 34, height: 34, borderRadius: 12,
//     alignItems: 'center', justifyContent: 'center',
//     flexShrink: 0,
//     marginTop: 1,
//   },
//   sectionTitle: {
//     fontFamily: AppTypography.bold,
//     fontSize: 16,
//     color: C.textDark,
//     letterSpacing: -0.2,
//     marginBottom: 3,
//     lineHeight: 21,
//   },
//   sectionDesc: {
//     fontFamily: AppTypography.regular,
//     fontSize: 12.5,
//     color: '#5F7169',
//     lineHeight: 18,
//   },
//   countBadge: {
//     width: 24, height: 24, borderRadius: 12,
//     backgroundColor: C.primaryDim,
//     borderWidth: 1, borderColor: C.primaryBorder,
//     alignItems: 'center', justifyContent: 'center',
//     flexShrink: 0,
//   },
//   countBadgeText: {
//     fontFamily: AppTypography.bold,
//     fontSize: 11,
//     color: C.primary,
//   },
//   hScroll: {
//     paddingLeft: 18,
//     paddingRight: 10,
//     paddingBottom: 20,
//     gap: 12,
//   },
//   sectionRule: {
//     height: 1,
//     backgroundColor: C.border,
//     marginHorizontal: 0,
//   },

//   // ── Product card ──────────────────────────────────────────────────────────
//   card: {
//     width: CARD_W,
//     borderRadius: 20,
//     backgroundColor: C.bgCard,
//     overflow: 'hidden',
//     shadowColor: C.shadow,
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.09,
//     shadowRadius: 16,
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: 'rgba(15,23,42,0.1)',
//   },

//   // Image
//   imgWrap: {
//     height: 168,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(15,23,42,0.06)',
//   },
//   img: { width: 115, height: 140 },

//   // Wish button — top right
//   wishBtn: {
//     position: 'absolute',
//     top: 10, right: 10,
//     width: 30, height: 30, borderRadius: 15,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     borderWidth: 1, borderColor: C.border,
//     alignItems: 'center', justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 4,
//   },
//   wishBtnActive: {
//     backgroundColor: '#FFF0F0',
//     borderColor: 'rgba(248,113,113,0.25)',
//   },

//   // Fit badge — bottom left of image
//   fitBadge: {
//     position: 'absolute',
//     bottom: 10, left: 10,
//     borderRadius: 10,
//     paddingHorizontal: 8, paddingVertical: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.18,
//     shadowRadius: 4,
//   },
//   fitBadgeText: {
//     fontFamily: AppTypography.bold,
//     fontSize: 10,
//     color: '#fff',
//     letterSpacing: 0.2,
//   },

//   // Info area
//   cardInfo: {
//     paddingHorizontal: 13,
//     paddingTop: 11,
//     paddingBottom: 14,
//     borderTopWidth: 1,
//     borderTopColor: C.border,
//     gap: 4,
//   },
//   cardInfoTop: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 2,
//   },
//   cardBrand: {
//     fontFamily: AppTypography.bold,
//     fontSize: 9.5,
//     color: C.primary,
//     textTransform: 'uppercase',
//     letterSpacing: 0.7,
//   },
//   typeChip: {
//     backgroundColor: '#ECFDF5',
//     borderRadius: 8,
//     paddingHorizontal: 6, paddingVertical: 2,
//     borderWidth: 1,
//     borderColor: 'rgba(5,150,105,0.15)',
//   },
//   typeChipText: {
//     fontFamily: AppTypography.medium,
//     fontSize: 9,
//     color: C.primary,
//     letterSpacing: 0.2,
//   },
//   cardName: {
//     fontFamily: AppTypography.bold,
//     fontSize: 13,
//     color: C.textDark,
//     lineHeight: 18,
//     letterSpacing: -0.1,
//   },
//   fitLabelRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//     marginTop: 4,
//   },
//   fitLabelDot: {
//     width: 6, height: 6, borderRadius: 3,
//   },
//   fitLabelText: {
//     fontFamily: AppTypography.semibold,
//     fontSize: 11,
//     letterSpacing: 0.1,
//   },

//   // ── Empty state ───────────────────────────────────────────────────────────
//   emptyState: {
//     alignItems: 'center',
//     paddingVertical: 64,
//     gap: 10,
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: 'rgba(15,23,42,0.06)',
//   },
//   emptyIcon: {
//     width: 56, height: 56, borderRadius: 28,
//     backgroundColor: 'rgba(5,150,105,0.07)',
//     borderWidth: 1.5, borderColor: C.border,
//     alignItems: 'center', justifyContent: 'center',
//     marginBottom: 4,
//   },
//   emptyTitle: {
//     fontFamily: AppTypography.bold,
//     fontSize: 16,
//     color: C.textDark,
//     letterSpacing: -0.2,
//   },
//   emptyDesc: {
//     fontFamily: AppTypography.regular,
//     fontSize: 13,
//     color: C.textSub,
//     textAlign: 'center',
//     paddingHorizontal: 40,
//   },
// });
























// import { Image } from 'expo-image';
// import { useRouter } from 'expo-router';
// import { ChevronLeft, MoreHorizontal, Check } from 'lucide-react-native';
// import { useRef, useState, useEffect } from 'react';
// import {
//   Animated,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { AppTypography } from '@/constants/design';
// import { RFValue } from "react-native-responsive-fontsize";
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from "react-native-responsive-screen";

// // ── Types ─────────────────────────────────────────────────────────────────────
// interface RoutineItem {
//   id: string;
//   name: string;
//   step: string;
//   image: string;
//   bgColor: string;
//   checked: boolean;
// }

// // ── Data ──────────────────────────────────────────────────────────────────────
// const LEFT_COLUMN: RoutineItem[] = [
//   {
//     id: 'l1',
//     name: '100% Organic\nFruit Oil',
//     step: 'Step 1',
//     image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331',
//     bgColor: '#EDF4FF', // Soft blue
//     checked: true,
//   },
//   {
//     id: 'l2',
//     name: 'Acid Powder',
//     step: 'Step 3',
//     image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919',
//     bgColor: '#F4EFFF', // Soft purple
//     checked: false,
//   },
// ];

// const RIGHT_COLUMN: RoutineItem[] = [
//   {
//     id: 'r1',
//     name: 'Mineral UV\nFilters SPF',
//     step: 'Step 2',
//     image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819',
//     bgColor: '#FFF0E5', // Soft peach/beige
//     checked: true,
//   },
//   {
//     id: 'r2',
//     name: 'Niacinamide\n10% + Zinc 1%',
//     step: 'Step 4',
//     image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142',
//     bgColor: '#FFF0E5', // Soft peach/beige
//     checked: false,
//   },
// ];

// // ── Helpers ───────────────────────────────────────────────────────────────────
// function generateDates() {
//   const dates = [];
//   const today = new Date();

//   // Calculate the most recent Monday
//   const dayOfWeek = today.getDay();
//   const distToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

//   const monday = new Date(today);
//   monday.setDate(today.getDate() + distToMonday);

//   // Generate 7 days from Monday to Sunday
//   for (let i = 0; i < 7; i++) {
//     const d = new Date(monday);
//     d.setDate(monday.getDate() + i);
//     dates.push({
//       dateObj: d,
//       dayNum: d.getDate(),
//       dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
//       isToday: d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear(),
//     });
//   }
//   return dates;
// }

// // ── Product Card ──────────────────────────────────────────────────────────────
// function ProductCard({
//   item,
//   textPosition,
// }: {
//   item: RoutineItem;
//   textPosition: 'top' | 'bottom';
// }) {
//   const scale = useRef(new Animated.Value(1)).current;
//   const onPressIn = () => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
//   const onPressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

//   const ImageBlock = () => (
//     <View style={[styles.imageBox, { backgroundColor: item.bgColor }]}>
//       <Image source={{ uri: item.image }} style={styles.image} contentFit="contain" />
//       {/* Circle tick badge */}
//       {item.checked ? (
//         <View style={[styles.tickBadge, styles.tickBadgeActive]}>
//           <Check size={12} color="#fff" strokeWidth={3} />
//         </View>
//       ) : (
//         <View style={styles.tickBadgeEmpty} />
//       )}
//     </View>
//   );

//   const TextBlock = () => (
//     <View style={[styles.textBlock, textPosition === 'top' ? styles.textBlockTop : styles.textBlockBottom]}>
//       <Text style={styles.productName}>{item.name}</Text>
//       <Text style={styles.productStep}>{item.step}</Text>
//     </View>
//   );

//   return (
//     <Animated.View style={[{ transform: [{ scale }] }, styles.cardWrap]}>
//       <TouchableOpacity activeOpacity={1} onPressIn={onPressIn} onPressOut={onPressOut}>
//         {textPosition === 'top' && <TextBlock />}
//         <ImageBlock />
//         {textPosition === 'bottom' && <TextBlock />}
//       </TouchableOpacity>
//     </Animated.View>
//   );
// }

// // ── Screen ────────────────────────────────────────────────────────────────────
// export default function DailyRoutineScreen() {
//   const insets = useSafeAreaInsets();
//   const router = useRouter();
//   const [dates, setDates] = useState(() => generateDates());

//   return (
//     <View style={[styles.screen, { paddingTop: insets.top }]}>
//       {/* ── Header ── */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
//           <ChevronLeft size={22} color="#1C1C1E" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Daily routine</Text>
//         <TouchableOpacity style={styles.iconBtnShadow}>
//           <MoreHorizontal size={20} color="#1C1C1E" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
//         {/* ── Dates Row ── */}
//         <View style={styles.datesContainer}>
//           <View style={styles.datesBg}>
//             {dates.map((d, i) => (
//               <View key={i} style={[styles.dateItem, d.isToday && styles.dateItemActive]}>
//                 <Text style={[styles.dateNum, d.isToday && styles.dateNumActive]}>{d.dayNum}</Text>
//                 <Text style={[styles.dateName, d.isToday && d.isToday && styles.dateNameActive]}>{d.dayName}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* ── Grid ── */}
//         <View style={styles.grid}>
//           {/* Left Column (Image then text) */}
//           <View style={styles.column}>
//             {LEFT_COLUMN.map((item) => (
//               <ProductCard key={item.id} item={item} textPosition="bottom" />
//             ))}
//           </View>

//           {/* Right Column (Text then Image, causing layout stagger) */}
//           <View style={styles.column}>
//             {RIGHT_COLUMN.map((item) => (
//               <ProductCard key={item.id} item={item} textPosition="top" />
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// // ── Styles ────────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: '#FAFAFC', // Very light gray from the design
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//   },
//   headerTitle: {
//     fontFamily: AppTypography.bold,
//     fontSize: 17,
//     color: '#1C1C1E',
//   },
//   iconBtn: {
//     width: 40,
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   iconBtnShadow: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },

//   // Dates
//   datesContainer: {
//     paddingHorizontal: wp('4.5%'),
//     marginTop: hp('1.2%'),
//     marginBottom: hp('2.5%'),
//   },
//   datesBg: {
//     backgroundColor: '#fff',
//     borderRadius: wp('6%'),
//     paddingVertical: hp('0.8%'),
//     paddingHorizontal: wp('2%'),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.02,
//     shadowRadius: 10,
//     elevation: 1,
//   },
//   dateItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: wp('11.5%'),
//     height: hp('9%'),
//     borderRadius: wp('5%'),
//   },
//   dateItemActive: {
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 3,
//   },
//   dateNum: {
//     fontFamily: AppTypography.bold,
//     fontSize: RFValue(17),
//     color: '#1C1C1E',
//     marginBottom: hp('0.3%'),
//   },
//   dateNumActive: {
//     color: '#1C1C1E',
//   },
//   dateName: {
//     fontFamily: AppTypography.medium,
//     fontSize: RFValue(9.5),
//     color: '#9CA3AF',
//   },
//   dateNameActive: {
//     color: '#1C1C1E',
//     fontFamily: AppTypography.bold,
//   },

//   // Grid
//   grid: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     gap: 16,
//   },
//   column: {
//     flex: 1,
//     gap: 20,
//   },

//   // Product Card
//   cardWrap: {
//     marginBottom: 10,
//   },
//   imageBox: {
//     borderRadius: 28,
//     height: 180,
//     padding: 20,
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   tickBadge: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   tickBadgeActive: {
//     backgroundColor: '#1C1C1E',
//   },
//   tickBadgeEmpty: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: 'rgba(255,255,255,0.6)',
//   },

//   textBlock: {
//     paddingHorizontal: 4,
//   },
//   textBlockTop: {
//     marginBottom: 12,
//   },
//   textBlockBottom: {
//     marginTop: 12,
//   },
//   productName: {
//     fontFamily: AppTypography.bold,
//     fontSize: 14,
//     color: '#1C1C1E',
//     lineHeight: 18,
//     marginBottom: 4,
//   },
//   productStep: {
//     fontFamily: AppTypography.medium,
//     fontSize: 12,
//     color: '#9CA3AF',
//   },
// });









import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Video, ResizeMode } from 'expo-av';
import { Heart, ArrowRight, Scan, ChevronLeft, ShoppingBag } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { LinearGradient } from 'expo-linear-gradient';

import { AppTypography } from '@/constants/design';

const CATEGORIES = ['All', 'Skincare', 'Makeup', 'Serum', 'Cleanser'];

const ADS = [
  {
    id: 9,
    eyebrow: '',
    title: '',
    image: 'https://i.pinimg.com/1200x/c1/0c/dc/c10cdc5f757a22a90d8f36a30b47474a.jpg',
    colors: ['#FFFFFF', '#FFFFFF'],
    type: 'image-only'
  },
  // {
  //   id: 1,
  //   eyebrow: 'FIND THE RIGHT',
  //   title: 'Cream for Your Skin',
  //   image: 'https://www.joycegiraud.com/cdn/shop/files/3-month-product-image_720_500x.png?v=1725447192',
  //   colors: ['#D1FAE5', '#A7F3D0'],
  //   type: 'side-image'
  // },
  
  // {
  //   id: 3,
  //   eyebrow: 'PRO CARE EDIT',
  //   title: 'Botanical Repair Mask in 2 Minutes',
  //   image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819',
  //   colors: ['#EAFBF6', '#99E5D1'],
  //   type: 'image-left'
  // },
  {
    id: 4,
    eyebrow: '',
    title: '',
    image: 'https://i.pinimg.com/1200x/2f/4d/bc/2f4dbc5525d9019b5679e774ab6cc7ca.jpg',
    colors: ['#FFFFFF', '#FFFFFF'],
    type: 'image-only'
  },
  {
    id: 5,
    eyebrow: '',
    title: '',
    image: 'https://i.pinimg.com/1200x/8e/7e/0d/8e7e0d061a419483105ae3c2d227b0d0.jpg',
    colors: ['#FFFFFF', '#FFFFFF'],
    type: 'image-only'
  },
  {
    id: 6,
    eyebrow: '',
    title: '',
    image: 'https://i.pinimg.com/1200x/8b/c7/70/8bc770c177d2ca9acb264d5b0ce3353a.jpg',
    colors: ['#FFFFFF', '#FFFFFF'],
    type: 'image-only'
  },
  // {
  //   id: 2,
  //   eyebrow: 'LIMITED TIME GLOW DEAL',
  //   title: 'Save 20% on Premium Beauty Serums',
  //   image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331',
  //   colors: ['#FFF8E8', '#FDE68A'],
  //   type: 'centered'
  // },
  {
    id: 7,
    eyebrow: '',
    title: '',
    image: 'https://i.pinimg.com/1200x/6e/d1/8a/6ed18af94c41110e135dd1bd0205769d.jpg',
    colors: ['#FFFFFF', '#FFFFFF'],
    type: 'image-only'
  },
  {
    id: 8,
    eyebrow: '',
    title: '',
    image: 'https://i.pinimg.com/1200x/cf/43/d7/cf43d7458b9608fafe2967da8435d97e.jpg',
    colors: ['#FFFFFF', '#FFFFFF'],
    type: 'image-only'
  },
];





const PRODUCTS = [
  { id: 1, name: 'Tatcha Water Cream', price: '$68', image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142', color: '#FFF3F6', liked: true, fit: 92 },
  { id: 2, name: 'La Mer Soft Cream', price: '$190', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331', color: '#EAF6FF', liked: false, fit: 85 },
  {
    id: 6,
    name: 'Hydra Boost Video',
    price: '$49',
    image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919',
    color: '#E0F2F1',
    liked: true,
    fit: 83,
    videoUrl: 'https://v1.pinimg.com/videos/iht/hls/e3/c9/6f/e3c96fac3810f116a513258a82653e72_540w.cmfv',
  },
  { id: 3, name: 'Radiance Serum', price: '$45', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919', color: '#FDF7E2', liked: false, fit: 78 },
  { id: 4, name: 'Hydra Mist', price: '$32', image: 'https://www.joycegiraud.com/cdn/shop/t/42/assets/NOURISHINGCONDITIONER.png?v=108449484283680266711728966512', color: '#F3F4F6', liked: true, fit: 64 },
  {
    id: 5,
    name: 'Glow Essence Video',
    price: '$59',
    image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331',
    color: '#EEF2FF',
    liked: false,
    fit: 88,
    videoUrl: 'https://v1.pinimg.com/videos/iht/hls/50/e8/d1/50e8d1a0803472bfb3db1bdc02ed3c19_720w.cmfv',
  },
  {
    id: 7,
    name: 'Radiant Care Video',
    price: '$54',
    image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819',
    color: '#F3F4F6',
    liked: false,
    fit: 90,
    videoUrl: 'https://v1.pinimg.com/videos/iht/hls/1e/cc/30/1ecc302633124b5a8cd83d253e54ef8d_540w.cmfv',
  },
  
];

export default function ProductsTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeCat, setActiveCat] = useState('All');
  const [adIndex, setAdIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % ADS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentAd = ADS[adIndex];

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <ChevronLeft size={22} color="#0A2218" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Our Products</Text>
          <TouchableOpacity style={styles.headerIconBtn}>
            <ShoppingBag size={20} color="#0A2218" />
          </TouchableOpacity>
        </View>

        {/* Dynamic Promo Banner */}
        <View style={styles.bannerContainer}>
          <LinearGradient colors={currentAd.colors as any} style={styles.banner}>
            {currentAd.type === 'image-only' && (
              <Image source={{ uri: currentAd.image }} style={styles.imageOnlyBannerImage} contentFit="cover" />
            )}
            <View style={styles.bannerGlow} />
            <View style={styles.bannerGlowSmall} />
            {currentAd.type === 'side-image' && (
              <>
                <View style={styles.bannerText}>
                  <Text style={styles.bannerEyebrow}>{currentAd.eyebrow}</Text>
                  <Text style={[styles.bannerTitle, { width: '65%' }]}>{currentAd.title}</Text>
                </View>
                <Image source={{ uri: currentAd.image }} style={styles.bannerImg} />
              </>
            )}
            {currentAd.type === 'centered' && (
              <View style={[styles.bannerText, { alignItems: 'center', width: '100%', paddingRight: 0 }]}>
                <Image
                  source={{ uri: currentAd.image }}
                  style={[styles.bannerImg, { position: 'absolute', right: 0, opacity: 0.2, width: 200, height: 200, transform: [{ rotate: '15deg' }] }]}
                />
                <Text style={styles.bannerEyebrow}>{currentAd.eyebrow}</Text>
                <Text style={[styles.bannerTitle, { textAlign: 'center', width: '90%' }]}>{currentAd.title}</Text>
              </View>
            )}
            {currentAd.type === 'image-left' && (
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Image source={{ uri: currentAd.image }} style={[styles.bannerImg, { position: 'relative', left: -20, width: hp(15), height: hp(15), transform: [{ rotate: '0deg' }] }]} />
                <View style={{ paddingLeft: 10, flex: 1 }}>
                  <Text style={styles.bannerEyebrow}>{currentAd.eyebrow}</Text>
                  <Text style={[styles.bannerTitle, { width: '100%' }]}>{currentAd.title}</Text>
                </View>
              </View>
            )}
            {currentAd.type !== 'image-only' && (
              <View style={styles.bannerFooter}>
                <View style={styles.matchBadge}>
                  <Text style={styles.matchBadgeText}>
                    {currentAd.type === 'centered' ? 'Glow Picks of the Week' : '94% Skin Match'}
                  </Text>
                </View>
                <TouchableOpacity style={styles.shopNowBadge} activeOpacity={0.9}>
                  <Text style={styles.shopNowText}>
                    {currentAd.type === 'centered' ? 'Claim Offer' : 'Shop Now'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </LinearGradient>
          {/* Pagination Dots */}
          {/* <View style={styles.paginationRow}>
            {ADS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  adIndex === i ? styles.dotActive : null
                ]}
              />
            ))}
          </View> */}
        </View>

        {/* Scan Bar */}
        <TouchableOpacity
          style={styles.scanBar}
          activeOpacity={0.8}
          onPress={() => router.push('/product-scan' as any)}
        >
          <View style={styles.scanLeft}>
            <Scan size={20} color="#0A2218" />
            <Text style={styles.scanText}>Scan your product with AI</Text>
          </View>
          <ArrowRight size={20} color="#0A2218" opacity={0.5} />
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveCat(cat)}
                style={[styles.catChip, activeCat === cat && styles.activeCatChip]}
              >
                <Text style={[styles.catText, activeCat === cat && styles.activeCatText]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.grid}>
          {PRODUCTS.map(p => (
            <TouchableOpacity
              key={p.id}
              style={styles.productCell}
              activeOpacity={0.9}
              onPress={() => router.push({
                pathname: p.id % 2 === 0 ? '/modal-detail2' : '/modal-detail',
                params: {
                  title: p.name,
                  image: p.image,
                  message: 'A professional grade formula for your unique skin profile.',
                  type: 'skincare'
                }
              })}
            >
              <View style={[styles.productImageContainer, { backgroundColor: p.color }]}>
                {p.videoUrl ? (
                  <Video
                    source={{ uri: p.videoUrl }}
                    style={styles.productVideo}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay
                    isLooping
                    isMuted
                  />
                ) : (
                  <Image source={{ uri: p.image }} style={styles.productImg} />
                )}
                <View style={styles.fitPill}>
                  <Text style={styles.fitPillText}>{p.fit}% fit</Text>
                </View>
                <View style={styles.heartBtn}>
                  <Heart size={16} color={p.liked ? "#FF4D4D" : "#0A2218"} fill={p.liked ? "#FF4D4D" : "transparent"} />
                </View>
              </View>
              <Text style={styles.pName}>{p.name}</Text>
              <Text style={styles.pPrice}>{p.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FCFA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerIconBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(17),
    color: '#0A2218',
  },
  scanBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(10,34,24,0.1)',
  },
  dotActive: {
    backgroundColor: '#34D399',
    width: 14,
  },
  bannerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  banner: {
    height: 172,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.65)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 5,
  },
  bannerGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.28)',
    top: -130,
    right: -70,
  },
  bannerGlowSmall: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.22)',
    bottom: -60,
    left: -30,
  },
  imageOnlyBannerImage: {
    ...StyleSheet.absoluteFillObject,
  },
  bannerText: {
    flex: 1,
    zIndex: 2,
    paddingRight: 6,
  },
  bannerEyebrow: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(11),
    color: '#0A2218',
    opacity: 0.6,
    letterSpacing: 1,
  },
  bannerTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(20),
    color: '#0A2218',
    marginTop: 4,
    width: '70%',
  },
  bannerImg: {
    position: 'absolute',
    right: -20,
    bottom: 6,
    width: 130,
    height: 130,
    transform: [{ rotate: '-10deg' }],
  },
  bannerFooter: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 3,
  },
  matchBadge: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.06)',
  },
  matchBadgeText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(10),
    color: '#065F46',
  },
  shopNowBadge: {
    backgroundColor: '#0A2218',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  shopNowText: {
    color: '#FFF',
    fontFamily: AppTypography.bold,
    fontSize: RFValue(11),
  },
  scanLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scanText: {
    fontFamily: AppTypography.semibold,
    fontSize: RFValue(12),
    color: '#0A2218',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  catScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  catChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeCatChip: {
    backgroundColor: '#34D399',
    borderColor: '#34D399',
  },
  catText: {
    fontFamily: AppTypography.semibold,
    fontSize: RFValue(12),
    color: '#374151',
  },
  activeCatText: {
    color: '#FFFFFF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
  },
  productCell: {
    width: '50%',
    padding: 5,
    marginBottom: 10,
  },
  productImageContainer: {
    height: 180,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  productImg: {
    width: '80%',
    height: '80%',
  },
  productVideo: {
    width: '100%',
    height: '100%',
  },
  heartBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  pName: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(14),
    color: '#0A2218',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  pPrice: {
    fontFamily: AppTypography.semibold,
    fontSize: RFValue(13),
    color: '#4B5563',
    marginTop: 2,
    paddingHorizontal: 5,
  },
  fitPill: {
    position: 'absolute',
    left: 12,
    top: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  fitPillText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(9),
    color: '#0A2218',
  }
});





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
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { AppTypography } from '@/constants/design';

// // ── Design tokens ─────────────────────────────────────────────────────────────
// const C = {
//   // Backgrounds
//   bg: '#F2FBF7',
//   bgCard: '#FFFFFF',
//   bgSection: '#FAFFFE',

//   // Greens
//   primary: '#059669',
//   primaryLight: '#10B981',
//   primaryDim: 'rgba(5,150,105,0.1)',
//   primaryBorder: 'rgba(5,150,105,0.16)',
//   primaryGlow: 'rgba(5,150,105,0.12)',

//   // Text
//   textDark: '#0A2218',
//   textMid: '#2D6A4F',
//   textSub: '#6B9E88',
//   textMuted: '#A8C4B8',
//   textOnGreen: '#FFFFFF',

//   // Borders
//   border: 'rgba(5,150,105,0.1)',
//   borderMid: 'rgba(5,150,105,0.18)',

//   // Misc
//   wishRed: '#F87171',
//   shadow: '#059669',
// };

// // ── Types ─────────────────────────────────────────────────────────────────────
// interface Product {
//   id: string;
//   brand: string;
//   name: string;
//   fit: number;
//   fitColor: string;
//   type: string;
//   image: string;
// }
// interface Category {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ElementType;
//   iconColor: string;
//   products: Product[];
// }

// // ── Data ──────────────────────────────────────────────────────────────────────
// const ALL_CATEGORIES: Category[] = [
//   {
//     id: 'creams', title: 'Non-Comedogenic Rich Creams',
//     description: 'Rich, non-comedogenic creams that nourish dry, pore-prone skin.',
//     icon: Droplets, iconColor: '#34D399',
//     products: [
//       { id: 'c1', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 93, fitColor: '#8B5CF6', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
//       { id: 'c2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 82, fitColor: '#34D399', type: 'Sun Protection', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//       { id: 'c3', brand: 'Joyce Giraud', name: '2-Minute Hair Mask', fit: 78, fitColor: '#34D399', type: 'Hydrating', image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819' },
//     ],
//   },
//   {
//     id: 'essences', title: 'Hydrating Pore Essences',
//     description: 'Lightweight, hydrating essences that help minimize the look of pores.',
//     icon: Wind, iconColor: '#60A5FA',
//     products: [
//       { id: 'e1', brand: 'Joyce Giraud', name: 'Pet Gentle Formula', fit: 60, fitColor: '#34D399', type: 'Treatment', image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142' },
//       { id: 'e2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 88, fitColor: '#34D399', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//       { id: 'e3', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 74, fitColor: '#34D399', type: 'Treatment', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
//     ],
//   },
//   {
//     id: 'exfoliants', title: 'Barrier-Safe Pore Exfoliants',
//     description: 'Gentle exfoliants clear pores without compromising your skin barrier.',
//     icon: Leaf, iconColor: '#86EFAC',
//     products: [
//       { id: 'x1', brand: 'Joyce Giraud', name: '2-Minute Hair Mask', fit: 77, fitColor: '#34D399', type: 'Exfoliating', image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819' },
//       { id: 'x2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 65, fitColor: '#34D399', type: 'Exfoliating', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//       { id: 'x3', brand: 'Joyce Giraud', name: 'Gentle Cleanse', fit: 81, fitColor: '#34D399', type: 'Cleansing', image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142' },
//     ],
//   },
//   {
//     id: 'centella', title: 'Calming Centella Treatments',
//     description: 'Centella soothes your sensitive skin while refining visible pores.',
//     icon: ShieldCheck, iconColor: '#FCD34D',
//     products: [
//       { id: 't1', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 84, fitColor: '#34D399', type: 'Toning', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
//       { id: 't2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 64, fitColor: '#8B5CF6', type: 'Treatment', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//     ],
//   },
//   {
//     id: 'spf', title: 'Soothing SPF Moisturisers',
//     description: 'Oat-based creams calm sensitive skin and protect against UV damage.',
//     icon: Sun, iconColor: '#FBBF24',
//     products: [
//       { id: 's1', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 92, fitColor: '#8B5CF6', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
//       { id: 's2', brand: 'Joyce Giraud', name: '2-Minute Hair Mask', fit: 88, fitColor: '#8B5CF6', type: 'Treatment', image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819' },
//       { id: 's3', brand: 'Joyce Giraud', name: 'Ultimate Beauty Sleep', fit: 79, fitColor: '#34D399', type: 'Recovery', image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919' },
//     ],
//   },
//   {
//     id: 'glycerin', title: 'Hydrating Glycerin Serums',
//     description: 'Glycerin deeply hydrates dry skin and helps minimise pore appearance.',
//     icon: Sparkles, iconColor: '#A78BFA',
//     products: [
//       { id: 'g1', brand: 'Joyce Giraud', name: 'Gentle Cleanse Formula', fit: 88, fitColor: '#34D399', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142' },
//       { id: 'g2', brand: 'Joyce Giraud', name: 'Pure4 Radiance Serum', fit: 87, fitColor: '#34D399', type: 'Moisturising', image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331' },
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
//   { id: 'scan', label: 'Recent Scan', icon: ScanLine },
// ];

// // ── Fit score ring ────────────────────────────────────────────────────────────
// function FitRing({ fit, color }: { fit: number; color: string }) {
//   const size = 36;
//   const stroke = 3;
//   const r = (size - stroke) / 2;
//   const circ = 2 * Math.PI * r;
//   const dash = (fit / 100) * circ;

//   return (
//     <View style={[fitRingStyles.wrap, { width: size, height: size }]}>
//       <Text style={[fitRingStyles.label, { color }]}>{fit}</Text>
//     </View>
//   );
// }
// const fitRingStyles = StyleSheet.create({
//   wrap: { alignItems: 'center', justifyContent: 'center', borderRadius: 18, borderWidth: 2, borderColor: 'rgba(0,0,0,0.06)', backgroundColor: '#F6FFF9' },
//   label: { fontFamily: AppTypography.bold, fontSize: 10, letterSpacing: -0.3 },
// });

// // ── Product Card ──────────────────────────────────────────────────────────────
// function ProductCard({
//   item, onWishlist, wishlisted,
// }: { item: Product; onWishlist: () => void; wishlisted: boolean }) {
//   const scaleAnim = useRef(new Animated.Value(1)).current;

//   const handlePressIn = () =>
//     Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, speed: 30, bounciness: 2 }).start();
//   const handlePressOut = () =>
//     Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20 }).start();

//   // Fit label colors
//   const fitLabel = item.fit >= 85 ? 'Top Match' : item.fit >= 70 ? 'Good Fit' : 'Fair Fit';
//   const fitBg = item.fit >= 85 ? '#8B5CF6' : item.fit >= 70 ? '#10B981' : '#F59E0B';

//   return (
//     <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
//       <TouchableOpacity
//         activeOpacity={1}
//         onPressIn={handlePressIn}
//         onPressOut={handlePressOut}
//         style={styles.card}
//       >
//         {/* Image area */}
//         <View style={styles.imgWrap}>
//           {/* Subtle mesh gradient backdrop */}
//           <LinearGradient
//             colors={['#EDF7F2', '#F8FFFD', '#EDF7F2']}
//             start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
//             style={StyleSheet.absoluteFillObject}
//           />
//           <Image source={{ uri: item.image }} contentFit="contain" style={styles.img} />

//           {/* Wish button */}
//           <Pressable style={[styles.wishBtn, wishlisted && styles.wishBtnActive]} onPress={onWishlist}>
//             <Heart
//               size={12}
//               color={wishlisted ? C.wishRed : C.textSub}
//               fill={wishlisted ? C.wishRed : 'transparent'}
//               strokeWidth={2.2}
//             />
//           </Pressable>

//           {/* Fit badge — bottom left of image */}
//           <View style={[styles.fitBadge, { backgroundColor: fitBg }]}>
//             <Text style={styles.fitBadgeText}>{item.fit}%</Text>
//           </View>
//         </View>

//         {/* Info area */}
//         <View style={styles.cardInfo}>
//           <View style={styles.cardInfoTop}>
//             <Text style={styles.cardBrand}>{item.brand}</Text>
//             <View style={[styles.typeChip]}>
//               <Text style={styles.typeChipText}>{item.type}</Text>
//             </View>
//           </View>
//           <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>

//           {/* Fit match label */}
//           <View style={styles.fitLabelRow}>
//             <View style={[styles.fitLabelDot, { backgroundColor: fitBg }]} />
//             <Text style={[styles.fitLabelText, { color: fitBg }]}>{fitLabel}</Text>
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
//       {/* Section header */}
//       <View style={styles.sectionHeader}>
//         <View style={[styles.sectionIconWrap, { backgroundColor: section.iconColor + '1A' }]}>
//           <Icon size={14} color={section.iconColor} strokeWidth={2.2} />
//         </View>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.sectionTitle}>{section.title}</Text>
//           <Text style={styles.sectionDesc}>{section.description}</Text>
//         </View>
//         <View style={styles.countBadge}>
//           <Text style={styles.countBadgeText}>{section.products.length}</Text>
//         </View>
//       </View>

//       {/* Horizontal scroll */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.hScroll}
//       >
//         {section.products.map((p) => (
//           <ProductCard
//             key={p.id}
//             item={p}
//             wishlisted={!!wishlist[p.id]}
//             onWishlist={() => onWishlist(p.id)}
//           />
//         ))}
//       </ScrollView>

//       {/* Bottom rule */}
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
//     if (activeTab === 'scan') return [{ ...ALL_CATEGORIES[0], title: 'From Your Last Scan', description: 'Products recommended from April 24 scan.', products: RECENT_PRODUCTS }];
//     if (search.trim()) {
//       cats = cats.map(c => ({
//         ...c,
//         products: c.products.filter(p =>
//           p.name.toLowerCase().includes(search.toLowerCase()) ||
//           p.type.toLowerCase().includes(search.toLowerCase())
//         ),
//       })).filter(c => c.products.length > 0);
//     }
//     return cats;
//   })();

//   return (
//     <View style={styles.screen}>
//       {/* Background */}
//       <LinearGradient
//         colors={['#EDFAF3', '#F2FBF7', '#F9FEFC']}
//         start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }}
//         style={StyleSheet.absoluteFillObject}
//       />
//       {/* Decorative top circle */}
//       <View style={styles.decorCircle} />

//       {/* ── Fixed header ── */}
//       <View style={{ paddingTop: insets.top }}>

//         {/* Collapsible hero row */}
//         <Animated.View style={{ height: headerHeight, opacity: headerOpacity, overflow: 'hidden' }}>
//           <View style={styles.heroRow}>
//             <View>
//               <Text style={styles.eyebrow}>✦ AI Personalised</Text>
//               <Text style={styles.heroTitle}>Products</Text>
//             </View>
//             <View style={styles.matchPill}>
//               <LinearGradient
//                 colors={['#10B981', '#059669']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={styles.matchPillGrad}
//               >
//                 <Sparkles size={11} color="#fff" strokeWidth={2} />
//                 <Text style={styles.matchPillText}>78% match</Text>
//               </LinearGradient>
//             </View>
//           </View>
//         </Animated.View>

//         {/* Search bar */}
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
//             {/* Divider */}
//             <View style={styles.searchDivider} />
//             <Pressable
//               style={styles.scanBtn}
//               onPress={() => router.push('/face-scan' as any)}
//             >
//               <ScanLine size={16} color={C.primary} strokeWidth={2} />
//               <Text style={styles.scanBtnText}>Scan</Text>
//             </Pressable>
//           </View>
//         </View>

//         {/* Tabs */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.tabsRow}
//         >
//           {TABS.map(t => {
//             const isActive = activeTab === t.id;
//             const Icon = t.icon;
//             return (
//               <Pressable
//                 key={t.id}
//                 onPress={() => setActiveTab(t.id)}
//                 style={[styles.tabChip, isActive && styles.tabChipActive]}
//               >
//                 {isActive ? (
//                   <LinearGradient
//                     colors={['#10B981', '#059669']}
//                     start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                     style={StyleSheet.absoluteFillObject}
//                   />
//                 ) : null}
//                 <Icon
//                   size={11}
//                   color={isActive ? '#fff' : C.textSub}
//                   strokeWidth={2.2}
//                 />
//                 <Text style={[styles.tabChipText, isActive && styles.tabChipTextActive]}>
//                   {t.label}
//                 </Text>
//               </Pressable>
//             );
//           })}
//         </ScrollView>
//       </View>

//       {/* ── Scrollable content ── */}
//       <Animated.ScrollView
//         showsVerticalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//         scrollEventThrottle={16}
//         contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
//       >
//         {filtered.length === 0 && (
//           <View style={styles.emptyState}>
//             <View style={styles.emptyIcon}>
//               <Search size={22} color={C.textMuted} strokeWidth={1.5} />
//             </View>
//             <Text style={styles.emptyTitle}>No products found</Text>
//             <Text style={styles.emptyDesc}>Try a different search term or category.</Text>
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
// const CARD_W = 168;

// const styles = StyleSheet.create({
//   screen: { flex: 1, backgroundColor: C.bg },

//   // Decorative circle
//   decorCircle: {
//     position: 'absolute',
//     width: 320, height: 320, borderRadius: 160,
//     backgroundColor: C.primaryLight,
//     opacity: 0.055,
//     top: -120, right: -80,
//   },

//   // ── Hero row ──────────────────────────────────────────────────────────────
//   heroRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//     paddingTop: 8,
//   },
//   eyebrow: {
//     fontFamily: AppTypography.semibold,
//     fontSize: 11,
//     color: C.primary,
//     textTransform: 'uppercase',
//     letterSpacing: 0.8,
//     marginBottom: 2,
//   },
//   heroTitle: {
//     fontFamily: AppTypography.bold,
//     fontSize: 28,
//     color: C.textDark,
//     letterSpacing: -0.6,
//     lineHeight: 32,
//   },
//   matchPill: {
//     borderRadius: 20,
//     overflow: 'hidden',
//     shadowColor: C.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.28,
//     shadowRadius: 10,
//     elevation: 4,
//   },
//   matchPillGrad: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//     paddingHorizontal: 12,
//     paddingVertical: 7,
//     borderRadius: 20,
//   },
//   matchPillText: {
//     fontFamily: AppTypography.bold,
//     fontSize: 12,
//     color: '#fff',
//     letterSpacing: 0.1,
//   },

//   // ── Search ────────────────────────────────────────────────────────────────
//   searchRow: { paddingHorizontal: 18, marginBottom: 12 },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     borderRadius: 16,
//     paddingHorizontal: 14,
//     paddingVertical: 11,
//     borderWidth: 1.5,
//     borderColor: C.borderMid,
//     backgroundColor: C.bgCard,
//     shadowColor: C.shadow,
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.07,
//     shadowRadius: 10,
//     elevation: 2,
//   },
//   searchInput: {
//     flex: 1,
//     fontFamily: AppTypography.regular,
//     fontSize: 14,
//     color: C.textDark,
//     padding: 0,
//   },
//   clearBtn: {
//     width: 20, height: 20, borderRadius: 10,
//     backgroundColor: 'rgba(0,0,0,0.06)',
//     alignItems: 'center', justifyContent: 'center',
//   },
//   searchDivider: {
//     width: 1, height: 20,
//     backgroundColor: C.borderMid,
//     marginHorizontal: 2,
//   },
//   scanBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 10,
//     backgroundColor: C.primaryDim,
//     borderWidth: 1,
//     borderColor: C.primaryBorder,
//   },
//   scanBtnText: {
//     fontFamily: AppTypography.semibold,
//     fontSize: 12,
//     color: C.primary,
//   },

//   // ── Tabs ──────────────────────────────────────────────────────────────────
//   tabsRow: {
//     paddingHorizontal: 18,
//     gap: 8,
//     flexDirection: 'row',
//     paddingBottom: 14,
//   },
//   tabChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//     paddingHorizontal: 13,
//     paddingVertical: 8,
//     borderRadius: 22,
//     backgroundColor: C.bgCard,
//     borderWidth: 1.5,
//     borderColor: C.border,
//     overflow: 'hidden',
//     shadowColor: C.textDark,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 1,
//   },
//   tabChipActive: {
//     borderColor: 'transparent',
//     shadowColor: C.primary,
//     shadowOpacity: 0.22,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   tabChipText: {
//     fontFamily: AppTypography.medium,
//     fontSize: 12,
//     color: C.textSub,
//   },
//   tabChipTextActive: {
//     color: '#fff',
//     fontFamily: AppTypography.semibold,
//   },

//   // ── Scroll ────────────────────────────────────────────────────────────────
//   scrollContent: { paddingTop: 4 },

//   // ── Category section ──────────────────────────────────────────────────────
//   categorySection: {
//     backgroundColor: C.bgCard,
//     marginBottom: 6,
//     paddingTop: 16,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     gap: 10,
//     paddingHorizontal: 18,
//     marginBottom: 14,
//   },
//   sectionIconWrap: {
//     width: 34, height: 34, borderRadius: 12,
//     alignItems: 'center', justifyContent: 'center',
//     flexShrink: 0,
//     marginTop: 1,
//   },
//   sectionTitle: {
//     fontFamily: AppTypography.bold,
//     fontSize: 15.5,
//     color: C.textDark,
//     letterSpacing: -0.2,
//     marginBottom: 3,
//     lineHeight: 21,
//   },
//   sectionDesc: {
//     fontFamily: AppTypography.regular,
//     fontSize: 12.5,
//     color: C.textSub,
//     lineHeight: 18,
//   },
//   countBadge: {
//     width: 24, height: 24, borderRadius: 12,
//     backgroundColor: C.primaryDim,
//     borderWidth: 1, borderColor: C.primaryBorder,
//     alignItems: 'center', justifyContent: 'center',
//     flexShrink: 0,
//   },
//   countBadgeText: {
//     fontFamily: AppTypography.bold,
//     fontSize: 11,
//     color: C.primary,
//   },
//   hScroll: {
//     paddingLeft: 18,
//     paddingRight: 10,
//     paddingBottom: 20,
//     gap: 12,
//   },
//   sectionRule: {
//     height: 1,
//     backgroundColor: C.border,
//     marginHorizontal: 0,
//   },

//   // ── Product card ──────────────────────────────────────────────────────────
//   card: {
//     width: CARD_W,
//     borderRadius: 20,
//     backgroundColor: C.bgCard,
//     overflow: 'hidden',
//     shadowColor: C.shadow,
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.08,
//     shadowRadius: 14,
//     elevation: 3,
//     borderWidth: 1.5,
//     borderColor: C.border,
//   },

//   // Image
//   imgWrap: {
//     height: 168,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   img: { width: 115, height: 140 },

//   // Wish button — top right
//   wishBtn: {
//     position: 'absolute',
//     top: 10, right: 10,
//     width: 30, height: 30, borderRadius: 15,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     borderWidth: 1, borderColor: C.border,
//     alignItems: 'center', justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 4,
//   },
//   wishBtnActive: {
//     backgroundColor: '#FFF0F0',
//     borderColor: 'rgba(248,113,113,0.25)',
//   },

//   // Fit badge — bottom left of image
//   fitBadge: {
//     position: 'absolute',
//     bottom: 10, left: 10,
//     borderRadius: 10,
//     paddingHorizontal: 8, paddingVertical: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.18,
//     shadowRadius: 4,
//   },
//   fitBadgeText: {
//     fontFamily: AppTypography.bold,
//     fontSize: 10,
//     color: '#fff',
//     letterSpacing: 0.2,
//   },

//   // Info area
//   cardInfo: {
//     paddingHorizontal: 13,
//     paddingTop: 11,
//     paddingBottom: 14,
//     borderTopWidth: 1,
//     borderTopColor: C.border,
//     gap: 4,
//   },
//   cardInfoTop: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 2,
//   },
//   cardBrand: {
//     fontFamily: AppTypography.bold,
//     fontSize: 9.5,
//     color: C.primary,
//     textTransform: 'uppercase',
//     letterSpacing: 0.7,
//   },
//   typeChip: {
//     backgroundColor: C.primaryDim,
//     borderRadius: 8,
//     paddingHorizontal: 6, paddingVertical: 2,
//   },
//   typeChipText: {
//     fontFamily: AppTypography.medium,
//     fontSize: 9,
//     color: C.primary,
//     letterSpacing: 0.2,
//   },
//   cardName: {
//     fontFamily: AppTypography.bold,
//     fontSize: 13,
//     color: C.textDark,
//     lineHeight: 18,
//     letterSpacing: -0.1,
//   },
//   fitLabelRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//     marginTop: 4,
//   },
//   fitLabelDot: {
//     width: 6, height: 6, borderRadius: 3,
//   },
//   fitLabelText: {
//     fontFamily: AppTypography.semibold,
//     fontSize: 11,
//     letterSpacing: 0.1,
//   },

//   // ── Empty state ───────────────────────────────────────────────────────────
//   emptyState: {
//     alignItems: 'center',
//     paddingVertical: 64,
//     gap: 10,
//   },
//   emptyIcon: {
//     width: 56, height: 56, borderRadius: 28,
//     backgroundColor: 'rgba(5,150,105,0.07)',
//     borderWidth: 1.5, borderColor: C.border,
//     alignItems: 'center', justifyContent: 'center',
//     marginBottom: 4,
//   },
//   emptyTitle: {
//     fontFamily: AppTypography.bold,
//     fontSize: 16,
//     color: C.textDark,
//     letterSpacing: -0.2,
//   },
//   emptyDesc: {
//     fontFamily: AppTypography.regular,
//     fontSize: 13,
//     color: C.textSub,
//     textAlign: 'center',
//     paddingHorizontal: 40,
//   },
// });