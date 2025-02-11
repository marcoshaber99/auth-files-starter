import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "@/lib/auth-server";
import { db } from "@/db";
import { file } from "@/db/schema";
import { nanoid } from "nanoid";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      // This code runs on your server before upload
      const session = await getServerSession();

      // If you throw, the user will not be able to upload
      if (!session) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file: uploadedFile }) => {
      try {
        // Save file information to database
        const [newFile] = await db
          .insert(file)
          .values({
            id: nanoid(),
            name: uploadedFile.name,
            url: uploadedFile.url,
            key: uploadedFile.key,
            size: uploadedFile.size.toString(),
            type: uploadedFile.type,
            userId: metadata.userId,
          })
          .returning();

        return { fileUrl: uploadedFile.url, fileId: newFile.id };
      } catch (error) {
        console.error("Error saving file:", error);
        throw new Error("Failed to save file information");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
