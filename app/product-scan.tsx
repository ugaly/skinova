import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Barcode, ChevronLeft, QrCode, ScanLine, Star, Truck, X } from 'lucide-react-native';

import { AppTypography } from '@/constants/design';

type ScanPayload = {
  type: string;
  data: string;
};

type SampleProduct = {
  id: string;
  name: string;
  brand: string;
  price: string;
  fit: number;
  image: string;
  description: string;
};

const SAMPLE_PRODUCTS: SampleProduct[] = [
  {
    id: 'p1',
    name: 'Pure4 Radiance Serum',
    brand: 'Joyce Giraud',
    price: '$45',
    fit: 92,
    image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331',
    description: 'Brightening and hydration support with lightweight finish.',
  },
  {
    id: 'p2',
    name: 'Ultimate Beauty Sleep',
    brand: 'Joyce Giraud',
    price: '$59',
    fit: 88,
    image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919',
    description: 'Overnight recovery cream for calm, nourished skin.',
  },
  {
    id: 'p3',
    name: '2-Min Hair Mask',
    brand: 'Joyce Giraud',
    price: '$34',
    fit: 81,
    image: 'https://www.joycegiraud.com/cdn/shop/files/2_min_hair_mask_big_600x.png?v=1737736819',
    description: 'Fast deep-conditioning care with restorative actives.',
  },
];

