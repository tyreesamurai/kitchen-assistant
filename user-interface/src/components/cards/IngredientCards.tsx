import IngredientCard from "@/components/cards/IngredientCard";
import { Ingredient } from "@/lib/types";

export default async function IngredientCards(props: {
  ingredients: Ingredient[];
}) {
  return (
    <div>
      {props.ingredients.map((ingredient: Ingredient) => {
        return <IngredientCard key={ingredient.id} ingredient={ingredient} />;
      })}
    </div>
  );
}
