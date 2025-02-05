import RecipeCard from "@/components/cards/RecipeCard";
import { Recipe } from "@/lib/types";

export default function RecipeCards(props: { recipes: Recipe[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {props.recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
