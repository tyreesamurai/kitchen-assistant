import { Recipe } from "@/lib/types";

export default async function RecipePage(props: { recipes: Recipe[] }) {
  const { recipes } = props;

  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
}
