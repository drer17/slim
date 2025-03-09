import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteItem } from "@/lib/actions/delete";
import { update } from "@/lib/actions/update";
import { Slug } from "@/lib/definitions/response";
import { IconArchive, IconDots, IconTrash } from "@tabler/icons-react";

const Options: React.FC<{ slug: Slug }> = ({ slug }) => {
  const archive = async () => {
    update(slug, {
      archivedAt: new Date().toISOString(),
    });
  };
  const deleteObligation = async () => {
    deleteItem(slug);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconDots className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => archive()}>
          <IconArchive className="w-4 h-4 mr-2" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteObligation()}>
          <IconTrash className="text-red-500 w-4 h-4 mr-2" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Options;
