import {
  Recipe,
  Recipes,
  RecipeCreator,
  Ingredient,
  Ingredients,
  IngredientCreator,
  validateRecipe,
  validateIngredient,
} from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}, Error: ${response.status}`);
    }
    return await response.json();
  },
  post: async (endpoint: string, body: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (!response.ok) {
      throw new Error(
        `Failed to create ${endpoint}, Error: ${response.status}`,
      );
    }
    return await response.json();
  },
  put: async (endpoint: string, body: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (!response.ok) {
      throw new Error(
        `Failed to update ${endpoint}, Error: ${response.status}`,
      );
    }
    return await response.json();
  },
  delete: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to delete ${endpoint}, Error: ${response.status}`,
      );
    }
    return await response.json();
  },

  ingredients: {
    fetchAll: async () => {
      const json = await api.get("/ingredients");
      const ingredients = json.map((ingredient: Ingredient) =>
        validateIngredient(ingredient),
      );
      return ingredients as Ingredients;
    },
    fetchById: async (id: number) => {
      const json = await api.get(`/ingredients/${id}`);
      const ingredient = validateIngredient(json);
      return ingredient as Ingredient;
    },
    fetchRecipesById: async (id: number) => {
      const json = await api.get(`/recipeingredients/ingredient/${id}`);
      const recipes = json.map((recipe: Recipe) => validateRecipe(recipe));
      return recipes as Recipes;
    },
    create: async (ingredient: IngredientCreator) => {
      const json = await api.post("/ingredients", JSON.stringify(ingredient));
      const newIngredient = validateIngredient(json);
      return newIngredient as Ingredient;
    },
    updateById: async (id: number, ingredient: IngredientCreator) => {
      const json = await api.put(
        `/ingredients/${id}`,
        JSON.stringify(ingredient),
      );
      const newIngredient = validateIngredient(json);
      return newIngredient as Ingredient;
    },
    updateByIngredient: async (ingredient: IngredientCreator) => {
      const json = await api.put(
        `/ingredients/${ingredient.name.replaceAll(" ", "%20")}`,
        JSON.stringify(ingredient),
      );
      const newIngredient = validateIngredient(json);
      return newIngredient as Ingredient;
    },
    deleteById: async (id: number) => {
      const json = await api.delete(`/ingredients/${id}`);
      console.log(json);
    },
    deleteByIngredient: async (ingredient: IngredientCreator) => {
      const json = await api.delete(
        `/ingredients/${ingredient.name.replaceAll(" ", "%20")}`,
      );
      console.log(json);
    },
  },

  recipes: {
    fetchAll: async () => {
      const json = await api.get("/recipes");
      const recipes = json.map((recipe: Recipe) => validateRecipe(recipe));
      return recipes as Recipes;
    },
    fetchById: async (id: number) => {
      const json = await api.get(`/recipes/${id}`);
      const recipe = validateRecipe(json);
      return recipe as Recipe;
    },
    fetchIngredientsById: async (id: number) => {
      const json = await api.get(`/recipe-ingredients/recipe/${id}`);
      const ingredients = json.map((ingredient: Ingredient) =>
        validateIngredient(ingredient),
      );
      return ingredients as Ingredients;
    },
    create: async (recipe: RecipeCreator) => {
      const json = await api.post("/recipes", JSON.stringify(recipe));
      const newRecipe = validateRecipe(json);
      return newRecipe as Recipe;
    },
    updateByRecipe: async (recipe: RecipeCreator) => {
      const json = await api.put(
        `/recipes/${recipe.name.replaceAll(" ", "%20")}`,
        JSON.stringify(recipe),
      );
      const newRecipe = validateRecipe(json);
      return newRecipe as Recipe;
    },
    updateById: async (id: number, recipe: RecipeCreator) => {
      const json = await api.put(`/recipes/${id}`, JSON.stringify(recipe));
      const newRecipe = validateRecipe(json);
      return newRecipe as Recipe;
    },
  },
};

export default api;
