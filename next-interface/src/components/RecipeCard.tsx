import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Recipe, Recipes } from "@/lib/types";
import RecipeButton from "@/components/RecipeButton";

export async function RecipeCard(props: { recipe: Recipe }) {
  return (
    <>
      <Card className="flex-col pt-5 text-center justify-center items-center">
        <CardTitle>{props.recipe.name}</CardTitle>

        <CardHeader>
          <CardDescription>{props.recipe.description}</CardDescription>
        </CardHeader>

        <CardContent>{props.recipe.instructions}</CardContent>

        <RecipeButton recipeId={props.recipe.id} />
      </Card>
    </>
  );
}

export async function RecipeCards(props: { recipes: Recipes }) {
  return (
    <>
      {props.recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </>
  );
}
