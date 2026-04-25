import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-surface px-6">
      <Stack.Screen options={{ headerShown: false }} />
      <Text className="text-[22px] font-bold text-[#1A1A2E]">Product Detail</Text>
      <Text className="mt-2 text-center text-[14px] text-gray-500">Product id: {id}</Text>
      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        className="mt-6 flex-row items-center rounded-full bg-primary px-5 py-3">
        <Ionicons name="arrow-back" size={16} color="#FFFFFF" />
        <Text className="ml-2 text-[13px] font-semibold text-white">Back</Text>
      </Pressable>
    </View>
  );
}
