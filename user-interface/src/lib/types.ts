import { z } from "zod";

const NutritionSchema = z.object({
  calories: z.coerce.number(),
  fat: z.coerce.number(),
  carbs: z.coerce.number(),
  protein: z.coerce.number(),
});

const CookingTimeSchema = z.object({
  prepTime: z.coerce.number(),
  cookTime: z.coerce.number(),
  restTime: z.coerce.number(),
  totalTime: z.coerce.number(),
});

const RecipeSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  description: z.string(),
  instructions: z.string(),
  nutrition: NutritionSchema,
  cooking_time: CookingTimeSchema,
  servings: z.coerce.number(),
  image_url: z.string(),
  input_url: z.string(),
});

const IngredientSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
});

const RecipeIngredientsSchema = z.object({
  recipe_id: z.coerce.number(),
  ingredient_id: z.coerce.number(),
  quantity: z.coerce.number(),
  unit: z.string(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
export const validateRecipe = (data: unknown) => {
  return RecipeSchema.parse(data);
};
export type Ingredient = z.infer<typeof IngredientSchema>;
export const validateIngredient = (data: unknown) => {
  return IngredientSchema.parse(data);
};
export type RecipeIngredients = z.infer<typeof RecipeIngredientsSchema>;
export const validateRecipeIngredients = (data: unknown) => {
  return RecipeIngredientsSchema.parse(data);
};
