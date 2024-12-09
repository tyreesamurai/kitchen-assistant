import db from "@/lib/db";
import { recipes } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { createInsertSchema } from "drizzle-zod";

export async function GET() {
  const result = await db.select().from(recipes);

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result, { status: 200 });
}

const insertSchema = createInsertSchema(recipes);

export async function POST(request: Request) {
  const data = await request.json();

  try {
    insertSchema.parse(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = await db.insert(recipes).values(data).$returningId();

  return NextResponse.json(result, { status: 201 });
}
