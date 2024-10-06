"use client";

import { Note } from "@prisma/client";
import NoteComponent from "./note";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useExpandedContext } from "../expanded-content/expanded-content";
import { cn } from "@/lib/utils";

const Notes: React.FC<
  {
    notes: Note[];
  } & {
    save: (data: Record<string, any>, id?: string) => void;
    readOnly?: boolean;
  }
> = ({ save, notes, readOnly }) => {
  const { expanded: isInExpanded } = useExpandedContext();
  return (
    <div className="w-full flex flex-col h-full">
      <ScrollArea className={cn("max-h-[100px]")}>
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
