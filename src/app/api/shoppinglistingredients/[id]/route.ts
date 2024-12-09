import db from "@/lib/db";
import { ingredients, shoppingListIngredients } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const result = await db
    .select()
    .from(shoppingListIngredients)
    .where(eq(shoppingListIngredients.shoppingListId, parseInt(params.id)))
    .innerJoin(
      ingredients,
      eq(shoppingListIngredients.ingredientId, ingredients.ingredientId),
    );
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(result, { status: 200 });
}
