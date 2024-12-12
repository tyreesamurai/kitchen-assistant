import { users } from "@/../drizzle/schema";
import db from "@/lib/db";
import { createInsertSchema } from "drizzle-zod";
import { NextResponse } from "next/server";

export async function GET() {
  // const request = req.json();
  // TODO: MAKE ALL THIS STUFF HERE WORK
  // if ("firstName" in request && "lastName" in request) {
  //   and(
  //     eq(users.firstName, request.firstName),
  //     eq(users.lastName, request.lastName),
  //   );
  // }

  const result = await db
    .select({
      userId: users.userId,
      firstName: users.firstName,
      lastName: users.lastName,
    })
    .from(users);

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result, { status: 200 });
}

const insertSchema = createInsertSchema(users);

export async function POST(request: Request) {
  const data = await request.json();

  if (!("authProvider" in data)) {
    data.authProvider = "local";
  }

  try {
    insertSchema.parse(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = await db.insert(users).values(data);
  return NextResponse.json(result, { status: 201 });
}
