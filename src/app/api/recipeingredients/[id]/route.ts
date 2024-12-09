import db from "@/lib/db";
import { ingredients, recipeIngredients } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const result = await db
    .select()
    .from(recipeIngredients)
    .where(eq(recipeIngredients.recipeId, parseInt(params.id)))
    .innerJoin(
      ingredients,
      eq(recipeIngredients.ingredientId, ingredients.ingredientId),
    );
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(result, { status: 200 });
}

const ingredientInsertSchema = createInsertSchema(ingredients);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const data = await request.json();
  const recipeId = parseInt((await params).id);
  let ingredientId = -1;

  if ("ingredient" in data) {
    const ingredient = data.ingredient;

    console.log(ingredient);
    try {
      ingredientInsertSchema.parse(ingredient);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Unable to insert Ingredient!" },
        { status: 500 },
      );
    }

    const response = await fetch("localhost:3000/api/ingredients", {
      method: "POST",
      body: ingredient,
    });

    const ingredientData = await response.json();

    if ("id" in ingredientData) {
      ingredientId = ingredientData.id;
    }
  }

  const result = await db.insert(recipeIngredients).values({
    recipeId,
    ingredientId,
    quantity: data.quantity,
  });

  return NextResponse.json(result, { status: 200 });
}
