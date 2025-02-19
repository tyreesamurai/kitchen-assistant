import RecipePage from "@/components/pages/RecipePage";
import api from "@/lib/api";

export default async function HomePage() {
  const recipes = await api.recipes.getAll();
  return (
    <>
      <RecipePage recipes={recipes} />
    </>
  );
}
