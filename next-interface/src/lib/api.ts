import {
  Recipe,
  Recipes,
  Ingredient,
  Ingredients,
  validateRecipe,
  validateIngredient,
} from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    return response.json();
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
      const json = await api.get(`/recipeingredients/recipe/${id}`);
      const ingredients = json.map((ingredient: Ingredient) =>
        validateIngredient(ingredient),
      );
      return ingredients as Ingredients;
    },
  },
};

export default api;
