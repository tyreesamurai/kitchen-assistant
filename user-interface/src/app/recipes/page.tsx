import RecipeCards from "@/components/RecipeCards";
import api from "@/lib/api";

export default async function RecipesPage() {
  const recipes = await api.recipes.fetchAll();
  return <RecipeCards recipes={recipes} />;
}
