"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getComplementaryColor } from "@/lib/utilities/color";
import { Tag } from "@prisma/client";
import { IconXboxX } from "@tabler/icons-react";

/*
 * Tag
 *
 * Author: Andre Repanich
 * Date: 29-09-24
 *
 * Component Requirements
 *  - Display
 *    - Label
 *  - Highlight a color
 *  - OnHover
 *    - Show remove icon
 *    - If condensed, show tooltip
 */

const TagComponent: React.FC<
  Tag & {
    detail?: string;
    removeTagCallback?: (id: string) => void;
  }
> = ({ id, label, color, detail, removeTagCallback }) => (
  <Tooltip>
    <TooltipTrigger
      className="rounded-md justify-between max-h-4 flex w-auto items-center p-2 bg-zinc-500 group"
      style={{
        background: color || undefined,
        height: !detail ? "16px" : undefined,
      }}
    >
      {detail && (
        <>
          <p
            className="text-xs uppercase font-medium"
            style={{ color: getComplementaryColor(color || undefined) }}
          >
            {label}
          </p>
          <div onClick={() => removeTagCallback && removeTagCallback(id)}>
            <IconXboxX className="w-3 h-3 invisible group-hover:visible ml-1" />
          </div>
        </>
      )}
    </TooltipTrigger>
    {!detail && <TooltipContent side="right">{label}</TooltipContent>}
  </Tooltip>
);

export default TagComponent;
