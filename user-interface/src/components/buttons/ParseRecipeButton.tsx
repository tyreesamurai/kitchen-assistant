"use client";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function GetRecipesButton() {
  const handleClick = () => {
    api.parser
      .getRecipe(
        "https://www.allrecipes.com/recipe/285573/spicy-air-fryer-pork-chops-with-apricot-glaze/",
      )
      .then((recipe) => {
        console.log(recipe);
      });
  };
  return (
    <>
      <Button onClick={handleClick}>Get Recipes</Button>
    </>
  );
}
