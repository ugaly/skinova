import React, { createContext, useContext } from 'react';
import { useCameraPermissions } from 'expo-camera';
import { Alert, Linking } from 'react-native';

interface PermissionsContextType {
  cameraPermission: any;
  requestCamera: () => Promise<boolean>;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
  const [permission, requestPermission] = useCameraPermissions();

  const requestCamera = async () => {
    const result = await requestPermission();
    if (!result.granted) {
      Alert.alert(
        'Permission Required',
        'We need camera access to analyze your skin.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Settings', onPress: () => Linking.openSettings() }
        ]
      );
      return false;
    }
    return true;
  };

  return (
    <PermissionsContext.Provider value={{ cameraPermission: permission, requestCamera }}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
}
