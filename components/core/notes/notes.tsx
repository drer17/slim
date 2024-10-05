import { Note } from "@prisma/client";
import { useContainerContext } from "../container/container";

const Notes: React.FC<{ notes: Note[] }> = ({ notes }) => {
  const { focussed } = useContainerContext();
};

export default Notes;
