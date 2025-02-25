"use client";

import { Obligation, ObligationRule } from "@prisma/client";
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { Button } from "../ui/button";
import Link from "next/link";
import ObligationRuleForm from "../forms/obligation-rule";
import { Entity } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import React from "react";
import { get } from "@/lib/actions/get";
import { update } from "@/lib/actions/update";
import HiddenInput from "../core/other/hidden-input";
import { useDebouncedCallback } from "use-debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IconArchive, IconDots, IconTrash } from "@tabler/icons-react";
import { deleteItem } from "@/lib/actions/delete";
import { useObligationContext } from "../contexts/obligations";

const EntitySelection: React.FC<{
  entityId: string | null;
  obligationId: string;
}> = ({ entityId, obligationId }) => {
  const { entities } = useObligationContext();
  const [selectedEnt, setSelectedEntity] = React.useState<string | null>(
    entityId,
  );
  const [selectedName, setSelectedName] = React.useState<string | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const getEntity = async () => {
      if (!selectedEnt) return;
      const entity = (await get(["entity", selectedEnt])) as Entity[];
      setSelectedName(entity[0].name);
    };
    getEntity();
  }, [selectedEnt]);

  const updateData = async (entityId: string) => {
    await update(["obligation", undefined, obligationId], {
      entityId: entityId,
    });
    setSelectedEntity(entityId);
  };

  return (
    <Select
      value={entityId || undefined}
      onValueChange={(id) => updateData(id)}
    >
      <SelectTrigger>{selectedName || "Select Entity"}</SelectTrigger>
      <SelectContent>
        {entities &&
          entities.map((ent) => (
            <SelectItem key={ent.id} value={ent.id}>
              {ent.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

const Description: React.FC<{
  initDescription: string | null;
  obligationId: string;
}> = ({ initDescription, obligationId }) => {
  const [description, setDescription] = React.useState(initDescription);

  const updateData = async (description: string) => {
    update(["obligation", undefined, obligationId], {
      description: description,
    });
  };

  const updateDataDebounced = useDebouncedCallback((d) => updateData(d), 500);

  return (
    <HiddenInput
      value={description || undefined}
      placeholder="Add description"
      onChange={(e) => {
        setDescription(e.target.value);
        updateDataDebounced(e.target.value);
      }}
      className="w-full h-full"
    />
  );
};

const Options: React.FC<{ obligationId: string }> = ({ obligationId }) => {
  const archive = async () => {
    update(["obligation", undefined, obligationId], {
      archivedAt: new Date().toISOString(),
    });
  };
  const deleteObligation = async () => {
    deleteItem(["obligation", undefined, obligationId]);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconDots className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => archive()}>
          <IconArchive className="w-4 h-4 mr-2" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteObligation()}>
          <IconTrash className="text-red-500 w-4 h-4 mr-2" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const obligationColumns: ColumnDef<
  Obligation & { entity: { name: string }; obligationRule: ObligationRule }
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) =>
      row.original.createdAt.toLocaleString("en-AU", {
        timeZone: "Australia/Adelaide",
      }),
  },
  {
    accessorKey: "portfolioId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Portfolio ID" />
    ),
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Label" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <Description
        initDescription={row.original.description}
        obligationId={row.original.id}
      />
    ),
  },
  {
    accessorKey: "entityId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="To" />
    ),
    cell: ({ row }) => (
      <EntitySelection
        entityId={row.original.entityId}
        obligationId={row.original.id}
      />
    ),
    size: 280,
  },
  {
    accessorKey: "ocurrences",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Occurrences" />
    ),
    size: 50,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Link href={`/portfolio/table/occurrence/${row.original.id}`}>
          <Button className="w-full h-full" variant="outline">
            Occurrences
          </Button>
        </Link>
        <Link href={`/portfolio/ledger/${row.original.id}`}>
          <Button className="w-full h-full" variant="outline">
            Ledger
          </Button>
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "rule",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rule" />
    ),
    cell: ({ row }) => (
      <ObligationRuleForm
        label="Edit Rule"
        title="Edit Rule"
        defaults={{
          ...row.original.obligationRule,
          obligationRuleId: row.original.obligationRuleId || undefined,
          obligationId: row.original.id || undefined,
        }}
      />
    ),
  },
  {
    accessorKey: "options",
    header: () => <></>,
    enableResizing: true,
    cell: ({ row }) => <Options obligationId={row.original.id} />,
    size: 10,
  },
  {
    accessorKey: "archivedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Archived At" />
    ),
    cell: ({ row }) =>
      row.original.archivedAt
        ? row.original.archivedAt.toLocaleString("en-AU", {
            timeZone: "Australia/Adelaide",
          })
        : "",
  },
];

export const obligationVisibility = {
  id: false,
  createdAt: false,
  portfolioId: false,
  archivedAt: false,
};

export const obligationFilter: ColumnFiltersState = [
  { id: "archivedAt", value: undefined },
];
