"use client";

/*
 * Document Component
 *
 * Author: Andre Repanich
 * Date: 10-10-24
 *
 * Component Requirements:
 * [ ]- Display the file. TODO SLIM-16
 * [X]- Remove the file
 * [ ]- Modify document tags
 */

import React from "react";
import { Slug } from "@/lib/definitions/response";
import { Document } from "@prisma/client";
import FileViewer from "./file-viewer";
import { IconX } from "@tabler/icons-react";
import { deleteItem } from "@/lib/actions/delete";
import { ToastProps } from "@/components/ui/toast";
import ViewOptions from "../other/view-options";

interface DocumentComponentProps extends Partial<Document> {
  save: (data: Record<string, any>, id?: string) => void;
  fileBlob: Blob | undefined;
  parentSlug: Slug;
  toastCallback: (message: ToastProps) => void;
}

const DocumentComponent: React.FC<DocumentComponentProps> = (props) => {
  const availableMenuOptions = {
    delete: {
      icon: <IconX className="text-red-500 mr-2 w-4 h-4" />,
      callable: async () => {
        const res = await deleteItem(["document", props?.id]);
        if (res) props.toastCallback(res as ToastProps);
      },
    },
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between w-full space-x-2">
        <h3>{props.label}</h3>
        <ViewOptions
          menuOptions={["delete"]}
          availableMenuOptions={availableMenuOptions}
        />
      </div>
      <FileViewer fileBlob={props.fileBlob} />
    </div>
  );
};

export default DocumentComponent;
