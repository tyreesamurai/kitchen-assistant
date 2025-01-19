import { Recipe, Ingredient } from "@/lib/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const PARSER_URL = process.env.NEXT_PUBLIC_PARSER_URL;

const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${SERVER_URL}${endpoint}`);
    return response.json();
  },
  post: async (endpoint: string, data: unknown) => {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  recipes: {
    fetchAll: async () => {
      return (await api.get("/recipes")) as Recipe[];
    },
    fetchByParam: async (param: string) => {
      return (await api.get(`/recipes/${param}`)) as Recipe;
    },
    create: async (data: Recipe) => {
      return api.post("/recipes", data);
    },
    getIngredients: async (param: string) => {
      return (await api.get(`/recipes/${param}/ingredients`)) as Ingredient[];
    },
  },
  parser: {
    getRecipe: async (data: string) => {
      console.log(PARSER_URL);
      const response = await fetch(`${PARSER_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: data }),
      });
      return await response.json();
    },
  },
};

export default api;
