import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  doublePrecision,
  timestamp,
  json,
  primaryKey,
} from "drizzle-orm/pg-core";

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  instructions: text("instructions"),
  category: varchar("category", { length: 256 }),
  cuisine: varchar("cuisine", { length: 256 }),
  nutrition: json("nutrition"),
  cookTime: integer("cook_time"),
  estimatedCost: doublePrecision("estimated_cost"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  imageUrl: text("image_url"),
});

export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  nutrition: json("nutrition"),
  estimatedCost: doublePrecision("estimated_cost"),
  imageUrl: text("image_url"),
});

export const recipeIngredients = pgTable(
  "recipe_ingredients",
  {
    recipeId: integer("recipe_id").references(() => recipes.id),
    ingredientId: integer("ingredient_id").references(() => ingredients.id),
    name: varchar("name", { length: 256 }).notNull(),
    quantity: doublePrecision("quantity"),
    unit: varchar("unit", { length: 256 }),
  },
  (t) => ({
    primaryKey: primaryKey({ columns: [t.recipeId, t.ingredientId] }),
  }),
);

export const recipeRelations = relations(recipes, ({ many }) => ({
  ingredients: many(recipeIngredients),
}));

export const ingredientRelations = relations(ingredients, ({ many }) => ({
  recipes: many(recipeIngredients),
}));

export const recipeIngredientsRelations = relations(
  recipeIngredients,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipeIngredients.recipeId],
      references: [recipes.id],
    }),
    ingredient: one(ingredients, {
      fields: [recipeIngredients.ingredientId],
      references: [ingredients.id],
    }),
  }),
);
