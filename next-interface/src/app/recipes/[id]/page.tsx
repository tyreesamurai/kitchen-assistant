import { RecipeCard } from "@/components/RecipeCard";
import api from "@/lib/api";

export default async function RecipesPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <RecipeCard recipe={await api.recipes.fetchById(id)} />
    </div>
  );
}
