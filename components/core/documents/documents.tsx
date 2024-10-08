import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../data-table/data-table";
import { Document } from "@prisma/client";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";

interface DocumentProps {
  save: (data: Record<string, any>, id?: string) => void;
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
  return (
    <div className="p-2">
      <h2 className="text-xl font-bold">Documents</h2>
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
