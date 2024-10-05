/*
 * Level 2 Row Model View
 *
 * Author: Andre Repanich
 * Date: 05-10-24
 *
 * Component Requirements
 * [x]- View as per ui design doc
 * [ ]- Abstract Buttons
 * [ ]- Description
 * [ ]- Attributes
 * [ ]- Documents
 * [ ]- Notes
 * [ ]- Children
 * [ ]- Other
 */

import { IconDots } from "@tabler/icons-react";
import { CardProps } from "../core/card/card";
import { ScrollArea } from "../ui/scroll-area";
import PathToResource from "./path-to-resource";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import TagComponent from "../core/tag/tag";
import { Attribute, Document, Note, Tag } from "@prisma/client";
import Favourite from "../core/other/favourite";
import Container from "../core/container/container";
import Link from "next/link";

export interface Level2RowViewProps {
  pathToResource: string[];
  icon: React.ReactNode;
  title: string;
  tags: Tag[];
  starred: boolean;
  primary: string;
  description: string;
  attributes: Attribute[];
  documents: Document[];
  notes: Note[];
  actionButtons: { icon: React.ReactNode; label: string; href: string }[];
  level2Children: CardProps[];
  level3Children: CardProps[];
  changeStarCallback?: (star: boolean) => void;
  menuOptions: { label: string; callback: () => any }[];
}

const Level2RowView: React.FC<Level2RowViewProps> = ({
  pathToResource,
  icon,
  title,
  tags,
  starred,
  primary,
  description,
  attributes,
  documents,
  notes,
  actionButtons,
  level2Children,
  level3Children,
  changeStarCallback,
  menuOptions,
}) => {
  return (
    <div className="w-full flex flex-col">
      <PathToResource path={pathToResource} className="ml-2" />
      <div className="h-2" />
      <div className="flex w-full justify-between items-center p-2 space-x-4">
        <div className="flex items-center space-x-2">
          {icon}
          <h1 className="font-bold text-3xl">{title}</h1>
        </div>
        <div className="flex-1 flex space-x-2 items-end h-6">
          {tags.map((tag, idx) => (
            <TagComponent key={`Tag${idx}`} {...tag} />
          ))}
        </div>
        <div className="space-x-2 flex">
          <Favourite
            starred={starred}
            changeStarCallback={changeStarCallback}
          />
          {menuOptions && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="h-6 flex items-center rounded-sm bg-secondary p-2">
                  <IconDots />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{title} Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {menuOptions.map((option, idx) => (
                  <DropdownMenuItem
                    key={`Menu${idx}`}
                    onClick={() => option.callback}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className="h-8" />
      <ScrollArea className="w-full">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col space-y-4">
            <Container title="Description" expandable={true}>
              {description}
            </Container>
            <div className="grid-cols-2 grid gap-2">
              <Container title="Attributes" expandable={true}>
                {description}
              </Container>
              <Container title="Documents" expandable={true}>
                {description}
              </Container>
            </div>
            <Container title="Notes" expandable={true}>
              {description}
            </Container>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-2">
              {actionButtons &&
                actionButtons.map((button, idx) => (
                  <Link
                    key={`ActionButton${idx}`}
                    className="flex-1"
                    href={button.href}
                  >
                    <Button
                      className="flex-1 w-full justify-start items-center"
                      variant="secondary"
                    >
                      {button.icon}
                      <span className="w-full font-bold items-center">
                        {button.label}
                      </span>
                    </Button>
                  </Link>
                ))}
            </div>
            <Container title="" expandable={true}>
              {description}
            </Container>
            <Container title="" expandable={true}>
              {description}
            </Container>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Level2RowView;
