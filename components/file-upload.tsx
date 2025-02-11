"use client";

import { useState, useEffect } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import { FileList } from "./file-list";
import type { ClientUploadedFileData } from "uploadthing/types";

interface FileInfo {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
  createdAt: Date;
}

type FileUploadResponse = ClientUploadedFileData<{
  fileUrl: string;
  fileId: string;
}>;

export function FileUpload() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch("/api/files");
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
        toast.error("Failed to load files");
      } finally {
        setIsLoading(false);
      }
    }

    fetchFiles();
  }, []);

  const handleClientUploadComplete = (res: FileUploadResponse[]) => {
    if (res && res.length > 0) {
      const uploadedFile = res[0];
      const newFile: FileInfo = {
        id: uploadedFile.serverData.fileId,
        name: uploadedFile.name,
        url: uploadedFile.serverData.fileUrl,
        type: uploadedFile.type,
        size: uploadedFile.size.toString(),
        createdAt: new Date(),
      };
      setFiles((prev) => [newFile, ...prev]);
      toast.success("Upload completed", {
        description: `${uploadedFile.name} uploaded successfully`,
      });
    }
  };

  const handleUploadError = (error: Error) => {
    toast.error("Upload failed", {
      description: error.message,
    });
  };

  const handleDelete = async (fileId: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      setFiles((prev) => prev.filter((file) => file.id !== fileId));
      toast.success("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file");
    }
  };

  return (
    <div className="grid w-full gap-6">
      <div>
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={handleClientUploadComplete}
          onUploadError={handleUploadError}
        />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Uploaded Files</h3>
        <FileList files={files} onDelete={handleDelete} isLoading={isLoading} />
      </div>
    </div>
  );
}
