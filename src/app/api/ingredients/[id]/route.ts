import db from "@/lib/db";
import { ingredients } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const [result] = await db
    .select()
    .from(ingredients)
    .where(eq(ingredients.ingredientId, parseInt(params.id)));

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const [result] = await db
    .delete(ingredients)
    .where(eq(ingredients.ingredientId, parseInt(params.id)));

  if (!result) {
    return NextResponse.json(
      { error: "Nothing was found to delete" },
      { status: 404 },
    );
  }

  return NextResponse.json(
    { message: `Ingredient with ID ${params.id} was deleted` },
    { status: 200 },
  );
}
