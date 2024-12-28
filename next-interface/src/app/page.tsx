import RecipePage from "@/app/recipes/page";
import IngredientPage from "@/app/ingredients/page";

export default async function Home() {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <RecipePage />
      <IngredientPage />
    </div>
  );
}
