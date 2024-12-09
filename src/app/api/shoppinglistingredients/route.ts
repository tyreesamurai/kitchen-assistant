import db from "@/lib/db";
import { NextResponse } from "next/server";
import { shoppingListIngredients } from "@/../drizzle/schema";
import { createInsertSchema } from "drizzle-zod";

export async function GET() {
  const result = await db.select().from(shoppingListIngredients);
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(result, { status: 200 });
}

const insertSchema = createInsertSchema(shoppingListIngredients);

export async function POST(request: Request) {
  const data = await request.json();
  if (!data) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  try {
    insertSchema.parse(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = await db.insert(shoppingListIngredients).values(data);
  return NextResponse.json(result, { status: 201 });
}
