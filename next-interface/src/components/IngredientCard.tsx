import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Ingredient } from "@/lib/types";

export function IngredientCard(props: { ingredient: Ingredient }) {
  return (
    <>
      <Card className="flex-col pt-5 text-center justify-center items-center">
        <CardTitle>{props.ingredient.name}</CardTitle>

        <CardHeader>
          <CardDescription>{props.ingredient.description}</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}

export async function IngredientCards(props: { ingredients: Ingredient[] }) {
  return (
    <>
      {props.ingredients.map((ingredient) => (
        <IngredientCard ingredient={ingredient} key={ingredient.id} />
      ))}
    </>
  );
}
