import db from "@/lib/db";
import { users } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const [result] = await db
    .select()
    .from(users)
    .where(eq(users.userId, params.id));

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result, { status: 200 });
}

// TODO: Maybe instead of querying by ID, we instead should query based on name (first & last)
