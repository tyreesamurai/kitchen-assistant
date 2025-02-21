"use client";
import { createContext, useContext, useState } from "react";
import { Recipe } from "@/lib/types";

type RecipeContextType = {
  selectedRecipes: Recipe[];
  displayedRecipes: Recipe[];
  toggleRecipe: (recipe: Recipe) => void;
  setDisplayedRecipes: (recipes: Recipe[]) => void;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({
  children,
  initialRecipes,
}: {
  children: React.ReactNode;
  initialRecipes: Recipe[];
}) {
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [displayedRecipes, setDisplayedRecipes] =
    useState<Recipe[]>(initialRecipes);

  const toggleRecipe = (recipe: Recipe) => {
    setSelectedRecipes((prev: Recipe[]) =>
      prev.some((r) => r.id === recipe.id)
        ? prev.filter((r) => r.id !== recipe.id)
        : [...prev, recipe],
    );
  };

  return (
    <RecipeContext.Provider
      value={{
        selectedRecipes,
        displayedRecipes,
        toggleRecipe,
        setDisplayedRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }
  return context;
};
