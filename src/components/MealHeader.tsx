import { Text, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ChevronLeft } from 'lucide-react-native';

interface MealHeaderProps {
  calories: number;
}

export function MealHeader({ calories }: MealHeaderProps) {
  const { top } = useSafeAreaInsets();

  return (
    <View className="bg-black-700" style={{ height: top + 64 }}>
      <StatusBar style="light" />
      <SafeAreaView className="pr-4 py-2 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className="size-12 items-center justify-center"
            onPress={router.back}
          >
            <ChevronLeft color={'white'} size={20} />
          </TouchableOpacity>
          <Text className="text-gray-300 text-base font-sans-medium">
            Macros Totais
          </Text>
        </View>

        <View>
          <Text className="text-gray-300 text-sm font-sans-regular">
            Calorias {calories}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
