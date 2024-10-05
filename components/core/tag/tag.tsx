"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getComplementaryColor } from "@/lib/utilities/color";
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

export interface TagProps {
  id: string;
  label: string;
  color?: string;
  detail?: boolean;
  removeTagCallback?: (id: string) => void;
}

const Tag: React.FC<TagProps> = ({
  id,
  label,
  color,
  detail,
  removeTagCallback,
}) => (
  <Tooltip>
    <TooltipTrigger
      className="rounded-full justify-between max-h-4 flex w-auto items-center p-2 bg-zinc-500 group"
      style={{ background: color, height: !detail ? "16px" : undefined }}
    >
      {detail && (
        <>
          <p
            className="text-xs uppercase font-medium"
            style={{ color: getComplementaryColor(color) }}
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

export default Tag;
