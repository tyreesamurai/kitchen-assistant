import { Recipe } from "@/lib/types";
import Image from "next/image";

export default async function RecipePage(props: { recipe: Recipe }) {
  const { recipe } = props;

  return (
    <div className="flex flex-col items-center p-5">
      <Image
        src={recipe.image_url}
        alt={recipe.name}
        width={300}
        height={300}
        className="rounded-lg"
      />
      <h1 className="text-2xl my-2">{recipe.name}</h1>
      <p className="text-lg my-2 text-center">{recipe.description}</p>
      <div className="w-full max-w-xl mt-5">
        <p>
          <strong>Instructions:</strong> {recipe.instructions}
        </p>
        <p>
          <strong>Servings:</strong> {recipe.servings}
        </p>
        <div className="mt-5">
          <h2 className="text-xl mb-2">Cooking Time</h2>
          {recipe.cooking_time.prep_time && (
            <p>
              <strong>Prep Time:</strong> {recipe.cooking_time.prep_time}
            </p>
          )}
          {recipe.cooking_time.rest_time && (
            <p>
              <strong>Rest Time:</strong> {recipe.cooking_time.prep_time}
            </p>
          )}
          {recipe.cooking_time.cook_time && (
            <p>
              <strong>Cook Time:</strong> {recipe.cooking_time.cook_time}
            </p>
          )}
          {recipe.cooking_time.rest_time && (
            <p>
              <strong>Rest Time:</strong> {recipe.cooking_time.rest_time}
            </p>
          )}
          {recipe.cooking_time.cool_time && (
            <p>
              <strong>Cool Time:</strong> {recipe.cooking_time.cool_time}
            </p>
          )}
          {recipe.cooking_time.total_time && (
            <p>
              <strong>Total Time:</strong> {recipe.cooking_time.total_time}
            </p>
          )}
        </div>
        <div className="mt-5">
          <h2 className="text-xl mb-2">Nutrition</h2>
          <p>
            <strong>Calories:</strong> {recipe.nutrition.calories}
          </p>
          <p>
            <strong>Fat:</strong> {recipe.nutrition.fat}
          </p>
          <p>
            <strong>Carbs:</strong> {recipe.nutrition.carbs}
          </p>
          <p>
            <strong>Protein:</strong> {recipe.nutrition.protein}
          </p>
        </div>
        <p className="mt-5">
          <strong>Source:</strong>{" "}
          <a href={recipe.input_url} className="text-blue-500 underline">
            {recipe.input_url}
          </a>
        </p>
      </div>
    </div>
  );
}
