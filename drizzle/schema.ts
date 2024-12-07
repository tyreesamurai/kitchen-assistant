import {
  mysqlTable,
  primaryKey,
  int,
  varchar,
  text,
  json,
  index,
  tinyint,
  decimal,
  check,
  timestamp,
  mysqlEnum,
  unique,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const ingredients = mysqlTable(
  "Ingredients",
  {
    ingredientId: int("IngredientID").autoincrement().notNull(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    nutrition: json(),
    imageUrl: varchar({ length: 2083 }),
  },
  (table) => {
    return {
      ingredientsIngredientId: primaryKey({
        columns: [table.ingredientId],
        name: "Ingredients_IngredientID",
      }),
    };
  },
);

export const ingredientTags = mysqlTable(
  "IngredientTags",
  {
    ingredientId: int("IngredientID")
      .notNull()
      .references(() => ingredients.ingredientId),
    tagId: int("TagID")
      .notNull()
      .references(() => tags.tagId),
  },
  (table) => {
    return {
      tagId: index("TagID").on(table.tagId),
      ingredientTagsIngredientIdTagId: primaryKey({
        columns: [table.ingredientId, table.tagId],
        name: "IngredientTags_IngredientID_TagID",
      }),
    };
  },
);

export const recipeIngredients = mysqlTable(
  "RecipeIngredients",
  {
    recipeId: int("RecipeID")
      .notNull()
      .references(() => recipes.recipeId),
    ingredientId: int("IngredientID")
      .notNull()
      .references(() => ingredients.ingredientId),
    quantity: decimal({ precision: 10, scale: 2 }).notNull(),
    unitId: int("UnitID").references(() => units.unitId),
  },
  (table) => {
    return {
      ingredientId: index("IngredientID").on(table.ingredientId),
      unitId: index("UnitID").on(table.unitId),
      recipeIngredientsRecipeIdIngredientId: primaryKey({
        columns: [table.recipeId, table.ingredientId],
        name: "RecipeIngredients_RecipeID_IngredientID",
      }),
    };
  },
);

export const recipes = mysqlTable(
  "Recipes",
  {
    recipeId: int("RecipeID").autoincrement().notNull(),
    name: varchar({ length: 255 }).notNull(),
    cookTime: int(),
    category: varchar({ length: 100 }),
    cuisine: varchar({ length: 100 }),
    instructions: text(),
    description: text(),
    nutrition: json(),
    isPublic: tinyint().default(1),
    imageUrl: varchar({ length: 2083 }),
  },
  (table) => {
    return {
      recipesRecipeId: primaryKey({
        columns: [table.recipeId],
        name: "Recipes_RecipeID",
      }),
      recipesChk1: check("recipes_chk_1", sql`(\`cookTime\` > 0)`),
    };
  },
);

export const recipeTags = mysqlTable(
  "RecipeTags",
  {
    recipeId: int("RecipeID")
      .notNull()
      .references(() => recipes.recipeId),
    tagId: int("TagID")
      .notNull()
      .references(() => tags.tagId),
  },
  (table) => {
    return {
      tagId: index("TagID").on(table.tagId),
      recipeTagsRecipeIdTagId: primaryKey({
        columns: [table.recipeId, table.tagId],
        name: "RecipeTags_RecipeID_TagID",
      }),
    };
  },
);

export const recipeVersions = mysqlTable(
  "RecipeVersions",
  {
    versionId: int("VersionID").autoincrement().notNull(),
    recipeId: int("RecipeID")
      .notNull()
      .references(() => recipes.recipeId),
    userId: int("UserID")
      .notNull()
      .references(() => users.userId),
    versionDescription: text(),
    dateCreated: timestamp({ mode: "string" }).defaultNow(),
  },
  (table) => {
    return {
      recipeId: index("RecipeID").on(table.recipeId),
      userId: index("UserID").on(table.userId),
      recipeVersionsVersionId: primaryKey({
        columns: [table.versionId],
        name: "RecipeVersions_VersionID",
      }),
    };
  },
);

export const shoppingListIngredients = mysqlTable(
  "ShoppingListIngredients",
  {
    shoppingListId: int("ShoppingListID")
      .notNull()
      .references(() => shoppingLists.shoppingListId),
    ingredientId: int("IngredientID")
      .notNull()
      .references(() => ingredients.ingredientId),
    quantity: decimal({ precision: 10, scale: 2 }).notNull(),
    unitId: int("UnitID")
      .notNull()
      .references(() => units.unitId),
    isChecked: tinyint().default(0),
  },
  (table) => {
    return {
      ingredientId: index("IngredientID").on(table.ingredientId),
      unitId: index("UnitID").on(table.unitId),
      shoppingListIngredientsShoppingListIdIngredientId: primaryKey({
        columns: [table.shoppingListId, table.ingredientId],
        name: "ShoppingListIngredients_ShoppingListID_IngredientID",
      }),
    };
  },
);

export const shoppingLists = mysqlTable(
  "ShoppingLists",
  {
    shoppingListId: int("ShoppingListID").autoincrement().notNull(),
    userId: int("UserID")
      .notNull()
      .references(() => users.userId),
    name: varchar({ length: 255 }).notNull(),
    dateCreated: timestamp({ mode: "string" }).defaultNow(),
  },
  (table) => {
    return {
      userId: index("UserID").on(table.userId),
      shoppingListsShoppingListId: primaryKey({
        columns: [table.shoppingListId],
        name: "ShoppingLists_ShoppingListID",
      }),
    };
  },
);

export const tags = mysqlTable(
  "Tags",
  {
    tagId: int("TagID").autoincrement().notNull(),
    tag: varchar({ length: 255 }).notNull(),
  },
  (table) => {
    return {
      tagsTagId: primaryKey({ columns: [table.tagId], name: "Tags_TagID" }),
    };
  },
);

export const units = mysqlTable(
  "Units",
  {
    unitId: int("UnitID").autoincrement().notNull(),
    name: varchar({ length: 100 }).notNull(),
    type: mysqlEnum(["volume", "weight", "amount", "other"]).notNull(),
  },
  (table) => {
    return {
      unitsUnitId: primaryKey({
        columns: [table.unitId],
        name: "Units_UnitID",
      }),
    };
  },
);

export const userRecipes = mysqlTable(
  "UserRecipes",
  {
    userId: int("UserID")
      .notNull()
      .references(() => users.userId),
    recipeId: int("RecipeID")
      .notNull()
      .references(() => recipes.recipeId),
    dateCreated: timestamp({ mode: "string" }).defaultNow(),
    isFavorite: tinyint().default(0),
    isAttempted: tinyint().default(0),
    personalNote: text(),
  },
  (table) => {
    return {
      recipeId: index("RecipeID").on(table.recipeId),
      userRecipesUserIdRecipeId: primaryKey({
        columns: [table.userId, table.recipeId],
        name: "UserRecipes_UserID_RecipeID",
      }),
    };
  },
);

export const users = mysqlTable(
  "Users",
  {
    userId: int("UserID").autoincrement().notNull(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    authProvider: mysqlEnum(["local", "google", "facebook"]).notNull(),
    role: mysqlEnum(["admin", "editor", "viewer"]).default("viewer"),
    dateJoined: timestamp({ mode: "string" }).defaultNow(),
  },
  (table) => {
    return {
      usersUserId: primaryKey({
        columns: [table.userId],
        name: "Users_UserID",
      }),
      email: unique("email").on(table.email),
    };
  },
);
