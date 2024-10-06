"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@prisma/client";
import React from "react";

interface NoteComponentProps {
  note: Note;
  saveNoteCallback: (id: string, text: string) => void;
}

const NoteComponent: React.FC<NoteComponentProps> = ({
  note,
  saveNoteCallback,
}) => {
  const [editing, setEditing] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>(note.text);

  return (
    <div className="flex space-x-2">
      <Avatar className="w-8 h-8">
        <AvatarFallback>{note.author[0]}</AvatarFallback>
      </Avatar>
      {editing ? (
        <Textarea
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          onBlur={() => {
            setEditing(false);
            saveNoteCallback(note.id, text);
          }}
          placeholder="Create new note..."
        />
      ) : (
        <p onClick={() => setEditing(true)}>{text}</p>
      )}
    </div>
  );
};

export default NoteComponent;
