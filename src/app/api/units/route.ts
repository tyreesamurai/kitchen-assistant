import db from "@/lib/db";
import { units } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { createInsertSchema } from "drizzle-zod";

export async function GET() {
  const result = await db.select().from(units);
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(result, { status: 200 });
}

const insertSchema = createInsertSchema(units);

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);
  try {
    insertSchema.parse(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const result = await db.insert(units).values(data).$returningId();
  return NextResponse.json(
    { message: `Unit with ID: ${result} was created` },
    { status: 201 },
  );
}
