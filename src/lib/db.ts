import { drizzle } from "drizzle-orm/mysql2";
import {
  ingredients,
  ingredientTags,
  tags,
  recipes,
  recipeIngredients,
  units,
  recipeTags,
  recipeVersions,
  users,
  shoppingLists,
  shoppingListIngredients,
  userRecipes,
} from "../../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);
