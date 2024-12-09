import db from "@/lib/db";
import { recipes } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const [result] = await db
    .select()
    .from(recipes)
    .where(eq(recipes.recipeId, parseInt(params.id)));

  if (!result) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(result, { status: 200 });
}

const updateSchema = createInsertSchema(recipes);

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const data = await request.json();

  try {
    updateSchema.parse(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = await db
    .update(recipes)
    .set(data)
    .where(eq(recipes.recipeId, parseInt(params.id)));

  return NextResponse.json(result, { status: 200 });
}
