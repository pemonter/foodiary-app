import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { FoodsList } from '@/components/FoodsList';
import { Logo } from '@/components/Logo';
import { Macros } from '@/components/Macros';
import { MealHeader } from '@/components/MealHeader';

import { httpClient } from '@/services/httpClient';

import { FoodModel } from '@/models/FoodModel';
import { MealModel } from '@/models/MealModel';
import { StatsModel } from '@/models/StatsModel';

import { useQuery } from '@tanstack/react-query';

export default function MealDetails() {
  const { mealId } = useLocalSearchParams();

  const [mealStats, setMealStats] = useState<StatsModel>({
    calories: 0,
    proteins: 0,
    carbohydrates: 0,
    fats: 0,
  });

  const { data: meal, isFetching } = useQuery({
    queryKey: ['meal', mealId],
    staleTime: Infinity,
    queryFn: async () => {
      const { data } = await httpClient.get<{ meal: MealModel }>(
        `/meals/${mealId}`,
      );

      return data.meal;
    },
    refetchInterval: (query) => {
      if (query.state.data?.status === 'success') {
        return false;
      }

      return 3_000;
    },
  });

  useEffect(() => {
    if (meal) {
      setMealStats(
        meal.foods.reduce(
          (acc: StatsModel, food: FoodModel) => {
            acc.calories += food.calories;
            acc.proteins += food.proteins;
            acc.carbohydrates += food.carbohydrates;
            acc.fats += food.fats;
            return acc;
          },
          { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
        ),
      );
    }
  }, [meal]);

  if (isFetching || meal?.status !== 'success') {
    return (
      <View className="bg-lime-700 flex-1 items-center justify-center">
        <Logo width={187} height={60} />
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <MealHeader calories={mealStats.calories} />
      <Macros
        carbohydrates={mealStats.carbohydrates}
        proteins={mealStats.proteins}
        fats={mealStats.fats}
      />
      <FoodsList name={meal!.name} foods={meal!.foods ?? []} />
    </View>
  );
}
