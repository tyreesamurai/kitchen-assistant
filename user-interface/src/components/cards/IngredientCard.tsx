import { Ingredient } from "@/lib/types";

export default async function IngredientCard(props: {
  ingredient: Ingredient;
}) {
  return (
    <div key={props.ingredient.id} className="flex justify-between p-4">
      <p>{props.ingredient.name}</p>
    </div>
  );
}
