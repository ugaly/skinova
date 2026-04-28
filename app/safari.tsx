import React, { useState, useMemo } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  Platform, 
  Modal, 
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { Image } from 'expo-image';
import { 
  ChevronLeft, Plus, MapPin, Calendar, Plane, Sparkles, 
  Check, X, Thermometer, Droplets, Sun, Flag, ArrowRight,
  Clock, Trash2, Map as MapIcon, CloudRain, Wind, Search
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  SlideInBottom, 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';

import { AppTypography } from '@/constants/design';
import { useJourneyStore, Journey } from '../store/useJourneyStore';

const { width, height } = Dimensions.get('window');

const GOOGLE_PLACES_API_KEY = Constants.expoConfig?.android?.config?.googleMaps?.apiKey || 
                              Constants.expoConfig?.ios?.config?.googleMapsApiKey || '';

/**
 * AI Climate Detection Helper
 */
const detectClimate = (dest: string) => {
  const d = dest.toLowerCase();
  if (d.includes('bali') || d.includes('thailand') || d.includes('phuket') || d.includes('bangkok') || 
      d.includes('miami') || d.includes('maldives') || d.includes('caribbean') || d.includes('hawaii') ||
      d.includes('tropical') || d.includes('brazil') || d.includes('tanzania') || d.includes('zanzibar') || d.includes('dar es salaam')) {
    return { type: 'tropical', condition: 'High UV • Humidity 85%' };
  }
  if (d.includes('dubai') || d.includes('vegas') || d.includes('desert') || d.includes('sahara') || 
      d.includes('egypt') || d.includes('cairo') || d.includes('arizona') || d.includes('riyadh') || d.includes('dodoma')) {
    return { type: 'dry', condition: 'Arid • Extreme UV • Low Humidity' };
  }
  if (d.includes('iceland') || d.includes('norway') || d.includes('moscow') || d.includes('canada') || 
      d.includes('alaska') || d.includes('switzerland') || d.includes('alps')) {
    return { type: 'cold', condition: 'Freezing • Harsh Winds • Low Temp' };
  }
  return { type: 'temperate', condition: 'Partly Cloudy • Balanced' };
};

export default function JourneyScreen() {
  const insets = useSafeAreaInsets();
  const { journeys, items, addJourney, deleteJourney } = useJourneyStore();
  
  const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  
  // Create Journey Form State
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [selectedClimate, setSelectedClimate] = useState<string>('tropical');
  const [detectedCondition, setDetectedCondition] = useState<string>('Select destination for AI analysis');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLocModalVisible, setIsLocModalVisible] = useState(false);
  
  // Picker visibility
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const handleLocationSelect = (data: any) => {
    const dest = data.description;
    setDestination(dest);
    setIsLocModalVisible(false);
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const result = detectClimate(dest);
      setSelectedClimate(result.type);
      setDetectedCondition(result.condition);
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleCreate = () => {
    if (!name || !destination) return;
    
    const recommendedItems = items.map(item => {
      let recommended = false;
      if (selectedClimate === 'tropical' && (item.category === 'Sunscreen' || item.category === 'Cleansers')) recommended = true;
      if (selectedClimate === 'dry' && (item.category === 'Creams' || item.category === 'Serums')) recommended = true;
      if (selectedClimate === 'cold' && item.category === 'Creams') recommended = true;
      if (selectedClimate === 'temperate') recommended = true; 
      
      return { itemId: item.id, packed: false, recommended };
    });

    const newJourney: Journey = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      destination,
      fromDate: fromDate.toLocaleDateString(),
      toDate: toDate.toLocaleDateString(),
      climate: selectedClimate as any,
      condition: detectedCondition,
      packingList: recommendedItems
    };

    addJourney(newJourney);
    setView('list');
    resetForm();
  };

  const resetForm = () => {
    setName(''); setDestination(''); 
    setFromDate(new Date()); setToDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    setDetectedCondition('Select destination for AI analysis');
  };

  const openDetail = (journey: Journey) => {
    setSelectedJourney(journey);
    setView('detail');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.screen}
    >
      <LinearGradient
        colors={['#F0FDF4', '#F6FFFA', '#FFFFFF']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.decorCircle} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        {view !== 'list' && (
          <TouchableOpacity 
            style={styles.iconBtnHeader} 
            onPress={() => setView('list')}
          >
            <ChevronLeft size={22} color="#0A2218" />
          </TouchableOpacity>
        )}
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerLabel}>
             {view === 'list' ? 'Adventures' : view === 'create' ? 'Plan New' : 'Travel Plan'}
          </Text>
          <Text style={styles.headerMainTitle}>
            {view === 'list' ? 'My Journeys' : view === 'create' ? 'Set Journey' : selectedJourney?.name}
          </Text>
        </View>
        {view === 'list' && (
          <TouchableOpacity style={styles.addBtn} onPress={() => setView('create')}>
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flex: 1 }}>
        {view === 'list' && (
          <ScrollView 
            contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
            showsVerticalScrollIndicator={false}
          >
            {journeys.length === 0 ? (
              <Animated.View entering={FadeIn.delay(300)} style={styles.emptyState}>
                <View style={styles.emptyIconWrap}>
                   <Plane size={48} color="#059669" opacity={0.6} />
                </View>
                <Text style={styles.emptyTitle}>No Journeys Found</Text>
                <Text style={styles.emptySubtitle}>Plan your skincare routine for your next trip.</Text>
                <TouchableOpacity style={styles.primaryBtn} onPress={() => setView('create')}>
                  <Text style={styles.primaryBtnText}>Create First Journey</Text>
                  <ArrowRight size={18} color="#fff" />
                </TouchableOpacity>
              </Animated.View>
            ) : (
              journeys.map((j, idx) => (
                <Animated.View key={j.id} entering={FadeInDown.delay(idx * 150)}>
                  <TouchableOpacity style={styles.journeyCard} onPress={() => openDetail(j)}>
                    <View style={styles.cardTop}>
                      <View style={styles.climateDot}>
                         <Sun size={12} color="#FBBF24" />
                      </View>
                      <Text style={styles.climateText}>{j.climate?.toUpperCase()}</Text>
                      <View style={{ flex: 1 }} />
                      <View style={styles.conditionPill}>
                        <Text style={styles.conditionText}>{j.condition || 'Clear'}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.cardMain}>
                      <View style={styles.cardDestWrap}>
                        <Text style={styles.cardDestText} numberOfLines={1}>{j.destination}</Text>
                        <Text style={styles.cardNameText}>{j.name}</Text>
                      </View>
                      <View style={styles.goBtn}>
                         <ArrowRight size={20} color="#fff" />
                      </View>
                    </View>

                    <View style={styles.cardBottom}>
                       <Calendar size={14} color="#9CA3AF" />
                       <Text style={styles.cardDates}>{j.fromDate} — {j.toDate}</Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))
            )}
          </ScrollView>
        )}

        {view === 'create' && (
          <ScrollView 
             contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
             showsVerticalScrollIndicator={false}
             keyboardShouldPersistTaps="handled"
          >
            {/* Improved Input Group with No Space Below */}
            <View style={styles.formGroupCompact}>
               <Text style={styles.label}>Where are you headed?</Text>
               <TouchableOpacity 
                 style={styles.inputWrap} 
                 onPress={() => setIsLocModalVisible(true)}
                 activeOpacity={0.7}
               >
                 <MapPin size={20} color={destination ? "#059669" : "#9CA3AF"} />
                 <Text style={[styles.inputText, !destination && { color: '#9CA3AF' }]}>
                    {destination || 'Search destination...'}
                 </Text>
                 <Search size={18} color="#9CA3AF" />
               </TouchableOpacity>
            </View>

            <View style={styles.aiResultCard}>
              <LinearGradient colors={['#F0FDF4', '#FFFFFF']} style={StyleSheet.absoluteFillObject} />
              <View style={styles.aiHeader}>
                <Sparkles size={16} color="#059669" />
                <Text style={styles.aiLabel}>SKIN AI ANALYSIS</Text>
              </View>
              {isAnalyzing ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator size="small" color="#059669" />
                  <Text style={styles.aiLoadingText}>Analyzing climate & conditions...</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.aiResultTitle}>
                    {destination ? `${selectedClimate.toUpperCase()} CLIMATE` : 'READY TO ANALYZE'}
                  </Text>
                  <Text style={styles.aiResultDesc}>{detectedCondition}</Text>
                </View>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Journey Name</Text>
              <View style={styles.inputWrap}>
                <Flag size={18} color="#9CA3AF" />
                <TextInput 
                  style={styles.input}
                  placeholder="e.g. Summer in Bali"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={styles.row}>
              <TouchableOpacity 
                 style={[styles.formGroup, { flex: 1, marginRight: 10 }]}
                 onPress={() => setShowFromPicker(true)}
              >
                <Text style={styles.label}>Departure</Text>
                <View style={styles.inputWrap}>
                  <Calendar size={18} color="#9CA3AF" />
                  <Text style={styles.dateDisplay}>{fromDate.toLocaleDateString()}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.formGroup, { flex: 1 }]}
                onPress={() => setShowToPicker(true)}
              >
                <Text style={styles.label}>Return</Text>
                <View style={styles.inputWrap}>
                  <Calendar size={18} color="#9CA3AF" />
                  <Text style={styles.dateDisplay}>{toDate.toLocaleDateString()}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.mainSubmitBtn} onPress={handleCreate}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
              <Sparkles size={20} color="#fff" />
              <Text style={styles.mainSubmitBtnText}>Generate Packing Plan</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {view === 'detail' && selectedJourney && (
          <ScrollView 
             contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
             showsVerticalScrollIndicator={false}
          >
            <View style={styles.heroDetailCard}>
              <LinearGradient
                colors={['#059669', '#064E3B']}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={styles.heroDetailTop}>
                <View style={styles.destBadge}>
                  <MapPin size={12} color="#fff" />
                  <Text style={styles.destBadgeText}>{selectedJourney.destination}</Text>
                </View>
                <TouchableOpacity 
                   style={styles.trashCircle}
                   onPress={() => {
                      deleteJourney(selectedJourney.id);
                      setView('list');
                   }}
                >
                  <Trash2 size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              <Text style={styles.heroDetailTitle}>{selectedJourney.name}</Text>
              <View style={styles.heroDetailFooter}>
                <View style={styles.heroDateItem}>
                  <Text style={styles.heroDateLabel}>ENVIRONMENT</Text>
                  <Text style={styles.heroDateValue}>{selectedJourney.condition}</Text>
                </View>
                <View style={styles.heroDot} />
                <View style={styles.heroDateItem}>
                  <Text style={styles.heroDateLabel}>CLIMATE</Text>
                  <Text style={styles.heroDateValue}>{selectedJourney.climate?.toUpperCase()}</Text>
                </View>
              </View>
            </View>

            <View style={styles.packingHeader}>
              <Sparkles size={20} color="#059669" />
              <Text style={styles.packingTitle}>AI Curated Packing List</Text>
            </View>

            {selectedJourney.packingList.filter(p => p.recommended).map((pack, idx) => {
              const item = items.find(i => i.id === pack.itemId);
              if (!item) return null;
              return (
                <Animated.View key={item.id} entering={FadeInDown.delay(idx * 100)}>
                  <View style={styles.packingItemCard}>
                    <View style={[styles.packItemImgWrap, { backgroundColor: item.color || '#F3F4FB' }]}>
                      <Image source={{ uri: item.image }} style={styles.packItemImg} contentFit="contain" />
                    </View>
                    <View style={styles.packItemInfo}>
                      <Text style={styles.packItemBrand}>{item.brand}</Text>
                      <Text style={styles.packItemName}>{item.name}</Text>
                      <View style={styles.recBadge}>
                         <Check size={10} color="#059669" />
                         <Text style={styles.recBadgeText}>Essential for {selectedJourney.climate}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.packCheckBtn}>
                       <View style={styles.packCheckOuter}>
                         <Check size={18} color="#059669" opacity={0.3} />
                       </View>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              );
            })}
          </ScrollView>
        )}
      </View>

      {/* Beautiful Location Fetching Modal */}
      <Modal 
        visible={isLocModalVisible} 
        animationType="slide" 
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={60} style={StyleSheet.absoluteFillObject} tint="dark" />
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
               <TouchableOpacity onPress={() => setIsLocModalVisible(false)} style={styles.closeBtn}>
                 <X size={24} color="#0A2218" />
               </TouchableOpacity>
               <Text style={styles.modalTitle}>Select Destination</Text>
               <View style={{ width: 44 }} />
            </View>
            
            <View style={styles.modalBody}>
               <GooglePlacesAutocomplete
                  placeholder='Where are you headed?'
                  onPress={handleLocationSelect}
                  query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: 'en',
                    components: 'country:tz', // PRIORITIZE TANZANIA context
                  }}
                  predefinedPlaces={[{
                    description: 'Zanzibar, Tanzania',
                    geometry: { location: { lat: -6.137, lng: 39.362 } },
                  }, {
                    description: 'Dar es Salaam, Tanzania',
                    geometry: { location: { lat: -6.792, lng: 39.208 } },
                  }]}
                  styles={{
                    textInput: styles.placesModalInput,
                    container: { flex: 1 },
                    listView: styles.placesModalListView,
                    row: styles.placesRow,
                    description: styles.placesText,
                  }}
                  enablePoweredByContainer={false}
                  renderLeftButton={() => (
                    <View style={styles.searchIconLeft}>
                      <MapPin size={20} color="#059669" />
                    </View>
                  )}
               />
            </View>
          </SafeAreaView>
        </View>
      </Modal>

      {/* Date Pickers */}
      {showFromPicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowFromPicker(false);
            if (date) setFromDate(date);
          }}
        />
      )}
      {showToPicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowToPicker(false);
            if (date) setToDate(date);
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  decorCircle: {
      position: 'absolute',
      width: 400, height: 400, borderRadius: 200,
      backgroundColor: '#10B981', opacity: 0.05,
      top: -150, right: -100,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconBtnHeader: {
    width: 44, height: 44, borderRadius: 15,
    backgroundColor: '#fff', 
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2,
  },
  headerTitleWrap: { flex: 1 },
  headerLabel: {
    fontFamily: AppTypography.bold, fontSize: 11,
    color: '#059669', opacity: 0.7, letterSpacing: 1,
  },
  headerMainTitle: {
    fontFamily: AppTypography.bold, fontSize: 28,
    color: '#0A2218', marginTop: 2,
  },
  addBtn: {
    width: 50, height: 50, borderRadius: 18,
    backgroundColor: '#059669',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#059669', shadowOpacity: 0.25, shadowRadius: 15, elevation: 8,
  },
  scrollContent: { paddingHorizontal: 24, paddingTop: 10 },
  emptyState: { marginTop: hp('15%'), alignItems: 'center' },
  emptyIconWrap: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#F0FDF4', justifyContent: 'center', alignItems: 'center',
  },
  emptyTitle: {
    fontFamily: AppTypography.bold, fontSize: 20,
    color: '#0A2218', marginTop: 25,
  },
  emptySubtitle: {
    fontFamily: AppTypography.medium, fontSize: 14,
    color: '#6B7280', textAlign: 'center',
    marginTop: 10, paddingHorizontal: 40, lineHeight: 22,
  },
  primaryBtn: {
    marginTop: 35,
    backgroundColor: '#059669',
    paddingHorizontal: 30, paddingVertical: 18, borderRadius: 22,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  primaryBtnText: {
    fontFamily: AppTypography.bold, fontSize: 16, color: '#fff',
  },
  journeyCard: {
    backgroundColor: '#fff', borderRadius: 28,
    padding: 24, marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 20, elevation: 4,
    borderWidth: 1, borderColor: '#F3F4F6',
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  climateDot: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#FEF3C7', justifyContent: 'center', alignItems: 'center',
  },
  climateText: {
    fontFamily: AppTypography.bold, fontSize: 11,
    color: '#D97706', marginLeft: 8,
  },
  conditionPill: {
    backgroundColor: '#F0FDF4', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99,
  },
  conditionText: {
    fontFamily: AppTypography.bold, fontSize: 10, color: '#059669',
  },
  cardMain: { flexDirection: 'row', alignItems: 'center' },
  cardDestWrap: { flex: 1 },
  cardDestText: {
    fontFamily: AppTypography.bold, fontSize: 22, color: '#0A2218',
  },
  cardNameText: {
    fontFamily: AppTypography.medium, fontSize: 14, color: '#6B7280', marginTop: 4,
  },
  goBtn: {
    width: 48, height: 48, borderRadius: 16,
    backgroundColor: '#059669', justifyContent: 'center', alignItems: 'center',
  },
  cardBottom: {
    marginTop: 20, paddingTop: 18, borderTopWidth: 1, borderTopColor: '#F3F4F6',
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  cardDates: {
    fontFamily: AppTypography.bold, fontSize: 12, color: '#9CA3AF',
  },
  // Create View Styles
  formGroupCompact: { marginBottom: 15 },
  label: {
    fontFamily: AppTypography.bold, fontSize: 13, color: '#059669',
    marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1,
  },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F9FAFB', borderRadius: 20,
    paddingHorizontal: 20, height: 60,
    borderWidth: 1, borderColor: '#F1F5F9',
  },
  inputText: {
    flex: 1, marginLeft: 12, color: '#0A2218',
    fontFamily: AppTypography.semibold, fontSize: 16,
  },
  aiResultCard: {
    padding: 20, borderRadius: 24, marginVertical: 20,
    borderWidth: 1, borderColor: '#F0FDF4', overflow: 'hidden',
  },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  aiLabel: { fontFamily: AppTypography.bold, fontSize: 10, color: '#059669', opacity: 0.6, letterSpacing: 1 },
  loadingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  aiLoadingText: { fontFamily: AppTypography.medium, fontSize: 13, color: '#6B7280' },
  aiResultTitle: { fontFamily: AppTypography.bold, fontSize: 14, color: '#0A2218' },
  aiResultDesc: { fontFamily: AppTypography.medium, fontSize: 13, color: '#059669', marginTop: 2 },
  formGroup: { marginBottom: 20 },
  input: {
    flex: 1, marginLeft: 12, color: '#0A2218',
    fontFamily: AppTypography.medium, fontSize: 16,
  },
  dateDisplay: {
    flex: 1, marginLeft: 12, color: '#0A2218',
    fontFamily: AppTypography.bold, fontSize: 16,
  },
  row: { flexDirection: 'row' },
  mainSubmitBtn: {
    marginTop: 10, height: 70, borderRadius: 24, overflow: 'hidden',
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12,
  },
  mainSubmitBtnText: {
    fontFamily: AppTypography.bold, fontSize: 18, color: '#fff',
  },
  // Modal Styles
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalContainer: { 
    height: height * 0.85, backgroundColor: '#fff', 
    borderTopLeftRadius: 40, borderTopRightRadius: 40,
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20, elevation: 10,
  },
  modalHeader: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  modalTitle: { fontFamily: AppTypography.bold, fontSize: RFValue(18), color: '#0A2218' },
  closeBtn: { width: 44, height: 44, borderRadius: 15, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center' },
  modalBody: { flex: 1, padding: 20 },
  placesModalInput: {
    height: 60, backgroundColor: '#F9FAFB', borderRadius: 22,
    paddingHorizontal: 20, fontSize: 16, fontFamily: AppTypography.semibold,
    color: '#0A2218', borderWidth: 1, borderColor: '#F1F5F9',
  },
  placesModalListView: { marginTop: 15 },
  placesRow: { padding: 18, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F9FAFB' },
  placesText: { fontFamily: AppTypography.medium, fontSize: 15, color: '#0A2218' },
  searchIconLeft: { position: 'absolute', left: 15, top: 20, zIndex: 1 },
  
  // Detail View Styles
  heroDetailCard: {
    borderRadius: 32, padding: 24, marginBottom: 30, overflow: 'hidden',
  },
  heroDetailTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  destBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12,
  },
  destBadgeText: { fontFamily: AppTypography.bold, fontSize: 12, color: '#fff' },
  trashCircle: {
      width: 40, height: 40, borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center',
  },
  heroDetailTitle: {
    fontFamily: AppTypography.bold, fontSize: 32, color: '#fff', lineHeight: 38,
  },
  heroDetailFooter: {
    marginTop: 25, paddingTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row', alignItems: 'center',
  },
  heroDateItem: { flex: 1 },
  heroDateLabel: {
    fontFamily: AppTypography.bold, fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: 1,
  },
  heroDateValue: {
    fontFamily: AppTypography.bold, fontSize: 16, color: '#fff', marginTop: 4,
  },
  heroDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)', marginHorizontal: 20 },
  packingHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  packingTitle: { fontFamily: AppTypography.bold, fontSize: 18, color: '#0A2218' },
  packingItemCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 24, padding: 16, marginBottom: 15,
    borderWidth: 1, borderColor: '#F3F4F6',
  },
  packItemImgWrap: {
    width: 64, height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
  },
  packItemImg: { width: '80%', height: '80%' },
  packItemInfo: { flex: 1, marginLeft: 16 },
  packItemBrand: {
    fontFamily: AppTypography.bold, fontSize: 11, color: '#059669', textTransform: 'uppercase', letterSpacing: 0.5,
  },
  packItemName: {
    fontFamily: AppTypography.bold, fontSize: 15, color: '#0A2218', marginTop: 2,
  },
  recBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6,
  },
  recBadgeText: {
    fontFamily: AppTypography.bold, fontSize: 10, color: '#6B7280',
  },
  packCheckBtn: { marginLeft: 10 },
  packCheckOuter: {
      width: 44, height: 44, borderRadius: 15, backgroundColor: '#F9FAFB',
      borderWidth: 2, borderColor: '#F1F5F9',
      justifyContent: 'center', alignItems: 'center',
  }
});
