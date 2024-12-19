import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { recipes } from "@/../drizzle/schema";
import { createSelectSchema } from "drizzle-zod";
import Image from "next/image";

const recipeSchema = createSelectSchema(recipes);

async function fetchRecipes() {
  const response = await fetch("http://localhost:3000/api/recipes");
  const recipes = await response.json();

  return recipeSchema.array().parse(recipes);
}

export default async function Recipes() {
  const recipes = await fetchRecipes();
  return (
    <>
      <div className="flex justify-around items-center">
        {recipes.map((recipe) => {
          const imageUrl =
            recipe.imageUrl ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
          return (
            <Card key={recipe.recipeId} className="flex text-center mt-2 pt-5">
              <CardContent className="flex justify-center">
                <Image src={imageUrl} width={100} height={70} alt="" />
              </CardContent>

              <CardHeader>
                <CardTitle>{recipe.name}</CardTitle>
              </CardHeader>
              <CardDescription>{recipe.description}</CardDescription>
            </Card>
          );
        })}
      </div>
    </>
  );
}
