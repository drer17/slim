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
import Card, { CardProps } from "../core/card/card";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Attribute, Document, Note, Tag } from "@prisma/client";
import Favourite from "../core/other/favourite";
import Container from "../core/container/container";
import Link from "next/link";
import {
  archive,
  createOrRemoveLink,
  update,
  updateStar,
  upsertLevel7,
} from "@/lib/actions/update";
import { useToast } from "@/hooks/use-toast";
import { ToastProps } from "../ui/toast";
import { useExpandedContext } from "../core/expanded-content/expanded-content";
import PathToResource, { PathSlug } from "../core/other/path-to-resource";
import ViewOptions from "../core/other/view-options";
import Notes from "../core/text/notes";
import DescriptionComponent from "../core/text/description";
import Attributes from "../core/attributes/attributes";
import { getIcon } from "../global/icons";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface Level2RowViewProps {
  pathToResource: PathSlug[];
  icon: string;
  title: string;
  tags: Tag[];
  starred: boolean;
  color: string;
  primary: string;
  description: string;
  attributes: Attribute[];
  documents: Document[];
  notes: Note[];
  actionButtons: {
    icon: string;
    label: string;
    href: string;
  }[];
  slug: string[];
  level2Children: CardProps[];
  availableChildren: { id: string; label: string }[];
  menuOptions: string[];
  modelKey: string;
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
  availableChildren,
  menuOptions,
}) => {
  const { toast } = useToast();
  const { expanded: isInDialog } = useExpandedContext();
  const { portfolioState } = usePortfolioContext();

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

  const saveAttribute = async (data: Record<string, string>, id?: string) => {
    const res = await upsertLevel7(slug, "attribute", data, id, {
      linkingTable: "attributeLink",
      key: "attributeId",
    });
    if (res) toast(res as ToastProps);
  };

  const saveDocument = async (data: Record<string, string>, id?: string) => {
    const res = await upsertLevel7(slug, "document", data, id, {
      linkingTable: "documentLink",
      key: "documentId",
    });
    if (res) toast(res as ToastProps);
  };

  const updateChild = async (id: string, checked: boolean) => {
    update(["asset-liability", undefined, id], {
      parentId: checked ? slug[slug.length - 1] : null,
    });
  };

  return (
    <div className="w-full flex flex-col">
      <PathToResource path={pathToResource} className="ml-2" />
      <div className="h-2" />
      <div className="flex w-full justify-between items-center p-2 space-x-4">
        <div className="flex items-center gap-2">
          <span style={{ color }}>{getIcon(icon)}</span>

          <h1 className="font-bold">{title}</h1>

          <div className="w-2" />

          <div className="flex items-end font-mono text-2xl bg-card/60 px-1 rounded shadow">
            {primary}
          </div>
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
      <ScrollArea
        className="w-full"
        style={{ maxHeight: `calc(100vh - 105px)` }}
      >
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
            <div className="grid-cols-1 grid gap-2">
              <Container title="Attributes" expandable={true}>
                <Attributes
                  attributes={attributes}
                  readOnly={isInDialog}
                  save={saveAttribute}
                />
              </Container>
            </div>
            <Container title="Notes" expandable={true}>
              <Notes notes={notes} save={saveNote} readOnly={isInDialog} />
            </Container>
          </div>
          <ScrollArea className="flex flex-col max-h-96">
            <div className="flex gap-2 flex-wrap">
              {actionButtons &&
                actionButtons.map((button, idx) => (
                  <Link key={`ActionButton${idx}`} href={button.href}>
                    <Button
                      className="flex-1 max-w-40 justify-start items-center"
                      variant="secondary"
                    >
                      {getIcon(button.icon)}
                      <span className="w-full font-bold items-center">
                        {button.label}
                      </span>
                    </Button>
                  </Link>
                ))}
            </div>
            <div className="h-2" />
            <Container title="" expandable={true}>
              {!isInDialog && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <h2 className="cursor-pointer w-32">Edit Children</h2>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-80 overflow-auto">
                    <DropdownMenuGroup>
                      {availableChildren.map((child) => (
                        <DropdownMenuCheckboxItem
                          key={child.id}
                          checked={
                            level2Children.find(
                              (checked) =>
                                checked.slug[checked.slug.length - 1] ===
                                child.id,
                            )
                              ? true
                              : false
                          }
                          onCheckedChange={(checked) =>
                            updateChild(child.id, checked)
                          }
                        >
                          {child.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <div className="flex gap-2 p-2 flex-wrap">
                {level2Children.map((card, idx) => (
                  <Card
                    {...card}
                    key={`Card${idx}`}
                    presetColors={portfolioState.colorPresets}
                  />
                ))}
              </div>
            </Container>
          </ScrollArea>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Level2RowView;
