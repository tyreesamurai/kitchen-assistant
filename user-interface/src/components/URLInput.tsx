"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import RecipeCard from "@/components/RecipeCard";

export default function URLInput() {
  const [inputValue, setInputValue] = useState("");
  const [recipe, setRecipe] = useState(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    api.parser.getRecipe(inputValue).then((recipe) => {
      setRecipe(recipe[0]);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter URL"
          className="w-96"
          type="url"
          required
        />
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
      {recipe && <RecipeCard recipe={recipe} />}
    </div>
  );
}
