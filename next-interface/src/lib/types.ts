import { z } from "zod";

const RecipeSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  cookTime: z.coerce.number().int().nullable(),
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
  isPublic: z.coerce.boolean().optional(),
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

const RecipeCreatorSchema = RecipeSchema.omit({ id: true });
const IngredientCreatorSchema = IngredientSchema.omit({ id: true });

export type Recipe = z.infer<typeof RecipeSchema>;
export type Recipes = z.infer<z.ZodArray<typeof RecipeSchema>>;
export type RecipeCreator = z.infer<typeof RecipeCreatorSchema>;
export type Ingredient = z.infer<typeof IngredientSchema>;
export type Ingredients = z.infer<z.ZodArray<typeof IngredientSchema>>;
export type IngredientCreator = z.infer<typeof IngredientCreatorSchema>;
export const validateRecipe = (data: unknown) => RecipeSchema.parse(data);
export const validateRecipeCreator = (data: unknown) =>
  RecipeCreatorSchema.parse(data);
export const validateIngredient = (data: unknown) =>
  IngredientSchema.parse(data);
export const validateIngredientCreator = (data: unknown) =>
  IngredientCreatorSchema.parse(data);
