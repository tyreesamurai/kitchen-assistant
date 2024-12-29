import { RecipeCards } from "@/components/RecipeCard";
import api from "@/lib/api";

export default async function RecipesPage() {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <RecipeCards recipes={await api.recipes.fetchAll()} />
    </div>
  );
}
