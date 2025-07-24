import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { httpClient } from '@/services/httpClient';

import { FoodModel } from '@/models/FoodModel';
import { MealModel } from '@/models/MealModel';
import { StatsModel } from '@/models/StatsModel';

import { useQuery } from '@tanstack/react-query';

interface MealsContextValue {
  isLoading: boolean;
  meals: MealModel[] | null;
  dailyStats: StatsModel;
  formattedCurrentDate: string;
  handleChangeDate: (direction: 'next' | 'prev') => void;
  refetchMeals: () => void;
}

export const MealsContext = createContext({} as MealsContextValue);

export function MealsProvider({ children }: { children: ReactNode }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const {
    data: meals,
    isFetching,
    refetch: refetchMeals,
  } = useQuery<MealModel[]>({
    queryKey: ['meals', currentDate],
    staleTime: 15_000,
    queryFn: async () => {
      const date = new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(currentDate);

      const { data } = await httpClient.get<{ meals: MealModel[] }>('/meals', {
        params: {
          date,
        },
      });

      return data.meals;
    },
  });

  const dailyStats = useMemo<StatsModel>(() => {
    if (meals && meals.length > 0) {
      const dailyStats = meals.reduce(
        (acc: StatsModel, meal: MealModel) => {
          meal.foods.forEach((food: FoodModel) => {
            acc.calories += food.calories;
            acc.proteins += food.proteins;
            acc.carbohydrates += food.carbohydrates;
            acc.fats += food.fats;
          });
          return acc;
        },
        { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
      );

      return dailyStats;
    }

    return {
      calories: 0,
      carbohydrates: 0,
      fats: 0,
      proteins: 0,
    };
  }, [meals]);

  const formattedCurrentDate = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const current = new Date(currentDate);
    current.setHours(0, 0, 0, 0);

    let formatted = '';

    if (current.getTime() === today.getTime()) {
      formatted = `HOJE, ${current
        .getDate()
        .toString()
        .padStart(2, '0')} DE ${current
        .toLocaleString('pt-BR', { month: 'long' })
        .toUpperCase()}`;
    } else if (current.getTime() === yesterday.getTime()) {
      formatted = `ONTEM, ${current
        .getDate()
        .toString()
        .padStart(2, '0')} DE ${current
        .toLocaleString('pt-BR', { month: 'long' })
        .toUpperCase()}`;
    } else {
      const weekDay = current
        .toLocaleString('pt-BR', { weekday: 'long' })
        .toUpperCase();
      formatted = `${weekDay}, ${current
        .getDate()
        .toString()
        .padStart(2, '0')} DE ${current
        .toLocaleString('pt-BR', { month: 'long' })
        .toUpperCase()}`;
    }

    return formatted;
  }, [currentDate]);

  const handleChangeDate = useCallback((direction: 'next' | 'prev') => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (direction === 'next') {
        newDate.setDate(newDate.getDate() + 1);
      } else if (direction === 'prev') {
        newDate.setDate(newDate.getDate() - 1);
      }
      return newDate;
    });
  }, []);

  return (
    <MealsContext.Provider
      value={{
        isLoading: isFetching,
        meals: meals ?? null,
        dailyStats,
        formattedCurrentDate,
        handleChangeDate,
        refetchMeals,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
}
