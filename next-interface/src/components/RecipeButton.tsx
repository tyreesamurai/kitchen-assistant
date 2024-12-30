import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RecipeButton(props: { recipeId: number }) {
  return (
    <Button>
      <Link href={`/recipes/ingredients/${props.recipeId}`}>
        See Ingredients
      </Link>
    </Button>
  );
}
