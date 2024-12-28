import { IngredientCards } from "@/components/IngredientCard";
import api from "@/lib/api";

export default async function RecipeIngredientsPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <IngredientCards
        ingredients={await api.recipes.fetchIngredientsById(id)}
      />
    </div>
  );
}
