import { ScrollView, Text, View } from 'react-native';

import { FoodModel } from '@/models/FoodModel';

interface FoodsListProps {
  name: string;
  foods: FoodModel[];
}

export function FoodsList({ name, foods }: FoodsListProps) {
  return (
    <View className="p-5 gap-6">
      <Text className="text-black-700 text-2xl font-sans-semibold">{name}</Text>
      <ScrollView className="h-full w-full gap-2">
        <Text className="text-gray-700 text-base font-sans-medium">Itens</Text>
        {foods.map((food) => (
          <View
            key={food.name}
            className="flex-row gap-1 p-[14px] border-b border-gray-400 w-full"
          >
            <Text className="text-black-700 text-base font-sans-regular">
              {food.quantity}
            </Text>
            <Text className="text-black-700 text-base font-sans-regular">
              {food.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
