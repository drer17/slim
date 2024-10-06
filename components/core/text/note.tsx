"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  const [editing, setEditing] = React.useState<boolean>(edit ? true : false);
  const [text, setText] = React.useState<string | undefined>(note?.text);

  const saveNote = async () => save({ text: text || "" }, note?.id);

  return (
    <div className="flex space-x-2 w-full mb-2">
      <Avatar className="w-6 h-6 mt-1">
        <AvatarFallback className="text-xs">
          {note?.author[0] || "A"}
        </AvatarFallback>
      </Avatar>
      <div className="w-full">
        {editing && !readOnly ? (
          <div>
            <Textarea
              autoFocus
              className="w-full"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              onBlur={() => {
                setEditing(false);
              }}
              placeholder="Create new note..."
            />
            <div className="flex justify-end space-x-2 mt-3">
              <Button variant="secondary" onClick={() => setText(undefined)}>
                Cancel
              </Button>
              <Button onClick={() => saveNote()}>Save</Button>
            </div>
          </div>
        ) : (
          <p className="w-full mt-1" onClick={() => setEditing(true)}>
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
