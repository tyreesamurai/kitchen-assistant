"use client";
import { Input } from "@/components/ui/input";
import { Recipe } from "@/lib/types";
import { useRecipes } from "@/contexts/RecipeContext";

export default function RecipeNameInput() {
  const { setDisplayedRecipes } = useRecipes();

  return (
    <Input
      placeholder="Recipe Name"
      onChange={(e) => {
        setDisplayedRecipes((prev: Recipe[]) => {
          return prev.filter((recipe) => {
            return recipe.name
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
        });
      }}
    />
  );
}
