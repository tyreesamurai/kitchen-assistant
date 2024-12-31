import {
  Recipe,
  Recipes,
  RecipeCreator,
  Ingredient,
  Ingredients,
  IngredientCreator,
  Tag,
  Tags,
  TagCreator,
  validateRecipe,
  validateIngredient,
  validateTag,
} from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}, Error: ${response.status}`);
    }
    return await response.json();
  },
  post: async (endpoint: string, body: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}/`, {
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
    const response = await fetch(`${BASE_URL}${endpoint}/`, {
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
    const response = await fetch(`${BASE_URL}${endpoint}/`, {
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
    fetchByName: async (name: string) => {
      const json = await api.get(`/ingredients/${name.replaceAll(" ", "-")}`);
      const ingredient = validateIngredient(json);
      return ingredient as Ingredient;
    },
    fetchRecipesById: async (id: number) => {
      const json = await api.get(`/ingredients/${id}/recipes`);
      const recipes = json.map((recipe: Recipe) => validateRecipe(recipe));
      return recipes as Recipes;
    },
    fetchRecipesByName: async (name: string) => {
      const json = await api.get(
        `/ingredients/${name.replaceAll(" ", "-")}/recipes`,
      );
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
        `/ingredients/${ingredient.name.replaceAll(" ", "-")}`,
        JSON.stringify(ingredient),
      );
      const newIngredient = validateIngredient(json);
      return newIngredient as Ingredient;
    },
    deleteById: async (id: number) => {
      const json = await api.delete(`/ingredients/${id}`);
      console.log(json);
    },
    deleteByName: async (name: string) => {
      const json = await api.delete(
        `/ingredients/${name.replaceAll(" ", "-")}`,
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
    fetchByName: async (name: string) => {
      const json = await api.get(`/recipes/${name.replaceAll(" ", "-")}`);
      const recipe = validateRecipe(json);
      return recipe as Recipe;
    },
    fetchIngredientsById: async (id: number) => {
      const json = await api.get(`/recipes/${id}/ingredients`);
      const ingredients = json.map((ingredient: Ingredient) =>
        validateIngredient(ingredient),
      );
      return ingredients as Ingredients;
    },
    fetchIngredientsByName: async (name: string) => {
      const json = await api.get(
        `/recipes/${name.replaceAll(" ", "-")}/ingredients`,
      );
      const ingredients = json.map((ingredient: Ingredient) =>
        validateIngredient(ingredient),
      );
      return ingredients as Ingredients;
    },
    fetchTagsById: async (id: number) => {
      const json = await api.get(`/recipes/${id}/tags`);
      const tags = json.map((tag: Tag) => validateTag(tag));
      return tags as Tags;
    },
    fetchTagsByName: async (name: string) => {
      const json = await api.get(`/recipes/${name.replaceAll(" ", "-")}/tags`);
      const tags = json.map((tag: Tag) => validateTag(tag));
      return tags as Tags;
    },
    create: async (recipe: RecipeCreator) => {
      const json = await api.post("/recipes", JSON.stringify(recipe));
      const newRecipe = validateRecipe(json);
      return newRecipe as Recipe;
    },
    updateByRecipe: async (recipe: RecipeCreator) => {
      const json = await api.put(
        `/recipes/${recipe.name.replaceAll(" ", "-")}`,
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
    deleteById: async (id: number) => {
      const json = await api.delete(`/recipes/${id}`);
      console.log(json);
    },
    deleteByName: async (name: string) => {
      const json = await api.delete(`/recipes/${name.replaceAll(" ", "-")}`);
      console.log(json);
    },
  },

  tags: {
    fetchAll: async () => {
      const json = await api.get("/tags");
      const tags = json.map((tag: Tag) => validateTag(tag));
      return tags as Tags;
    },
    fetchById: async (id: number) => {
      const json = await api.get(`/tags/${id}`);
      const tag = validateTag(json);
      return tag as Tag;
    },
    fetchByName: async (name: string) => {
      const json = await api.get(`/tags/${name.replaceAll(" ", "-")}`);
      const tag = validateTag(json);
      return tag as Tag;
    },
    fetchRecipesById: async (id: number) => {
      const json = await api.get(`/tags/${id}/recipes`);
      const recipes = json.map((recipe: Recipe) => validateRecipe(recipe));
      return recipes as Recipes;
    },
    fetchRecipesByName: async (name: string) => {
      const json = await api.get(`/tags/${name.replaceAll(" ", "-")}/recipes`);
      const recipes = json.map((recipe: Recipe) => validateRecipe(recipe));
      return recipes as Recipes;
    },
    fetchIngredientsById: async (id: number) => {
      const json = await api.get(`/tags/${id}/ingredients`);
      const ingredients = json.map((ingredient: Ingredient) =>
        validateIngredient(ingredient),
      );
      return ingredients as Ingredients;
    },
    fetchIngredientsByName: async (name: string) => {
      const json = await api.get(
        `/tags/${name.replaceAll(" ", "-")}/ingredients`,
      );
      const ingredients = json.map((ingredient: Ingredient) =>
        validateIngredient(ingredient),
      );
      return ingredients as Ingredients;
    },
    create: async (tag: TagCreator) => {
      const json = await api.post("/tags", JSON.stringify(tag));
      const newTag = validateTag(json);
      return newTag as Tag;
    },
    updateById: async (id: number, tag: TagCreator) => {
      const json = await api.put(`/tags/${id}`, JSON.stringify(tag));
      const newTag = validateTag(json);
      return newTag as Tag;
    },
    updateByTag: async (tag: TagCreator) => {
      const json = await api.put(
        `/tags/${tag.name.replaceAll(" ", "-")}`,
        JSON.stringify(tag),
      );
      const newTag = validateTag(json);
      return newTag as Tag;
    },
    deleteById: async (id: number) => {
      const json = await api.delete(`/tags/${id}`);
      console.log(json);
    },
    deleteByName: async (name: string) => {
      const json = await api.delete(`/tags/${name.replaceAll(" ", "-")}`);
      console.log(json);
    },
  },
};

export default api;
