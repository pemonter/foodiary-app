import { capitalizeFirst } from './capitalizeFirst';

export function formatFoodNames(foods: { name: string }[]) {
  const names = foods.map((food) => food.name);
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} e ${names[1]}`;
  const foodsNames = `${names.slice(0, -1).join(', ')} e ${
    names[names.length - 1]
  }`;
  return capitalizeFirst(foodsNames);
}
