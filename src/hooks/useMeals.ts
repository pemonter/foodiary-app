import { use } from 'react';

import { MealsContext } from '@/contexts/MealsContext';

export function useMeals() {
  return use(MealsContext);
}
