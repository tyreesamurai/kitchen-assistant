"use client";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function GetRecipesButton() {
  const handleClick = () => {
    api.recipes.fetchAll().then((recipe) => {
      console.log(recipe);
    });
  };
  return (
    <>
      <Button onClick={handleClick}>Get Recipes</Button>
    </>
  );
}
