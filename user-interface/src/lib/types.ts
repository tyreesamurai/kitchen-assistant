import { z } from "zod";

const recipeSchema = z.object({
  id: z.coerce.number().int(),
  name: z.string(),
  description: z.string(),
  instructions: z.string(),
  nutrition: z.object({
    calories: z.coerce.number(),
    fat: z.coerce.number().int(),
    carbs: z.coerce.number().int(),
    protein: z.coerce.number().int(),
  }),
  cooking_time: z.object({
    cook_time: z.coerce.number().int(),
    additional_time: z.coerce.number().int(),
    prep_time: z.coerce.number().int(),
    total_time: z.coerce.number().int(),
    rest_time: z.coerce.number().int(),
    cool_time: z.coerce.number().int(),
  }),
  servings: z.coerce.number().int(),
  image_url: z.string().url(),
  input_url: z.string().url(),
});

const ingredientSchema = z.object({
  id: z.coerce.number().int(),
  name: z.string(),
  quantity: z.number(),
  unit: z.string(),
});

export type Recipe = z.infer<typeof recipeSchema>;
export const validateRecipe = (data: unknown): Recipe => {
  return recipeSchema.parse(data);
};
export const validateRecipes = (data: unknown): Recipe[] => {
  return z.array(recipeSchema).parse(data);
};

export type Ingredient = z.infer<typeof ingredientSchema>;
export const validateIngredient = (data: unknown): Ingredient => {
  return ingredientSchema.parse(data);
};
export const validateIngredients = (data: unknown): Ingredient[] => {
  return z.array(ingredientSchema).parse(data);
};
