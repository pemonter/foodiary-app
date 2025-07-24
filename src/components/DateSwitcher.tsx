import { Text, TouchableOpacity, View } from 'react-native';

import { useMeals } from '@/hooks/useMeals';

import { colors } from '@/styles/colors';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';

export function DateSwitcher() {
  const { formattedCurrentDate, handleChangeDate } = useMeals();
  return (
    <View className="px-2 mt-3 flex-row items-center justify-between">
      <TouchableOpacity
        className="size-12 items-center justify-center"
        onPress={() => handleChangeDate('prev')}
      >
        <ChevronLeftIcon color={colors.black[700]} size={20} />
      </TouchableOpacity>

      <Text className="text-gray-700 text-base font-sans-medium tracking-[1.28px]">
        {formattedCurrentDate}
      </Text>

      <TouchableOpacity
        className="size-12 items-center justify-center"
        onPress={() => handleChangeDate('next')}
      >
        <ChevronRightIcon color={colors.black[700]} size={20} />
      </TouchableOpacity>
    </View>
  );
}
