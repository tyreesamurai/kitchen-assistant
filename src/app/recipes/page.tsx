import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { recipes } from "@/../drizzle/schema";
import { createSelectSchema } from "drizzle-zod";

const schema = typeof createSelectSchema(recipes);

export default async function Page() {
  const response = await fetch("http://localhost:3000/api/recipes");

  const data = response.json();

  return (
    <>
      {data.map((recipe) => {
        return (
          <Card key={recipe.recipeId}>
            <CardHeader>
              <CardTitle>{recipe.name}</CardTitle>
              <CardDescription>{recipe.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}
