"use client";

/*
 * Attribute Component
 *
 * Author: Andre Repanich
 * Date: 7-10-24
 *
 * Component Requirements:
 * [ ]- Show Attribute Label and value in line
 * [ ]- Show the value as per the attribute type
 * [ ]- Edit value on click
 */

import { Attribute } from "@prisma/client";
import React from "react";
import InputSwitcher from "../other/input-switcher";
import { useDebouncedCallback } from "use-debounce";
import { ToastProps } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import useUpdateEffect from "@/hooks/use-update-effect";
import { update } from "@/lib/actions/update";

interface AttributeComponentProps extends Partial<Attribute> {
  disabled?: boolean;
}

const AttributeComponent: React.FC<AttributeComponentProps> = ({
  id,
  label,
  value,
  type,
  tooltip,
  disabled,
}) => {
  const { toast } = useToast();
  const [newValue, setNewValue] = React.useState<string>(value || "");
  const [editing, setEditing] = React.useState<boolean>(false);

  const updateAttribute = useDebouncedCallback(() => {
    const updateItem = async () => {
      const res = await update(["attribute", id], { value: newValue });
      if (res) toast(res as ToastProps);
    };
    updateItem();
  }, 1000);
  useUpdateEffect(() => updateAttribute(), [newValue, updateAttribute]);

  return (
    <div className="flex space-x-2 w-full">
      <p>{label}</p>
      {editing ? (
        <InputSwitcher
          value={value as string}
          type={type as string}
          onChange={(value) => setNewValue(value)}
          onBlur={() => setEditing(false)}
        />
      ) : (
        <p onClick={() => setEditing(true)} className="w-full">
          value
        </p>
      )}
    </div>
  );
};

export default AttributeComponent;
