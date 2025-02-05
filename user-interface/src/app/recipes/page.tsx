import api from "@/lib/api";
import RecipeCards from "@/components/cards/RecipeCards";
export default async function Page() {
  const recipes = await api.recipes.fetchAll();

  return <RecipeCards recipes={recipes} />;
}
