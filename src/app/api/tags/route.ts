import db from "@/lib/db";
import { tags } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { createInsertSchema } from "drizzle-zod";

export async function GET() {
  const result = await db.select().from(tags);
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(result, { status: 200 });
}

const insertSchema = createInsertSchema(tags);

export async function POST(request: Request) {
  const data = await request.json();

  console.log(data);
  try {
    insertSchema.parse(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = await db.insert(tags).values(data).$returningId();

  return NextResponse.json(
    { message: `Tag with ID ${result} was created!` },
    { status: 201 },
  );
}
