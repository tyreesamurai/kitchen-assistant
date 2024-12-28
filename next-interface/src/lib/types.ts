import { z } from "zod";

const RecipeSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  cookTime: z.coerce.number().nullable(),
  category: z.string().nullable(),
  cuisine: z.string().nullable(),
  instructions: z.string().nullable(),
  description: z.string().nullable(),
  nutrition: z
    .object({
      calories: z.coerce.number(),
      fats: z.coerce.number(),
      carbs: z.coerce.number(),
      protein: z.coerce.number(),
    })
    .nullable(),
  isPublished: z.coerce.boolean().optional(),
  imageUrl: z.string().nullable(),
});

const IngredientSchema = z.object({
  id: z.coerce.string(),
  name: z.string(),
  description: z.string().nullable(),
  nutrition: z
    .object({
      calories: z.coerce.number(),
      fats: z.coerce.number(),
      carbs: z.coerce.number(),
      protein: z.coerce.number(),
    })
    .nullable(),
  imageUrl: z.string().nullable(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
export type Recipes = z.infer<z.ZodArray<typeof RecipeSchema>>;
export type Ingredient = z.infer<typeof IngredientSchema>;
export type Ingredients = z.infer<z.ZodArray<typeof IngredientSchema>>;
export const validateRecipe = (data: unknown) => RecipeSchema.parse(data);
export const validateIngredient = (data: unknown) =>
  IngredientSchema.parse(data);
