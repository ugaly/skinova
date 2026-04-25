import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Modal, Animated, Dimensions, Pressable } from 'react-native';

type ModalType = 'welcome' | 'recommendation' | 'alert' | 'video' | 'gif' | 'gallery' | 'sales';

interface ModalData {
  title?: string;
  message?: string;
  image?: string;
  secondaryImage?: string;
  videoUrl?: string;
  ctaText?: string;
}

interface ModalContextType {
  showModal: (type: ModalType, data?: ModalData) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useProModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useProModal must be used within a ModalProvider');
  return context;
};

// Internal implementation of the modal dispatcher
import { WelcomeModal } from '../../components/modals/WelcomeModal';
import { RecommendationModal } from '../../components/modals/RecommendationModal';
import { AlertModal } from '../../components/modals/AlertModal';
import { VideoModal } from '../../components/modals/VideoModal';
import { GifModal } from '../../components/modals/GifModal';
import { GalleryModal } from '../../components/modals/GalleryModal';
import { SalesModal } from '../../components/modals/SalesModal';

const MODAL_SEQUENCE: { type: ModalType; data: ModalData }[] = [
  {
    type: 'welcome',
    data: { title: 'Welcome Back!', message: 'Your personalized skin routine is ready for a new glow today.' }
  },
  {
    type: 'recommendation',
    data: {
      title: 'New for You',
      message: 'Based on your recent scan, this serum might be your new favorite.',
      image: 'https://i.pinimg.com/1200x/ab/e5/64/abe564b4b5c147594bd5aab157fe5bc0.jpg',
      ctaText: 'Try Now'
    }
  },
  {
    type: 'video',
    data: {
      videoUrl: 'https://v1.pinimg.com/videos/iht/hls/42/cf/86/42cf860fbb6bf58651367698547408ea_720w.cmfv',
      title: 'Skincare Mastery',
      message: 'Learn the professional way to apply your hydrating serums.'
    }
  },
  {
    type: 'gallery',
    data: {
      title: 'Texture Spotlight',
      message: 'Understanding the consistency of your routine ingredients.',
      image: 'https://i.pinimg.com/1200x/eb/4f/f9/eb4ff9035ab8ca54f1b1b5dfa04891ac.jpg',
      secondaryImage: 'https://i.pinimg.com/1200x/49/ff/f9/49fff9745db9628ca5f7f072ca37a100.jpg'
    }
  },
  {
    type: 'sales',
    data: {
      title: 'Personalized Offers',
      message: 'Flash deals on products your skin needs today.'
    }
  },
  {
    type: 'video',
    data: {
      videoUrl: 'https://v1.pinimg.com/videos/iht/hls/a9/69/a9/a969a94750a98aa8641d444da033235e_480w.cmfv',
      title: '',
      message: 'Learn the professional way to apply your hydrating serums.'
    }
  },
];

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalData, setModalData] = useState<ModalData | undefined>(undefined);
  const seqIndexRef = useRef(0);
  const visibleRef = useRef(false);

  const showModal = useCallback((type: ModalType, data?: ModalData) => {
    setModalType(type);
    setModalData(data);
    setVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setModalType(null);
      setModalData(undefined);
    }, 300);
  }, []);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  // Automated circulation logic (every minute)
  useEffect(() => {
    const interval = setInterval(() => {
      if (visibleRef.current) return;

      const nextModal = MODAL_SEQUENCE[seqIndexRef.current];
      showModal(nextModal.type, nextModal.data);
      seqIndexRef.current = (seqIndexRef.current + 1) % MODAL_SEQUENCE.length;
    }, 60000);

    return () => clearInterval(interval);
  }, [showModal]);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={hideModal}
      >
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={hideModal} />
          <View style={styles.container}>
            {modalType === 'welcome' && <WelcomeModal data={modalData} onClose={hideModal} />}
            {modalType === 'recommendation' && <RecommendationModal data={modalData} onClose={hideModal} />}
            {modalType === 'alert' && <AlertModal data={modalData} onClose={hideModal} />}
            {modalType === 'video' && <VideoModal data={modalData} onClose={hideModal} />}
            {modalType === 'gif' && <GifModal data={modalData} onClose={hideModal} />}
            {modalType === 'gallery' && <GalleryModal data={modalData} onClose={hideModal} />}
            {modalType === 'sales' && <SalesModal data={modalData} onClose={hideModal} />}
          </View>
        </View>
      </Modal>
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 34, 24, 0.7)', // Dark greenish overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 400,
  },
});
