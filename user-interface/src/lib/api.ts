import { Recipe, Ingredient } from "@/lib/types";

const SERVER_URL = process.env.SERVER_URL;
const PARSER_URL = process.env.PARSER_URL;

const api = {
  recipes: {
    getAll: async () => {
      const response = await fetch(`${SERVER_URL}/recipes`);
      return (await response.json()) as Recipe[];
    },
    getByParam: async (param: string) => {
      const response = await fetch(`${SERVER_URL}/recipes/${param}`);
      return (await response.json()) as Recipe;
    },
    post: async (recipe: Recipe, ingredients: Ingredient[]) => {
      const response = await fetch(`${SERVER_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe, ingredients }),
      });
      return response.json();
    },
  },
  ingredients: {
    getAll: async () => {
      const response = await fetch(`${SERVER_URL}/ingredients`);
      return (await response.json()) as Ingredient[];
    },
    getByParam: async (param: string) => {
      const response = await fetch(`${SERVER_URL}/ingredients/${param}`);
      return (await response.json()) as Ingredient;
    },
    post: async (ingredient: Ingredient) => {
      const response = await fetch(`${SERVER_URL}/ingredients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredient }),
      });
      return response.json();
    },
  },
  parseUrl: async (url: string) => {
    const response = await fetch(`${PARSER_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    return (await response.json()) as {
      recipe: Recipe;
      ingredients: Ingredient[];
    };
  },
};

export default api;
