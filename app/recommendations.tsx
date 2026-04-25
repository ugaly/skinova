import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronLeft, Sparkles, CheckCircle2, ShieldCheck, Droplets, ArrowRight, Zap, Info } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

import { AppTypography } from '@/constants/design';

const { width: SW } = Dimensions.get('window');

const ANALYSIS_POINTS = [
  { id: 1, title: 'Barrier Support', desc: 'Your skin barrier shows slight thinning. Ceramide-rich formulas are key.', icon: ShieldCheck, color: '#10B981' },
  { id: 2, title: 'Deep Hydration', desc: 'Inner layers are thirsty. Hyaluronic acid will plump from within.', icon: Droplets, color: '#3B82F6' },
  { id: 3, title: 'Soothing Needed', desc: 'Mild redness detected. Centella asiatica will calm irritation.', icon: Zap, color: '#F59E0B' },
];

const RECS = [
  {
    id: 'r1',
    category: 'Essential Serum',
    brand: 'Joyce Giraud',
    name: 'Pure4 Radiance Serum',
    desc: 'The ultimate "glow-in-a-bottle" formula that works while you sleep.',
    price: '$42.00',
    match: 98,
    image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331',
    tags: ['Hydrating', 'Fragrance Free', 'Vegan']
  },
  {
    id: 'r2',
    category: 'Barrier Cream',
    brand: 'Joyce Giraud',
    name: 'Ultimate Beauty Sleep',
    desc: 'A rich, non-comedogenic cream that locks in moisture for 24 hours.',
    price: '$48.00',
    match: 94,
    image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919',
    tags: ['Rich', 'Calming', 'Ceramides']
  }
];

export default function RecommendationsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#F0FBF6', '#FFFFFF']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#0A2218" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Recommendations</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      >
        {/* Hero Analysis Card */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#059669', '#10B981']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroIconWrap}>
              <Sparkles size={24} color="#059669" strokeWidth={2} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>Smart Analysis</Text>
              <Text style={styles.heroDesc}>
                Based on your daily check-in and scan history, we've identified 3 key areas to focus on today.
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Analysis points */}
        <View style={styles.pointsGrid}>
          {ANALYSIS_POINTS.map(point => (
            <View key={point.id} style={styles.pointRow}>
              <View style={[styles.pointIconBg, { backgroundColor: point.color + '15' }]}>
                <point.icon size={18} color={point.color} strokeWidth={2.5} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.pointTitle}>{point.title}</Text>
                <Text style={styles.pointDesc}>{point.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recommendations Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Picks for Today</Text>
          <View style={styles.matchCount}>
            <Text style={styles.matchCountText}>2 Products</Text>
          </View>
        </View>

        {/* Product List */}
        <View style={styles.productList}>
          {RECS.map(item => (
            <View key={item.id} style={styles.productCard}>
              <View style={styles.productTop}>
                <View style={styles.prodImgWrap}>
                  <LinearGradient colors={['#F8FEFB', '#F0FAF6']} style={StyleSheet.absoluteFillObject} />
                  <Image source={{ uri: item.image }} style={styles.prodImg} contentFit="contain" />
                </View>
                <View style={styles.prodInfo}>
                  <View style={styles.catBadge}>
                    <Text style={styles.catBadgeText}>{item.category}</Text>
                  </View>
                  <Text style={styles.matchText}>{item.match}% Match</Text>
                  <Text style={styles.prodBrand}>{item.brand}</Text>
                  <Text style={styles.prodName}>{item.name}</Text>
                </View>
              </View>
              <Text style={styles.prodDesc}>{item.desc}</Text>
              
              <View style={styles.tagsRow}>
                {item.tags.map(tag => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.prodFooter}>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                  <Text style={styles.addBtnText}>Add to Routine</Text>
                  <ArrowRight size={14} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Tip of the Day */}
        <View style={styles.tipCard}>
          <View style={styles.tipIconWrap}>
            <Info size={18} color="#059669" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Pro Tip</Text>
            <Text style={styles.tipDesc}>
              Always apply serums on slightly damp skin to maximize absorption and locking in moisture.
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backBtn: {
    width: 44, height: 44,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(16),
    color: '#0A2218',
  },

  // Hero
  heroSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  heroCard: {
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 6,
  },
  heroIconWrap: {
    width: 52, height: 52,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
  },
  heroTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(18),
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroDesc: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(12),
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
  },

  // Points
  pointsGrid: {
    paddingHorizontal: 26,
    marginTop: 30,
    gap: 20,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  pointIconBg: {
    width: 40, height: 40,
    borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  pointTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(14),
    color: '#0A2218',
    marginBottom: 2,
  },
  pointDesc: {
    fontFamily: AppTypography.regular,
    fontSize: RFValue(12),
    color: '#6B9E88',
    lineHeight: 16,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 40,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(17),
    color: '#0A2218',
  },
  matchCount: {
    backgroundColor: 'rgba(5,150,105,0.08)',
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 10,
  },
  matchCountText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(10),
    color: '#059669',
  },

  // Product Cards
  productList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(16,185,129,0.08)',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  productTop: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  prodImgWrap: {
    width: 100, height: 110,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center', justifyContent: 'center',
  },
  prodImg: { width: 70, height: 90 },
  prodInfo: { flex: 1, paddingTop: 4 },
  catBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(5,150,105,0.06)',
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  catBadgeText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(9),
    color: '#059669',
    textTransform: 'uppercase',
  },
  matchText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(11),
    color: '#10B981',
    marginBottom: 2,
  },
  prodBrand: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(10),
    color: '#6B9E88',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  prodName: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(15),
    color: '#0A2218',
    marginTop: 2,
  },
  prodDesc: {
    fontFamily: AppTypography.regular,
    fontSize: RFValue(12),
    color: '#7BA898',
    lineHeight: 18,
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(10),
    color: '#374151',
  },
  prodFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 14,
  },
  price: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(18),
    color: '#0A2218',
  },
  addBtn: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  addBtnText: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(13),
    color: '#FFFFFF',
  },

  // Tip Card
  tipCard: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: 'rgba(5,150,105,0.04)',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.1)',
  },
  tipIconWrap: {
    width: 36, height: 36,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
  },
  tipTitle: {
    fontFamily: AppTypography.bold,
    fontSize: RFValue(13),
    color: '#059669',
    marginBottom: 2,
  },
  tipDesc: {
    fontFamily: AppTypography.medium,
    fontSize: RFValue(11),
    color: '#2D6A4F',
    lineHeight: 16,
  },
});
