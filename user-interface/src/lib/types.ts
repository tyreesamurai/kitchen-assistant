import { z } from "zod";

const NutritionSchema = z.object({
  calories: z.number(),
  fats: z.number(),
  carbs: z.number(),
  protein: z.number(),
});

const CookingTimeSchema = z.object({
  prep_time: z.number(),
  cook_time: z.number(),
  cool_time: z.number(),
  additional_time: z.number(),
  rest_time: z.number(),
  total_time: z.number(),
});

const RecipeSchema = z.object({
  id: z.coerce.number().int(),
  name: z.string(),
  description: z.string(),
  instructions: z.string(),
  nutrition: NutritionSchema,
  cooking_time: CookingTimeSchema,
  serving: z.coerce.number(),
  image_url: z.string().url(),
  input_url: z.string().url(),
});

const IngredientSchema = z.object({
  id: z.coerce.number().int(),
  name: z.string(),
});

const RecipeIngredients = z.object({
  recipe_id: z.coerce.number().int(),
  ingredient_id: z.coerce.number().int(),
  quantity: z.number(),
  unit: z.string(),
});

export type CookingTime = z.infer<typeof CookingTimeSchema>;
export type Nutrition = z.infer<typeof NutritionSchema>;
export type Recipe = z.infer<typeof RecipeSchema>;
export type Ingredient = z.infer<typeof IngredientSchema>;
export type RecipeIngredient = z.infer<typeof RecipeIngredients>;

export const validateRecipe = (recipe: unknown): Recipe => {
  return RecipeSchema.parse(recipe);
};
export const validateIngredient = (ingredient: unknown): Ingredient => {
  return IngredientSchema.parse(ingredient);
};
export const validateRecipeIngredient = (
  recipeIngredient: unknown,
): RecipeIngredient => {
  return RecipeIngredients.parse(recipeIngredient);
};
