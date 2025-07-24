import { FoodModel } from './FoodModel';

export type MealModel = {
  id: string;
  name: string;
  icon: string;
  status: 'uploading' | 'processing' | 'success' | 'failed';
  foods: FoodModel[];
  createdAt: string;
};