export default function ProductScanScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [lastScan, setLastScan] = useState<ScanPayload | null>(null);
  const [matchedProduct, setMatchedProduct] = useState<SampleProduct | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') return;
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: ScanPayload) => {
    setScanned(true);
    const payload = { type, data };
    setLastScan(payload);
    const seed = data.length % SAMPLE_PRODUCTS.length;
    setMatchedProduct(SAMPLE_PRODUCTS[seed]);
    setShowResult(true);
  };

  if (!permission?.granted) {
    return (
      <View style={styles.permissionScreen}>
        <Text style={styles.permissionTitle}>Camera permission not granted</Text>
        <Text style={styles.permissionSub}>We need camera access to scan product QR and barcode.</Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>Request Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <ChevronLeft size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Scan Product with AI</Text>
        <View style={styles.iconBtnGhost} />
      </View>

      <View style={styles.layerContainer}>
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerSide} />
          <View style={styles.focusedWrap}>
            <View style={styles.focused}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </View>
          </View>
          <View style={styles.layerSide} />
        </View>
        <View style={styles.layerBottom} />
      </View>

      {showResult && matchedProduct ? (
        <View style={styles.resultOverlay}>
          <View style={styles.resultModal}>
            <TouchableOpacity style={styles.closeResultBtn} onPress={() => setShowResult(false)}>
              <X size={16} color="#64748B" />
            </TouchableOpacity>
            <View style={styles.resultTop}>
              <Image source={{ uri: matchedProduct.image }} style={styles.resultImage} contentFit="contain" />
              <View style={{ flex: 1 }}>
                <View style={styles.brandBadge}>
                  <Text style={styles.brandBadgeText}>{matchedProduct.brand}</Text>
                </View>
                <Text style={styles.resultProductTitle}>{matchedProduct.name}</Text>
                <Text style={styles.resultDesc}>{matchedProduct.description}</Text>
                <View style={styles.resultMetaRow}>
                  <View style={styles.metaMini}>
                    <Star size={11} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.metaMiniText}>{matchedProduct.fit}% fit</Text>
                  </View>
                  <View style={styles.metaMini}>
                    <Truck size={11} color="#059669" />
                    <Text style={styles.metaMiniText}>Nearby suppliers</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.resultFooter}>
              <Text style={styles.resultPrice}>{matchedProduct.price}</Text>
              <TouchableOpacity
                style={styles.openDetailBtn}
                onPress={() => {
                  setShowResult(false);
                  router.push({
                    pathname: '/modal-detail2',
                    params: {
                      title: matchedProduct.name,
                      image: matchedProduct.image,
                      message: matchedProduct.description,
                    },
                  });
                }}
              >
                <Text style={styles.openDetailBtnText}>Open Product</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}

      <View style={[styles.bottomPanel, { paddingBottom: insets.bottom + 14 }]}>
        <Text style={styles.bottomTitle}>Align QR or barcode inside the frame</Text>
        <Text style={styles.bottomSub}>We support product QR and standard barcodes for instant AI lookup.</Text>
        <View style={styles.bottomMeta}>
          <View style={styles.metaPill}>
            <QrCode size={13} color="#047857" />
            <Text style={styles.metaText}>QR code</Text>
          </View>
          <View style={styles.metaPill}>
            <Barcode size={13} color="#047857" />
            <Text style={styles.metaText}>Barcode</Text>
          </View>
          <View style={styles.metaPill}>
            <ScanLine size={13} color="#047857" />
            <Text style={styles.metaText}>AI Match</Text>
          </View>
        </View>

        {lastScan ? (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Last Scan</Text>
            <Text style={styles.resultText} numberOfLines={1}>Type: {lastScan.type}</Text>
            <Text style={styles.resultText} numberOfLines={1}>Data: {lastScan.data}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.scanAgainBtn}
          onPress={() => {
            setScanned(false);
            setShowResult(false);
          }}
          activeOpacity={0.9}
        >
          <Text style={styles.scanAgainText}>{scanned ? 'Scan Again' : 'Ready to Scan'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000' },
  permissionScreen: {
    flex: 1,
    backgroundColor: '#F3FCF8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 26,
  },
  permissionTitle: {
    fontFamily: AppTypography.bold,
    color: '#0A2B20',
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
  },
  permissionSub: {
    fontFamily: AppTypography.medium,
    color: '#4F7667',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 18,
  },
  permissionBtn: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#059669',
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionBtnText: { fontFamily: AppTypography.bold, color: '#fff', fontSize: 14 },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(15,23,42,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnGhost: { width: 40, height: 40 },
  topTitle: {
    fontFamily: AppTypography.bold,
    color: '#FFFFFF',
    fontSize: 17,
  },
  layerContainer: { flex: 1 },
  layerTop: { flex: 1.2, backgroundColor: 'rgba(0,0,0,0.58)' },
  layerCenter: { flexDirection: 'row' },
  layerSide: { flex: 1, backgroundColor: 'rgba(0,0,0,0.58)' },
  focusedWrap: { width: 245, height: 245 },
  focused: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.22)',
    backgroundColor: 'rgba(16,185,129,0.04)',
  },
  corner: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderColor: '#22C55E',
  },
  cornerTL: { top: -2, left: -2, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 12 },
  cornerTR: { top: -2, right: -2, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 12 },
  cornerBL: { bottom: -2, left: -2, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 12 },
  cornerBR: { bottom: -2, right: -2, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 12 },
  layerBottom: { flex: 1.5, backgroundColor: 'rgba(0,0,0,0.58)' },
  bottomPanel: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.98)',
    paddingTop: 14,
    paddingHorizontal: 14,
  },
  bottomTitle: { fontFamily: AppTypography.bold, color: '#0D2B20', fontSize: 15, marginBottom: 4 },
  bottomSub: { fontFamily: AppTypography.medium, color: '#5A7A6E', fontSize: 12.5, lineHeight: 18 },
  bottomMeta: { flexDirection: 'row', gap: 8, marginTop: 10, marginBottom: 10 },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  metaText: { fontFamily: AppTypography.semibold, color: '#047857', fontSize: 11.5 },
  resultCard: {
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    marginBottom: 10,
  },
  resultTitle: { fontFamily: AppTypography.bold, color: '#0F172A', fontSize: 12.5, marginBottom: 4 },
  resultText: { fontFamily: AppTypography.medium, color: '#475569', fontSize: 11.5 },
  resultOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2,6,23,0.45)',
    justifyContent: 'flex-end',
    zIndex: 50,
  },
  resultModal: {
    marginHorizontal: 10,
    marginBottom: 98,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.15)',
    padding: 12,
    shadowColor: '#020617',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  closeResultBtn: {
    alignSelf: 'flex-end',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    marginBottom: 8,
  },
  resultTop: { flexDirection: 'row', gap: 10 },
  resultImage: {
    width: 94,
    height: 104,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
  },
  brandBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 7,
  },
  brandBadgeText: { fontFamily: AppTypography.bold, color: '#047857', fontSize: 10 },
  resultProductTitle: { fontFamily: AppTypography.bold, color: '#0A2B20', fontSize: 15, marginBottom: 4 },
  resultDesc: { fontFamily: AppTypography.medium, color: '#5A7A6E', fontSize: 12, lineHeight: 17, marginBottom: 8 },
  resultMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  metaMini: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  metaMiniText: { fontFamily: AppTypography.semibold, color: '#334155', fontSize: 10.5 },
  resultFooter: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultPrice: { fontFamily: AppTypography.bold, color: '#059669', fontSize: 18 },
  openDetailBtn: {
    height: 38,
    borderRadius: 10,
    backgroundColor: '#059669',
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openDetailBtnText: { fontFamily: AppTypography.bold, color: '#FFFFFF', fontSize: 12.5 },
  scanAgainBtn: {
    height: 46,
    borderRadius: 12,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanAgainText: { fontFamily: AppTypography.bold, color: '#fff', fontSize: 14 },
});

