"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getComplementaryColor } from "@/lib/utilities/color";
import { IconX } from "@tabler/icons-react";

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
  removeTagCallback: (id: string) => void;
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
      className="rounded-lg justify-between flex w-full max-h-8 items-center p-2"
      style={{ background: color, height: !detail ? "16px" : undefined }}
    >
      {detail && (
        <>
          <p>{label}</p>
          <button onClick={() => removeTagCallback(id)}>
            <IconX
              className="w-4 h-4 invisible hover:visible"
              style={{ color: getComplementaryColor(color) }}
            />
          </button>
        </>
      )}
    </TooltipTrigger>
    {!detail && <TooltipContent side="right">{label}</TooltipContent>}
  </Tooltip>
);

export default Tag;
