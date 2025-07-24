import { Text, View } from 'react-native';

import { cn } from '@/utils/cn';

interface NutritionItemProps {
  name: string;
  type: 'protein' | 'carbohydrate' | 'fat';
  value: number;
  percentage: number;
}

export type TotalMacros = {
  carbohydrates: number;
  proteins: number;
  fats: number;
};

function getColorByNutritionType(type: 'protein' | 'carbohydrate' | 'fat') {
  if (type === 'carbohydrate') return 'text-support-yellow';
  if (type === 'protein') return 'text-support-teal';
  if (type === 'fat') return 'text-support-orange';
}

function NutritionItem({ name, type, value, percentage }: NutritionItemProps) {
  return (
    <View className="gap-2 items-center justify-center">
      <Text className="text-gray-700 text-base font-sans-regular">{name}</Text>
      <Text
        className={cn(
          'text-base font-sans-medium',
          getColorByNutritionType(type),
        )}
      >
        {Math.round(value)}g ({percentage}%)
      </Text>
    </View>
  );
}

function Bar({ carbohydrates, proteins, fats }: TotalMacros) {
  return (
    <View className="flex-row items-center justify-center">
      <View
        className="h-1 bg-support-yellow"
        style={{ width: `${carbohydrates}%` }}
      />
      <View className="h-1 bg-support-teal" style={{ width: `${proteins}%` }} />
      <View className="h-1 bg-support-orange" style={{ width: `${fats}%` }} />
    </View>
  );
}

function calculateMacrosPercentage(
  carbohydrate: number,
  protein: number,
  fat: number,
) {
  const total = carbohydrate + protein + fat;
  if (total === 0) {
    return {
      carbohydrate: 0,
      protein: 0,
      fat: 0,
    };
  }
  return {
    carbohydrate: Math.round((carbohydrate / total) * 100),
    protein: Math.round((protein / total) * 100),
    fat: Math.round((fat / total) * 100),
  };
}

export function Macros({ carbohydrates, proteins, fats }: TotalMacros) {
  const percentages = calculateMacrosPercentage(carbohydrates, proteins, fats);

  return (
    <View className="p-5 gap-6 items-center">
      <View className="flex-row gap-6 items-center justify-around w-full">
        <NutritionItem
          name="Carboidratos"
          type="carbohydrate"
          value={carbohydrates}
          percentage={percentages.carbohydrate}
        />
        <NutritionItem
          name="Proteínas"
          type="protein"
          value={proteins}
          percentage={percentages.protein}
        />
        <NutritionItem
          name="Gorduras"
          type="fat"
          value={fats}
          percentage={percentages.fat}
        />
      </View>
      <Bar
        carbohydrates={percentages.carbohydrate}
        proteins={percentages.protein}
        fats={percentages.fat}
      />
    </View>
  );
}
