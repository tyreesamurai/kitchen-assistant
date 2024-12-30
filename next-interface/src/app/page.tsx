import RecipePage from "@/app/recipes/page";
import IngredientPage from "@/app/ingredients/page";

export default async function Home() {
  return (
    <div className="flex-col w-screen h-screen">
      <div className="flex h-1/2">
        <RecipePage />
      </div>
      <div className="h-1/2">
        <IngredientPage />
      </div>
    </div>
  );
}
