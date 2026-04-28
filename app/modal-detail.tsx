import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Share2, Heart, CheckCircle2, Info, Sparkles, Leaf, ShieldCheck, Tag, Zap, Play, Star, Clock, MapPin, Truck } from 'lucide-react-native';
import { Animated, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useRef } from 'react';

import { AppTypography } from '@/constants/design';

const HEADER_HEIGHT = hp('40%');
const SMALL_HEADER_HEIGHT = hp('25%');

export default function ModalDetailScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const params = useLocalSearchParams();
    const scrollY = useRef(new Animated.Value(0)).current;

    // Parsing params
    const { title, message, image, type, fullDescription } = params;

    const isSale = type === 'sale';
    const isEdu = type === 'educational' || type === 'video';
    const currentHeaderHeight = isEdu ? SMALL_HEADER_HEIGHT : HEADER_HEIGHT;

    const headerScale = scrollY.interpolate({
        inputRange: [-currentHeaderHeight, 0],
        outputRange: [1.5, 1],
        extrapolate: 'clamp',
    });

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, currentHeaderHeight],
        outputRange: [0, -currentHeaderHeight * 0.4],
        extrapolate: 'clamp',
    });

    const renderHeader = () => {
        if (isEdu) {
            return (
                <Animated.View style={[styles.gradientHeader, { height: SMALL_HEADER_HEIGHT }]}>
                    <LinearGradient colors={['#059669', '#064E3B']} style={StyleSheet.absoluteFillObject} />
                    <View style={styles.eduHeaderContent}>
                        <View style={styles.eduIconBox}>
                            {type === 'video' ? <Play size={32} color="#FFFFFF" fill="#FFFFFF" /> : <Zap size={32} color="#FFFFFF" fill="#FFFFFF" />}
                        </View>
                        <Text style={styles.eduLabel}>{type?.toString().toUpperCase()}</Text>
                    </View>
                </Animated.View>
            );
        }

        return (
            <Animated.View style={[
                styles.imageContainer,
                {
                    height: HEADER_HEIGHT,
                    transform: [
                        { translateY: headerTranslateY },
                        { scale: headerScale }
                    ]
                }
            ]}>
                <Image
                    source={{ uri: image as string || 'https://i.pinimg.com/1200x/5e/de/f4/5edef430718b1da3e50b78e319f6c30c.jpg' }}
                    style={styles.headerImage}
                />
                <LinearGradient colors={['rgba(0,0,0,0.4)', 'transparent']} style={styles.topFade} />
                {isSale && (
                    <View style={styles.saleHeaderOverlay}>
                        <Tag size={16} color="#FFFFFF" />
                        <Text style={styles.saleHeaderTitle}>BUNDLE VALUE</Text>
                    </View>
                )}
            </Animated.View>
        );
    };

    return (
        <View style={styles.screen}>
            {renderHeader()}

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={{
                    paddingTop: currentHeaderHeight - (isEdu ? 20 : 36),
                    paddingBottom: insets.bottom + 40
                }}
            >
                <View style={styles.contentBody}>
                    <View style={styles.pillBox}>
                        <Text style={styles.pillText}>{type?.toString().toUpperCase() || 'EXCLUSIVE'}</Text>
                    </View>

                    <Text style={styles.title}>{title || 'Product Analysis'}</Text>
                    <Text style={styles.subtitle}>{message}</Text>

                    <View style={styles.divider} />

                    {/* Special Sub-Layout for Sale Type */}
                    {isSale && (
                        <View style={styles.subProductsSection}>
                            <Text style={styles.sectionTitle}>Included in this Deal</Text>
                            {[1, 2].map((_, i) => (
                                <View key={i} style={styles.subProductItem}>
                                    <Image source={{ uri: i === 0 ? 'https://template.canva.com/EAGSe-jkm2o/2/0/800w-osmFSUl-3IY.jpg' : 'https://template.canva.com/EAGYJQNSz4k/1/0/800w-TPUnE4qz6FI.jpg' }} style={styles.subImg} />
                                    <View style={styles.subInfo}>
                                        <Text style={styles.subName}>{i === 0 ? 'Radiance Boost Serum' : 'Deep Hydration Cream'}</Text>
                                        <View style={styles.subSizeRow}>
                                            <Clock size={12} color="#94A3B8" />
                                            <Text style={styles.subSize}>AM/PM Use • 30ml</Text>
                                        </View>
                                    </View>
                                    <CheckCircle2 size={24} color="#059669" />
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Education Steps */}
                    {isEdu && (
                        <View style={styles.stepsContainer}>
                            <Text style={styles.sectionTitle}>Application Steps</Text>
                            {[
                                { step: 1, text: 'Cleanse your face with lukewarm water.' },
                                { step: 2, text: 'Apply 3-4 drops directly to your palm.' },
                                { step: 3, text: 'Gently massage in circular motions until absorbed.' }
                            ].map((item) => (
                                <View key={item.step} style={styles.stepRow}>
                                    <View style={styles.stepNum}>
                                        <Text style={styles.stepText}>{item.step}</Text>
                                    </View>
                                    <Text style={styles.itemInstruction}>{item.text}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {!isSale && !isEdu && (
                        <View style={styles.detailCard}>
                            <View style={styles.detailRow}>
                                <ShieldCheck size={20} color="#059669" />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.detailTitle}>Professional Insight</Text>
                                    <Text style={styles.detailDesc}>Formulated to enhance cellular turnover and lock in epidermal moisture for up to 24 hours.</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    <Text style={styles.sectionTitle}>Deep Analysis</Text>
                    <Text style={styles.longDesc}>
                        {fullDescription || "Our AI engine has identified that your current moisture level is at 64%. By using this product, we aim to reach 85% within 10 days. The primary active ingredients are specialized to interact with your specific skin barrier score."}
                    </Text>

                    {/* Features Grid */}
                    <View style={styles.benefitsGrid}>
                        {[
                            { icon: Leaf, label: 'Eco-Friendly' },
                            { icon: Sparkles, label: 'High Potency' },
                            { icon: ShieldCheck, label: 'Safety Verified' }
                        ].map((item, i) => (
                            <View key={i} style={styles.benefitItem}>
                                <item.icon size={16} color="#059669" />
                                <Text style={styles.benefitLabel}>{item.label}</Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.supplierCard} activeOpacity={0.9} onPress={() => router.push({
                        pathname: '/supplier-map',
                        params: { title: title as string || 'Product Suppliers' }
                    })}>
                        <View style={styles.supplierIconWrap}>
                            <Truck size={18} color="#059669" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.supplierTitle}>Recommended Suppliers Nearby</Text>
                            <Text style={styles.supplierSub}>View trusted suppliers, ratings, and delivery options.</Text>
                        </View>
                        <MapPin size={18} color="#059669" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mainBtn} activeOpacity={0.8}>
                        <View style={styles.btnContent}>
                            <Text style={styles.mainBtnText}>{isSale ? 'Claim Bundle' : isEdu ? 'I Understand' : 'Add to Shelf'}</Text>
                            {isSale && <Text style={styles.btnPrice}>$42.00</Text>}
                        </View>
                    </TouchableOpacity>

                </View>
            </Animated.ScrollView>

            {/* Floating Header Actions */}
            <View style={[styles.headerActions, { top: insets.top + 10 }]}>
                <TouchableOpacity style={styles.circleBtn} onPress={() => router.back()}>
                    <ChevronLeft size={22} color="#0A2218" />
                </TouchableOpacity>
                <View style={styles.rightActions}>
                    <TouchableOpacity style={styles.circleBtn}>
                        <Share2 size={18} color="#0A2218" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleBtn}>
                        <Heart size={18} color="#0A2218" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#FFFFFF' },
    imageContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        backgroundColor: '#F0FBF6',
    },
    gradientHeader: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eduHeaderContent: {
        alignItems: 'center',
        marginTop: 40,
    },
    eduIconBox: {
        width: 64, height: 64, borderRadius: 32,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 12,
    },
    eduLabel: {
        fontFamily: AppTypography.bold,
        fontSize: RFValue(14),
        color: '#FFFFFF',
        letterSpacing: 2,
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    topFade: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 120,
    },
    saleHeaderOverlay: {
        position: 'absolute',
        bottom: 60,
        left: 24,
        backgroundColor: '#EF4444',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    saleHeaderTitle: {
        fontFamily: AppTypography.bold,
        fontSize: RFValue(10),
        color: '#FFFFFF',
    },
    headerActions: {
        position: 'absolute',
        left: 20, right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
    },
    rightActions: {
        flexDirection: 'row',
        gap: 12,
    },
    circleBtn: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center', alignItems: 'center',
        shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 2,
    },
    contentBody: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
        paddingHorizontal: 24,
        paddingTop: 30,
        minHeight: hp('70%'),
    },
    pillBox: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(5, 150, 105, 0.08)',
        paddingHorizontal: 12, paddingVertical: 6,
        borderRadius: 12, marginBottom: 16,
    },
    pillText: {
        fontFamily: AppTypography.bold,
        fontSize: RFValue(10),
        color: '#059669',
        letterSpacing: 1,
    },
    title: {
        fontFamily: AppTypography.bold,
        fontSize: RFValue(26),
        color: '#0A2218',
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: AppTypography.medium,
        fontSize: RFValue(15),
        color: '#6B9E88',
        lineHeight: 22,
        marginBottom: 24,
    },
    divider: {
        height: 1, backgroundColor: '#F3F4F6', marginBottom: 24,
    },
    subProductsSection: {
        marginBottom: 30,
    },
    subProductItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FEFC',
        padding: 12,
        borderRadius: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(5, 150, 105, 0.05)',
    },
    subImg: { width: 48, height: 48, borderRadius: 12 },
    subInfo: { flex: 1, marginLeft: 12 },
    subName: {
        fontFamily: AppTypography.bold,
        fontSize: RFValue(14),
        color: '#0A2218',
    },
    subSizeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
    subSize: {
        fontFamily: AppTypography.medium,
        fontSize: RFValue(11),
        color: '#94A3B8',
    },
    stepsContainer: {
        marginBottom: 30,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 16,
    },
    stepNum: {
        width: 28, height: 28, borderRadius: 14,
        backgroundColor: '#059669',
        justifyContent: 'center', alignItems: 'center',
    },
    stepText: { color: '#FFF', fontFamily: AppTypography.bold, fontSize: 12 },
    itemInstruction: {
        flex: 1,
        fontFamily: AppTypography.medium,
        fontSize: RFValue(13),
        color: '#334155',
    },
    sectionTitle: {
        fontFamily: AppTypography.bold,
        fontSize: RFValue(18),
        color: '#0A2218',
        marginBottom: 16,
    },
    detailCard: {
        backgroundColor: '#F9FEFC',
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(5, 150, 105, 0.05)',
        marginBottom: 30,
    },
    detailRow: { flexDirection: 'row', gap: 16 },
    detailTitle: {
        fontFamily: AppTypography.bold,
        fontSize: RFValue(15),
        color: '#0A2218',
        marginBottom: 4,
    },
    detailDesc: {
        fontFamily: AppTypography.medium,
        fontSize: RFValue(13),
        color: '#7BA898',
        lineHeight: 18,
    },
    longDesc: {
        fontFamily: AppTypography.medium,
        fontSize: RFValue(14),
        color: '#6B9E88',
        lineHeight: 22,
        marginBottom: 30,
    },
    benefitsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 40,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 14,
    },
    benefitLabel: {
        fontFamily: AppTypography.semibold,
        fontSize: RFValue(12),
        color: '#374151',
    },
    supplierCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#F0FDF4',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#BBF7D0',
        padding: 14,
        marginBottom: 16,
    },
    supplierIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#D1FAE5',
    },
    supplierTitle: {
        fontFamily: AppTypography.bold,
        fontSize: RFValue(13),
        color: '#14532D',
        marginBottom: 3,
    },
    supplierSub: {
        fontFamily: AppTypography.medium,
        fontSize: RFValue(11.5),
        color: '#4B5563',
        lineHeight: 17,
    },
    mainBtn: {
        backgroundColor: '#059669',
        height: 64,
        borderRadius: 22,
        justifyContent: 'center',
        paddingHorizontal: 24,
        shadowColor: '#059669',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2, shadowRadius: 12, elevation: 5,
    },
    btnContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainBtnText: {
        fontFamily: AppTypography.bold,
        fontSize: RFValue(17),
        color: '#FFFFFF',
    },
    btnPrice: {
        fontFamily: AppTypography.bold,
        fontSize: RFValue(17),
        color: 'rgba(255,255,255,0.9)',
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    }
});
