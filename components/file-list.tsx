"use client";

import { File } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

interface FileInfo {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
  createdAt: Date;
}

interface FileListProps {
  files: FileInfo[];
  onDelete?: (fileId: string) => Promise<void>;
  isLoading?: boolean;
}

export function FileList({ files, onDelete, isLoading }: FileListProps) {
  const handleDelete = async (fileId: string) => {
    try {
      await onDelete?.(fileId);
    } catch (error) {
      console.error("Failed to delete file:", error);
      toast.error("Failed to delete file");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[76px] w-full rounded-lg" />
        <Skeleton className="h-[76px] w-full rounded-lg" />
        <Skeleton className="h-[76px] w-full rounded-lg" />
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-4">
        No files uploaded yet
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 border rounded-md">
              <File className="h-4 w-4" />
            </div>
            <div>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                {file.name}
              </a>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(file.createdAt), {
                  addSuffix: true,
                })}
                {" · "}
                {(parseInt(file.size) / 1024).toFixed(2)} KB
              </div>
            </div>
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(file.id)}
            >
              Delete
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
