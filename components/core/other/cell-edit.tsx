"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { update } from "@/lib/actions/update";
import { Slug } from "@/lib/definitions/response";
import { useState } from "react";
import HiddenInput from "./hidden-input";
import { useDebouncedCallback } from "use-debounce";

export const FieldEditor: React.FC<{
  slug: Slug;
  field: string;
  value: any;
  type: "text" | "boolean";
}> = ({ slug, field, value, type }) => {
  const [edit, setEdit] = useState(value);
  const onChange = async (newValue: any) => {
    await update(slug, { [field]: newValue });
  };

  const debouncedChange = useDebouncedCallback(
    async (update) => await onChange(update),
    300,
  );

  switch (type) {
    case "boolean":
      return (
        <Checkbox
          checked={edit}
          onCheckedChange={(e) => {
            setEdit(e);
            debouncedChange(e);
          }}
        />
      );
    default:
      return (
        <HiddenInput
          value={edit}
          placeholder="Edit"
          className="h-6"
          onChange={(e) => {
            setEdit(e.target.value);
            debouncedChange(e.target.value);
          }}
        />
      );
  }
};
