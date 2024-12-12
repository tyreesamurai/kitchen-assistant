import db from "@/lib/db";
import { userRecipes } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { createInsertSchema } from "drizzle-zod";

const insertSchema = createInsertSchema(userRecipes);

export async function POST(request: Request) {
  const data = await request.json();

  try {
    insertSchema.parse(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = await db.insert(userRecipes).values(data);

  return NextResponse.json(result, { status: 201 });
}
