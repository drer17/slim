"use client";

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

import { IconArchive } from "@tabler/icons-react";
import { CardProps } from "../core/card/card";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Attribute, Document, Note, Tag } from "@prisma/client";
import Favourite from "../core/other/favourite";
import Container from "../core/container/container";
import Link from "next/link";
import {
  archive,
  createOrRemoveLink,
  updateStar,
  upsertLevel7,
} from "@/lib/actions/update";
import { useToast } from "@/hooks/use-toast";
import { ToastProps } from "../ui/toast";
import { useExpandedContext } from "../core/expanded-content/expanded-content";
import PathToResource from "../core/other/path-to-resource";
import ViewOptions from "../core/other/view-options";
import Notes from "../core/text/notes";
import DescriptionComponent from "../core/text/description";
import { Tags } from "../core/tag/tags";

export interface Level2RowViewProps {
  pathToResource: string[];
  icon: React.ReactNode;
  title: string;
  tags: Tag[];
  starred: boolean;
  color: string;
  primary: string;
  description: string;
  attributes: Attribute[];
  documents: Document[];
  notes: Note[];
  actionButtons: { icon: React.ReactNode; label: string; href: string }[];
  slug: string[];
  level2Children: CardProps[];
  level3Children: CardProps[];
  menuOptions: string[];
}

const Level2RowView: React.FC<Level2RowViewProps> = ({
  pathToResource,
  icon,
  title,
  tags,
  starred,
  color,
  primary,
  description,
  attributes,
  documents,
  notes,
  actionButtons,
  slug,
  level2Children,
  level3Children,
  menuOptions,
}) => {
  const { toast } = useToast();
  const { expanded: isInDialog } = useExpandedContext();

  const changeStar = async (star: boolean) => {
    const res = await updateStar(slug, star);
    if (res) toast(res as ToastProps);
  };

  const availableMenuOptions = {
    archive: {
      icon: <IconArchive className="text-red-500 mr-2 w-4 h-4" />,
      callable: async () => {
        const res = await archive(slug);
        if (res) toast(res as ToastProps);
      },
    },
  };

  const saveNote = async (data: Record<string, string>, id?: string) => {
    console.log(data);
    const res = await upsertLevel7(slug, "note", data, id, {
      linkingTable: "noteLink",
      key: "noteId",
    });
    if (res) toast(res as ToastProps);
  };

  const upsertTag = async (add: boolean, id: string) => {
    const res = await createOrRemoveLink(slug, "tagLink", id, "tagId", !add);
    if (res) toast(res as ToastProps);
  };

  return (
    <div className="w-full flex flex-col">
      <PathToResource path={pathToResource} className="ml-2" />
      <div className="h-2" />
      <div className="flex w-full justify-between items-center p-2 space-x-4">
        <div className="flex items-center space-x-2">
          <span style={{ color }}>{icon}</span>
          <h1 className="font-bold text-3xl">{title}</h1>
        </div>
        <div className="flex-1">
          <Tags appliedTags={tags} upsertTag={upsertTag} />
        </div>
        <div className="space-x-2 flex group">
          <Favourite
            starred={starred}
            changeStarCallback={(star) => changeStar(star)}
          />
          <ViewOptions
            menuOptions={menuOptions}
            availableMenuOptions={availableMenuOptions}
            isInDialog={isInDialog}
          />
        </div>
      </div>
      <div className="h-8" />
      <ScrollArea className="w-full">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col space-y-4">
            <div className="p-2 space-y-2 min-h-28">
              <h2 className="text-xl font-bold">Description</h2>
              <DescriptionComponent
                text={description}
                slug={slug}
                readOnly={isInDialog}
              />
            </div>
            <div className="grid-cols-2 grid gap-2">
              <Container title="Attributes" expandable={true}>
                {description}
              </Container>
              <Container title="Documents" expandable={true}>
                {description}
              </Container>
            </div>
            <Container title="Notes" expandable={true}>
              <Notes notes={notes} save={saveNote} readOnly={isInDialog} />
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
