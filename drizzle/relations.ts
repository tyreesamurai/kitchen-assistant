import { relations } from "drizzle-orm/relations";
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
} from "./schema";

export const ingredientTagsRelations = relations(ingredientTags, ({ one }) => ({
  ingredient: one(ingredients, {
    fields: [ingredientTags.ingredientId],
    references: [ingredients.ingredientId],
  }),
  tag: one(tags, {
    fields: [ingredientTags.tagId],
    references: [tags.tagId],
  }),
}));

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  ingredientTags: many(ingredientTags),
  recipeIngredients: many(recipeIngredients),
  shoppingListIngredients: many(shoppingListIngredients),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  ingredientTags: many(ingredientTags),
  recipeTags: many(recipeTags),
}));

export const recipeIngredientsRelations = relations(
  recipeIngredients,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipeIngredients.recipeId],
      references: [recipes.recipeId],
    }),
    ingredient: one(ingredients, {
      fields: [recipeIngredients.ingredientId],
      references: [ingredients.ingredientId],
    }),
    unit: one(units, {
      fields: [recipeIngredients.unitId],
      references: [units.unitId],
    }),
  }),
);

export const recipesRelations = relations(recipes, ({ many }) => ({
  recipeIngredients: many(recipeIngredients),
  recipeTags: many(recipeTags),
  recipeVersions: many(recipeVersions),
  userRecipes: many(userRecipes),
}));

export const unitsRelations = relations(units, ({ many }) => ({
  recipeIngredients: many(recipeIngredients),
  shoppingListIngredients: many(shoppingListIngredients),
}));

export const recipeTagsRelations = relations(recipeTags, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeTags.recipeId],
    references: [recipes.recipeId],
  }),
  tag: one(tags, {
    fields: [recipeTags.tagId],
    references: [tags.tagId],
  }),
}));

export const recipeVersionsRelations = relations(recipeVersions, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeVersions.recipeId],
    references: [recipes.recipeId],
  }),
  user: one(users, {
    fields: [recipeVersions.userId],
    references: [users.userId],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  recipeVersions: many(recipeVersions),
  shoppingLists: many(shoppingLists),
  userRecipes: many(userRecipes),
}));

export const shoppingListIngredientsRelations = relations(
  shoppingListIngredients,
  ({ one }) => ({
    shoppingList: one(shoppingLists, {
      fields: [shoppingListIngredients.shoppingListId],
      references: [shoppingLists.shoppingListId],
    }),
    ingredient: one(ingredients, {
      fields: [shoppingListIngredients.ingredientId],
      references: [ingredients.ingredientId],
    }),
    unit: one(units, {
      fields: [shoppingListIngredients.unitId],
      references: [units.unitId],
    }),
  }),
);

export const shoppingListsRelations = relations(
  shoppingLists,
  ({ one, many }) => ({
    shoppingListIngredients: many(shoppingListIngredients),
    user: one(users, {
      fields: [shoppingLists.userId],
      references: [users.userId],
    }),
  }),
);

export const userRecipesRelations = relations(userRecipes, ({ one }) => ({
  user: one(users, {
    fields: [userRecipes.userId],
    references: [users.userId],
  }),
  recipe: one(recipes, {
    fields: [userRecipes.recipeId],
    references: [recipes.recipeId],
  }),
}));

