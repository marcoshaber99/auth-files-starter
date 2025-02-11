import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-server";
import { db } from "@/db";
import { file } from "@/db/schema";
import { eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;
    const session = await getServerSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the file from the database
    const [fileToDelete] = await db
      .select()
      .from(file)
      .where(eq(file.id, fileId))
      .limit(1);

    if (!fileToDelete) {
      return new NextResponse("File not found", { status: 404 });
    }

    // Check if the user owns the file
    if (fileToDelete.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Delete the file from UploadThing
    await utapi.deleteFiles([fileToDelete.key]);

    // Delete the file from the database
    await db.delete(file).where(eq(file.id, fileId));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
