import { Ionicons } from '@expo/vector-icons';
import { Pressable, TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onScanPress: () => void;
}

export function SearchBar({ value, onChangeText, onScanPress }: SearchBarProps) {
  return (
    <View className="flex-row items-center rounded-full bg-gray-100 px-4 py-3 shadow-sm">
      <Ionicons name="search-outline" size={19} color="#6B7280" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search skincare products..."
        placeholderTextColor="#9CA3AF"
        className="ml-2 flex-1 text-[14px] text-[#1A1A2E]"
        accessibilityLabel="Search products input"
      />
      <Pressable
        onPress={onScanPress}
        accessibilityRole="button"
        accessibilityLabel="Scan product barcode"
        className="h-9 w-9 items-center justify-center rounded-full bg-white">
        <Ionicons name="scan-outline" size={19} color="#2D6A4F" />
      </Pressable>
    </View>
  );
}
