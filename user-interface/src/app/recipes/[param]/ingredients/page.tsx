import api from "@/lib/api";
import { Ingredient } from "@/lib/types";
import IngredientCards from "@/components/IngredientCards";

export default async function RecipeIngredientsPage({
  params,
}: {
  params: { param: string };
}) {
  const ingredients = await api.recipes.getIngredients((await params).param);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-8">Ingredients</h1>
      <IngredientCards ingredients={ingredients} />
    </div>
  );
}
