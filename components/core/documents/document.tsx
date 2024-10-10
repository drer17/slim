"use client";

import React from "react";
import { Slug } from "@/lib/definitions/response";
import { Document } from "@prisma/client";
import FileViewer from "./file-viewer";

interface DocumentComponentProps extends Partial<Document> {
  save: (data: Record<string, any>, id?: string) => void;
  fileBlob: Blob | undefined;
  parentSlug: Slug;
}
const DocumentComponent: React.FC<DocumentComponentProps> = (props) => {
  return (
    <div className="w-full h-full">
      <FileViewer fileBlob={props.fileBlob} />
    </div>
  );
};

export default DocumentComponent;
