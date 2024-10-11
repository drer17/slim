"use client";

/*
 * Description
 *
 * Author: Andre Repanich
 * Date: 09-10-24
 *
 * Component Requirements
 * [X]- Show the description
 * [X]- Click to edit
 */

import { Textarea } from "@/components/ui/textarea";
import { update } from "@/lib/actions/update";
import React from "react";

interface DescriptionComponentProps {
  text: string;
  slug: (string | undefined)[];
  readOnly?: boolean;
}

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  slug,
  text,
  readOnly,
}) => {
  const [editing, setEditing] = React.useState<boolean>(false);
  const [description, setDescription] = React.useState<string | undefined>(
    text,
  );

  const saveDescription = async () =>
    update(slug, { description: description || "" });

  return (
    <div className="w-full h-full">
      {editing && !readOnly ? (
        <div>
          <Textarea
            autoFocus
            className="w-full"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            onBlur={() => {
              setEditing(false);
              saveDescription();
            }}
            placeholder="Add a description..."
          />
        </div>
      ) : (
        <p className="w-full mt-0 h-full" onClick={() => setEditing(true)}>
          {text || <span className="text-zinc-500">Add a description...</span>}
        </p>
      )}
    </div>
  );
};

export default DescriptionComponent;
