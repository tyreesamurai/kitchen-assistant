import RecipeCards from "@/components/RecipeCards";
import api from "@/lib/api";

export default async function Page() {
  const recipes = await api.recipes.fetchAll();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-8">Recipes</h1>
      <RecipeCards recipes={recipes} />
    </div>
  );
}
