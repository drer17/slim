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
import InputSwitcher, { InputSwitcherType } from "../other/input-switcher";
import { useDebouncedCallback } from "use-debounce";
import { ToastProps } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import useUpdateEffect from "@/hooks/use-update-effect";
import { update } from "@/lib/actions/update";
import {
  Select,
  SelectContentNoPortal,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useExpandedContext } from "../expanded-content/expanded-content";

interface AttributeComponentProps extends Partial<Attribute> {
  save: (data: Record<string, any>, id?: string) => void;
  disabled?: boolean;
}

const AttributeComponent: React.FC<AttributeComponentProps> = ({
  disabled,
  save,
  ...props
}) => {
  const { toast } = useToast();
  const { expanded } = useExpandedContext();
  const [newAttribute, setNewAttribute] =
    React.useState<Partial<Attribute>>(props);
  const [editing, setEditing] = React.useState<boolean>(false);

  const updateAttribute = useDebouncedCallback(() => {
    const updateItem = async () => {
      const res = await update(["attribute", props.id], {
        ...(newAttribute as Record<string, any>),
      });
      if (res) toast(res as ToastProps);
    };
    updateItem();
  }, 1000);
  useUpdateEffect(() => {
    if (!props.id) return;
    updateAttribute();
  }, [newAttribute, updateAttribute]);

  return (
    <div className="flex space-x-2 w-full items-center my-2">
      {!props.id ? (
        <div className="flex space-x-2 w-full items-center">
          <InputSwitcher
            value={newAttribute.label as string}
            placeholder="Label"
            type={InputSwitcherType.string}
            onChange={(value) =>
              setNewAttribute((prev) => ({ ...prev, label: value }))
            }
          />
          <InputSwitcher
            value={newAttribute.value as string}
            placeholder="Value"
            type={(props.type || InputSwitcherType.string) as InputSwitcherType}
            onChange={(value) =>
              setNewAttribute((prev) => ({ ...prev, value: value }))
            }
            onBlur={() => setEditing(false)}
          />
          <Select
            value={newAttribute.type}
            onValueChange={(value) =>
              setNewAttribute((prev) => ({ ...prev, type: value }))
            }
          >
            <SelectTrigger className="h-8 w-full capitalize">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContentNoPortal>
              {Object.values(InputSwitcherType).map((type) => (
                <SelectItem
                  key={type}
                  value={String(type)}
                  className="capitalize"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContentNoPortal>
          </Select>
          <Button
            variant="secondary"
            className="text-zinc-300 uppercase"
            onClick={() => save(newAttribute)}
          >
            <IconPlus className="w-4 h-4 mr-2" />
            new attribute
          </Button>
        </div>
      ) : (
        <div className="flex w-full space-x-2 items-center">
          <p className="min-w-1/2 w-full text-zinc-500 font-medium">
            {props.label}
          </p>
          {editing ? (
            <InputSwitcher
              value={newAttribute.value as string}
              placeholder="Value"
              type={
                (props.type || InputSwitcherType.string) as InputSwitcherType
              }
              onChange={(value) =>
                setNewAttribute((prev) => ({ ...prev, value: value }))
              }
              onBlur={() => setEditing(false)}
            />
          ) : (
            <p onClick={() => setEditing(true)} className="text-right">
              {props.value}
            </p>
          )}
          {expanded !== undefined && (
            <>
              <div className="w-16"></div>
              <Button variant="ghost" size="icon" className="h-8">
                <IconX className="w-4 h-4 text-zinc-500" />
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AttributeComponent;
