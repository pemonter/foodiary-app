import { Fragment, useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFocusEffect } from 'expo-router';

import { useAuth } from '@/hooks/useAuth';
import { useMeals } from '@/hooks/useMeals';

import { formatHour } from '@/utils/fomartHour';
import { formatFoodNames } from '@/utils/formatFoodNames';

import { DailyStats } from './DailyStats';
import { DateSwitcher } from './DateSwitcher';
import { MealCard } from './MealCard';

function MealsListHeader() {
  const { user } = useAuth();
  const { dailyStats } = useMeals();

  return (
    <Fragment>
      <DateSwitcher />
      <View className="mt-2">
        <DailyStats
          calories={{
            current: dailyStats.calories,
            goal: user!.calories,
          }}
          proteins={{
            current: dailyStats.proteins,
            goal: user!.proteins,
          }}
          carbohydrates={{
            current: dailyStats.carbohydrates,
            goal: user!.carbohydrates,
          }}
          fats={{
            current: dailyStats.fats,
            goal: user!.fats,
          }}
        />
      </View>

      <View className="h-px bg-gray-200 mt-7" />

      <Text className="text-black-700 text-base font-sans-medium tracking-[1.28px] m-5">
        REFEIÇÕES
      </Text>
    </Fragment>
  );
}

function Separator() {
  return <View className="h-6" />;
}

export function MealsList() {
  const { bottom } = useSafeAreaInsets();
  const { meals, refetchMeals } = useMeals();

  useFocusEffect(
    useCallback(() => {
      refetchMeals();
    }, [refetchMeals]),
  );

  return (
    <FlatList
      data={meals}
      keyExtractor={(meal) => meal.id}
      contentContainerStyle={{
        paddingBottom: 80 + 16 + bottom,
      }}
      renderItem={({ item }) => (
        <View className="mx-5">
          <MealCard
            name={item.name}
            icon={item.icon}
            id={item.id}
            date={formatHour(item.createdAt)}
            foods={formatFoodNames(item.foods)}
          />
        </View>
      )}
      ListHeaderComponent={MealsListHeader}
      ListEmptyComponent={() => (
        <View className="flex-1 items-center justify-center">
          <Text className="text-black-700 text-base font-sans-medium tracking-[1.28px] m-5">
            Nenhuma refeição encontrada
          </Text>
        </View>
      )}
      ItemSeparatorComponent={() => <Separator />}
      showsVerticalScrollIndicator={false}
    />
  );
}
