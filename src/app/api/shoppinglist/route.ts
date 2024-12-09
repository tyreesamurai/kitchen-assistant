import db from "@/lib/db";
import { shoppingLists } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { createInsertSchema } from "drizzle-zod";

export async function GET() {
  const result = await db.select().from(shoppingLists);

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result, { status: 200 });
}

const insertSchema = createInsertSchema(shoppingLists);

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

  const result = await db.insert(shoppingLists).values(data);
  return NextResponse.json(result, { status: 201 });
}
