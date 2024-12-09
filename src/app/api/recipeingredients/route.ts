import db from "@/lib/db";
import { recipeIngredients } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { createInsertSchema } from "drizzle-zod";

export async function GET() {
  const result = await db.select().from(recipeIngredients);

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result, { status: 200 });
}

const insertSchema = createInsertSchema(recipeIngredients);

export async function POST(request: Request) {
  const data = await request.json();
  if (!data) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  try {
    insertSchema.parse(data);
    console.log(insertSchema);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const result = await db.insert(recipeIngredients).values(data);
  return NextResponse.json(result, { status: 201 });
}
