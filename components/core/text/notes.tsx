"use client";

import { Note } from "@prisma/client";
import NoteComponent from "./note";
import { ScrollArea } from "@/components/ui/scroll-area";

const Notes: React.FC<
  {
    notes: Note[];
  } & {
    save: (data: Record<string, any>, id?: string) => void;
    readOnly?: boolean;
  }
> = ({ save, notes, readOnly }) => {
  return (
    <div className="w-full flex flex-col h-[calc(100%-40px)]">
      <ScrollArea className="flex-1">
        {notes.reverse().map((note, idx) => (
          <NoteComponent
            key={`Note${idx}`}
            save={save}
            note={note}
            readOnly={readOnly}
          />
        ))}
      </ScrollArea>
      {!readOnly && (
        <div className="w-full">
          <NoteComponent save={save} readOnly={readOnly} />
        </div>
      )}
    </div>
  );
};

export default Notes;
