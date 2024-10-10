"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../data-table/data-table";
import { Document } from "@prisma/client";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import React, { useRef } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Slug, Status } from "@/lib/definitions/response";
import { createFile } from "@/lib/actions/create";
import { useToast } from "@/hooks/use-toast";
import { ToastProps } from "@/components/ui/toast";
import { generateToast } from "@/lib/utilities/response";
import { AnimatePresence, motion } from "framer-motion";
import ExpandedContent from "../expanded-content/expanded-content";
import DocumentComponent from "./document";
import useUpdateEffect from "@/hooks/use-update-effect";
import ViewOptions from "../other/view-options";
import { deleteItem } from "@/lib/actions/delete";

interface DocumentProps {
  save: (data: Record<string, any>, id?: string) => void;
  parentSlug: Slug;
  readOnly?: boolean;
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
  const [focussedRow, setFocussedRow] = React.useState<
    Partial<Document> | undefined
  >(undefined);
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

  const [fileBlob, setFileBlob] = React.useState<Blob | undefined>(undefined);
  useUpdateEffect(() => {
    const get = async () => {
      console.log("TODO get SLIM-16");
    };
    get();
  }, [focussedRow, toast]);

  const availableMenuOptions = {
    delete: {
      icon: <IconX className="text-red-500 mr-2 w-4 h-4" />,
      callable: async () => {
        const res = await deleteItem(["document", focussedRow?.id]);
        if (res) toast(res as ToastProps);
      },
    },
  };

  return (
    <div className="p-2">
      <div className="w-full flex justify-between items-center space-x-4">
        <h2 className="text-xl font-bold">Documents</h2>
        {!props.readOnly && (
          <>
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
          </>
        )}
      </div>
      <DataTable
        columns={columns}
        rows={props.documents}
        hideManageColumns={true}
        hideFilterColumns={true}
        hideExportOptions={true}
        condensed={true}
        setFocussedRow={setFocussedRow}
        initColumnVisibility={{
          id: false,
          createdAt: false,
          fileType: false,
          starred: false,
        }}
      />
      <AnimatePresence>
        {focussedRow && !props.readOnly && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ExpandedContent
              height={"500px"}
              expanded={focussedRow !== undefined}
              onOutsideClick={() => setFocussedRow(undefined)}
            >
              <motion.div
                className="dark:bg-zinc-900 bg-zinc-100 rounded-md w-full h-[500px] max-w-screen-md max-h-screen-md p-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <div className="flex justify-between w-full space-x-2">
                  <h3>{focussedRow.label}</h3>
                  <ViewOptions
                    menuOptions={["delete"]}
                    availableMenuOptions={availableMenuOptions}
                  />
                </div>
                <DocumentComponent
                  {...focussedRow}
                  fileBlob={fileBlob}
                  save={props.save}
                  parentSlug={props.parentSlug}
                />
              </motion.div>
            </ExpandedContent>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Documents;
