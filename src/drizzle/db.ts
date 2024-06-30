import "@/drizzle/envConfig";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";
import { Recipe, NutritionInfo, Ingredient } from "@/types/Recipe";
import { eq } from "drizzle-orm";

export const db = drizzle(sql, { schema });

const insertRecipe = async (recipe: Recipe) => {
  const [result] = await db
    .insert(schema.recipes)
    .values({
      name: recipe.name,
      description: recipe.description,
      instructions: recipe.instructions,
      category: recipe.category,
      cuisine: recipe.cuisine,
      nutrition: recipe.nutrition,
      cookTime: recipe.cookTime,
      estimatedCost: recipe.estimatedCost,
      createdAt: recipe.createdAt,
      imageUrl: recipe.imageUrl,
    })
    .onConflictDoNothing()
    .returning({ id: schema.recipes.id });

  await Promise.all(
    recipe.ingredients.map(async (ingredient) => {
      await db
        .insert(schema.recipeIngredients)
        .values({
          recipeId: result.id,
          ingredientId: await getIngredientId(ingredient),
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        })
        .onConflictDoNothing();
    }),
  );
};

const getIngredientId = async (ingredient: Ingredient) => {
  const [result] = await db
    .insert(schema.ingredients)
    .values({
      name: ingredient.name,
      description: ingredient.description,
      nutrition: ingredient.nutrition,
      estimatedCost: ingredient.estimatedCost,
      imageUrl: ingredient.imageUrl,
    })
    .onConflictDoNothing({ target: schema.ingredients.name })
    .returning({ id: schema.ingredients.id });
  return result.id;
};

const getRecipeById = async (id: number) => {
  const [recipeResult = null] = await db
    .select()
    .from(schema.recipes)
    .where(eq(schema.recipes.id, id));

  if (recipeResult == null) {
    return null;
  }

  const recipe: Recipe = {
    id: recipeResult.id,
    name: recipeResult.name,
    description: recipeResult.description,
    instructions: recipeResult.instructions,
    category: recipeResult.category,
    cuisine: recipeResult.cuisine,
    nutrition: recipeResult.nutrition as NutritionInfo,
    cookTime: recipeResult.cookTime,
    estimatedCost: recipeResult.estimatedCost,
    createdAt: recipeResult.createdAt,
    imageUrl: recipeResult.imageUrl,
    ingredients: [],
  };

  const ingredientResults = await db
    .select()
    .from(schema.recipeIngredients)
    .where(eq(schema.recipeIngredients.recipeId, recipeResult.id));

  await Promise.all(
    ingredientResults.map(async (row) => {
      const [ingredientDetails] = await db
        .select()
        .from(schema.ingredients)
        .where(eq(schema.ingredients.id, recipeResult.id));
      const ingredient = {
        name: row.name,
        quantity: row.quantity,
        unit: row.unit,
        description: ingredientDetails.description,
        nutrition: ingredientDetails.nutrition as NutritionInfo,
        estimatedCost: ingredientDetails.estimatedCost,
        imageUrl: ingredientDetails.imageUrl,
      };

      return ingredient;
    }),
  );

  return recipe;
};

const getAllCategories = async () => {
  return await db
    .selectDistinct({ category: schema.recipes.category })
    .from(schema.recipes);
};

const getAllCuisines = async () => {
  return await db
    .selectDistinct({ cuisines: schema.recipes.cuisine })
    .from(schema.recipes);
};

const getRecipesByCategory = async (category: string) => {
  const result = await db
    .select({ id: schema.recipes.id })
    .from(schema.recipes)
    .where(eq(schema.recipes.category, category));

  return await Promise.all(
    result.map(async (row) => {
      return getRecipeById(row.id);
    }),
  );
};

const getRecipesByCuisine = async (cuisine: string) => {
  const result = await db
    .select({ id: schema.recipes.id })
    .from(schema.recipes)
    .where(eq(schema.recipes.cuisine, cuisine));

  return await Promise.all(
    result.map(async (row) => {
      return getRecipeById(row.id);
    }),
  );
};

export const dbSDK = {
  getRecipeById,
  insertRecipe,
  getIngredientId,
  getAllCategories,
  getAllCuisines,
  getRecipesByCategory,
  getRecipesByCuisine,
};
