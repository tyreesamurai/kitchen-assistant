import { IngredientCard } from "@/components/IngredientCard";
import api from "@/lib/api";

export default async function IngredientsPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <IngredientCard ingredient={await api.ingredients.fetchById(id)} />
    </div>
  );
}
