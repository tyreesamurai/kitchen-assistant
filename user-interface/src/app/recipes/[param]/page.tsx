import api from "@/lib/api";
import RecipeCard from "@/components/RecipeCard";

export default async function RecipePage({
  params,
}: {
  params: { param: string };
}) {
  const recipe = await api.recipes.fetchByParam(params.param);

  return <RecipeCard recipe={recipe} />;
}
