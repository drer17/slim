import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Tag } from "@prisma/client";
import { IconCheck } from "@tabler/icons-react";
import React from "react";
import TagComponent from "./tag";
import { create } from "@/lib/actions/create";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";

interface TagProps {
  appliedTags: Tag[];
  upsertTag: (add: boolean, tagId: string) => void;
}

export const Tags: React.FC<TagProps> = ({ appliedTags, upsertTag }) => {
  const {
    portfolioState: { tags },
  } = usePortfolioContext();
  const [open, setOpen] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const toggleTag = (selectedTag: Tag) => {
    if (appliedTags.some((tag) => tag.id === selectedTag.id))
      upsertTag(false, selectedTag.id);
    else upsertTag(true, selectedTag.id);
  };

  const createTag = () => {
    create(["tag"], { label: searchTerm });
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <div
            className="flex-1 max-w-80 flex space-x-2 items-center h-9 border rounded-md p-2"
            aria-expanded={open}
          >
            {tags.map((tag, idx) => (
              <TagComponent key={`Tag${idx}`} {...tag} detail={true} />
            ))}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder={"Search tags..."}
              className="h-8"
              value={searchTerm}
              onValueChange={(search) => setSearchTerm(search)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !tags.some(
                    (tag) =>
                      tag.label.toLowerCase() === searchTerm.toLowerCase(),
                  )
                ) {
                  setOpen(false);
                  createTag();
                }
                console.log("enter");
              }}
            />
            <CommandList>
              <CommandEmpty>Add new tag.</CommandEmpty>
              <CommandGroup>
                {tags.map((item, idx) => {
                  const isSelected = tags.some((tag) => tag.id === item.id);
                  return (
                    <CommandItem
                      key={idx}
                      value={item.id}
                      aria-required={true}
                      onSelect={() => {
                        toggleTag(item);
                        setOpen(false);
                      }}
                    >
                      {item.label}
                      <IconCheck
                        className={cn(
                          "ml-auto h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
