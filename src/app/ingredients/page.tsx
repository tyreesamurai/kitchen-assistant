import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ingredients } from "@/../drizzle/schema";
import { createSelectSchema } from "drizzle-zod";

const ingredientSchema = createSelectSchema(ingredients);

async function fetchIngredients() {
  const response = await fetch("http://localhost:3000/api/ingredients");
  const ingredients = await response.json();

  return ingredientSchema.array().parse(ingredients);
}

export default async function Ingredients() {
  const ingredients = await fetchIngredients();
  return (
    <>
      <div className="flex justify-around items-center w-screen flex-wrap">
        {ingredients.map((ingredient) => {
          const imageUrl =
            ingredient.imageUrl ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
          return (
            <Card
              key={ingredient.ingredientId}
              className="flex-col text-center mt-2 pt-5"
            >
              <CardContent className="flex justify-center">
                <Image src={imageUrl} width={100} height={70} alt="" />
              </CardContent>
              <CardHeader>
                <CardTitle>{ingredient.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{ingredient.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
