"use client";

import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Note } from "@prisma/client";
import React from "react";

interface NoteComponentProps {
  save: (data: Record<string, any>, id?: string) => void;
  note?: Note;
  edit?: boolean;
  readOnly?: boolean;
}

const NoteComponent: React.FC<NoteComponentProps> = ({
  save,
  note,
  edit,
  readOnly,
}) => {
  const {
    portfolioState: { author },
  } = usePortfolioContext();
  const [editing, setEditing] = React.useState<boolean>(edit ? true : false);
  const [text, setText] = React.useState<string | undefined>(note?.text);

  const saveNote = async () =>
    save({ text: text || "", author: author }, note?.id);

  return (
    <div className="flex space-x-2 w-full mb-4">
      <Tooltip>
        <TooltipTrigger className="w-6 h-6">
          <Avatar
            className="w-6 h-6 mt-1"
            style={{
              marginTop: note?.createdAt ? "20px" : undefined,
              opacity: !note?.createdAt ? 0 : undefined,
            }}
          >
            <AvatarFallback className="text-xs">
              {note?.author[0] || "A"}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        {note?.author && <TooltipContent>{note?.author}</TooltipContent>}
      </Tooltip>
      <div className="w-full">
        <p className="text-zinc-500 text-xs">
          {note?.createdAt &&
            format(note?.createdAt as Date, "MMMM dd, yyyy hh:mm a")}
        </p>
        {editing && !readOnly ? (
          <div>
            <Textarea
              autoFocus
              className="w-full"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              placeholder="Create new note..."
            />
            <div className="flex justify-end space-x-2 mt-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setText(undefined);
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setEditing(false);
                  saveNote();
                }}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p
            className="w-full mt-1 text-zinc-200"
            onClick={() => setEditing(true)}
          >
            {note?.text || (
              <span className="text-zinc-500">Create new note...</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default NoteComponent;
