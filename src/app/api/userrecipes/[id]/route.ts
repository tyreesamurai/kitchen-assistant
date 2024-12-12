import db from "@/lib/db";
import { userRecipes } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const result = db
    .select()
    .from(userRecipes)
    .where(eq(userRecipes.userId, parseInt(params.id)));

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result, { status: 200 });
}
