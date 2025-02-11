import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-server";
import { db } from "@/db";
import { file } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const files = await db
      .select()
      .from(file)
      .where(eq(file.userId, session.user.id))
      .orderBy(desc(file.createdAt));

    return NextResponse.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
