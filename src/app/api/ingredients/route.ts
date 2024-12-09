import db from "@/lib/db";
import { ingredients } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { createInsertSchema } from "drizzle-zod";

export async function GET() {
  const result = await db.select().from(ingredients);
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(result, { status: 200 });
}

const insertSchema = createInsertSchema(ingredients);

export async function POST(request: Request) {
  const data = await request.json();
  try {
    insertSchema.parse(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const result = await db.insert(ingredients).values(data);
  return NextResponse.json(result, { status: 201 });
}
