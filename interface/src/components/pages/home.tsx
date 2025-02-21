import RecipePage from "@/components/pages/recipe";
import api from "@/lib/api";

export default async function HomePage() {
  const recipes = await api.recipes.fetchAll();
  return (
    <>
      <RecipePage recipes={recipes} />
    </>
  );
}
