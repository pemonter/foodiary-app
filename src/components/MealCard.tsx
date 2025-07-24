import { Text, TouchableOpacity, View } from 'react-native';

import { Link } from 'expo-router';

interface MealCardProps {
  id: string;
  name: string;
  icon: string;
  date: string;
  foods: string;
}

export function MealCard({ id, name, icon, date, foods }: MealCardProps) {
  return (
    <Link href={`/meals/${id}`} asChild>
      <TouchableOpacity>
        <Text className="text-base font-sans-regular text-gray-700">
          {date}
        </Text>

        <View className="mt-2 px-4 py-5 flex-row gap-3 items-center border border-gray-400 rounded-2xl">
          <View className="size-12 bg-gray-200 rounded-full items-center justify-center">
            <Text>{icon}</Text>
          </View>

          <View className="flex-1">
            <Text className="text-base font-sans-regular text-gray-700">
              {name}
            </Text>
            <Text className="text-base font-sans-medium text-black-700">
              {foods}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
