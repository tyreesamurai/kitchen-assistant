import db from "@/lib/db";
import { tags } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);
  const [result] = await db.select().from(tags).where(eq(tags.tagId, id));

  console.log("We made it here!");
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(result, { status: 200 });
}

const updateSchema = createInsertSchema(tags);

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
    .update(tags)
    .set(data)
    .where(eq(tags.tagId, parseInt(params.id)));

  return NextResponse.json(result, { status: 200 });
}
