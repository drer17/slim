"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../data-table/data-table";
import { Document } from "@prisma/client";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import React, { useRef } from "react";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Slug, Status } from "@/lib/definitions/response";
import { createFile } from "@/lib/actions/create";
import { useToast } from "@/hooks/use-toast";
import { ToastProps } from "@/components/ui/toast";
import { generateToast } from "@/lib/utilities/response";

interface DocumentProps {
  save: (data: Record<string, any>, id?: string) => void;
  parentSlug: Slug;
  readonly?: boolean;
  documents: Partial<Document>[];
}

const columns: ColumnDef<Partial<Document>>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
  },
  {
    accessorKey: "fileType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "starred",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Favourite" />
    ),
  },
];

const Documents: React.FC<DocumentProps> = (props) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () =>
    fileInputRef.current && fileInputRef.current.click();

  const saveNewFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return toast(generateToast(Status.failed) as ToastProps);
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);

    const res = await createFile(formData, props.parentSlug);
    toast(res as ToastProps);
  };

  return (
    <div className="p-2">
      <div className="w-full flex justify-between items-center space-x-4">
        <h2 className="text-xl font-bold">Documents</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleClick}
        >
          <IconPlus className="w-5 h-5 text-zinc-500" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={saveNewFile}
        />
      </div>
      <DataTable
        columns={columns}
        rows={props.documents}
        hideManageColumns={true}
        hideFilterColumns={true}
        hideExportOptions={true}
        condensed={true}
        initColumnVisibility={{
          id: false,
          createdAt: false,
          fileType: false,
          starred: false,
        }}
      />
    </div>
  );
};

export default Documents;
