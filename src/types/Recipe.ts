export type Recipe = {
  id: number;
  name: string;
  description: string | null;
  instructions: string | null;
  category: string | null;
  cuisine: string | null;
  nutrition: NutritionInfo;
  cookTime: number | null;
  estimatedCost: number | null;
  createdAt: Date;
  imageUrl: string | null;
  ingredients: Ingredient[];
};

export type NutritionInfo = {
  calorites: number;
  carbs: number;
  fats: number;
  protein: number;
};

export type Ingredient = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  description?: string;
  nutrition?: NutritionInfo;
  estimatedCost?: number;
  imageUrl?: string;
};
