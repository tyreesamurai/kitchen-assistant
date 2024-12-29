import { IngredientCards } from "@/components/IngredientCard";
import api from "@/lib/api";

export default async function IngredientsPage() {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <IngredientCards ingredients={await api.ingredients.fetchAll()} />
    </div>
  );
}
