import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Recipe } from "@/lib/types";
import SeeIngredientsButton from "@/components/buttons/SeeIngredientsButton";

export default function RecipeCard(props: { recipe: Recipe }) {
  const instructions = props.recipe.instructions.split("\n");
  return (
    <Card className="max-w-md mx-auto my-4 shadow-lg rounded-lg overflow-hidden">
      <CardContent className="p-4">
        <div className="relative h-48 w-full bg-gray-200">
          {/* <Image */}
          {/*   src={props.recipe.image_url} */}
          {/*   alt={props.recipe.name} */}
          {/*   layout="fill" */}
          {/*   objectFit="cover" */}
          {/* /> */}
        </div>
        <div className="p-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {props.recipe.name}
          </CardTitle>
          <CardDescription className="mt-2 text-gray-600">
            {props.recipe.description}
          </CardDescription>
          <CardDescription className="mt-4 text-gray-600">
            <strong>Instructions:</strong>
            <ul className="list-none mt-2">
              {instructions.map((step, index) => (
                <li key={index} className="mt-1">
                  {`Step ${index + 1}: ${step}`}
                </li>
              ))}
            </ul>
          </CardDescription>
          <CardDescription className="mt-4 text-gray-600">
            <strong>Nutrition:</strong>
            <ul className="list-none mt-2">
              <li>Calories: {props.recipe.nutrition.calories} kcal</li>
              <li>Fat: {props.recipe.nutrition.fat} g</li>
              <li>Carbs: {props.recipe.nutrition.carbs} g</li>
              <li>Protein: {props.recipe.nutrition.protein} g</li>
            </ul>{" "}
          </CardDescription>
          <CardDescription className="mt-4 text-gray-600">
            <strong>Servings:</strong> {props.recipe.servings}
          </CardDescription>
          <div className="text-center">
            <SeeIngredientsButton
              param={String(props.recipe.name).replaceAll(" ", "-")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
