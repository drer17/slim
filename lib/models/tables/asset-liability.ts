import { getIcon } from "@/components/global/icons";
import { prisma } from "@/lib/prisma";
import { Level2RowViewProps } from "@/components/views/level-2-row-view";
import { Level2ModelView } from "../levels/level-2";

export class AssetLiabilityModel extends Level2ModelView {
  private id?: string;
  private asset?: boolean;

  constructor(type?: string, id?: string) {
    super();
    this.asset = type === "liabilities" ? false : true;
    this.id = id;
    this.getDataForRow();
  }

  public async getDataForRow(): Promise<Level2RowViewProps> {
    const assetLiabilityData = await prisma.assetLiability.findMany({
      where: {
        id: this.id,
        assetType: {
          asset: this.asset,
        },
        portfolio: {
          PortfolioUsers: {
            some: {
              userId: this.userId,
            },
          },
        },
      },
      include: {
        TagLink: {
          include: {
            tag: true,
          },
        },
        valuations: { take: 1, orderBy: { createdAt: "desc" } },
        attributes: {
          include: {
            attribute: true,
          },
        },
        NoteLink: {
          include: {
            note: true,
          },
        },
        DocumentLink: {
          include: {
            document: true,
          },
        },
        children: {
          include: {
            assetType: true,
            valuations: { take: 1, orderBy: { createdAt: "desc" } },
            TagLink: {
              include: { tag: true },
            },
          },
        },
      },
    });

    return assetLiabilityData.map((asset) => ({
      pathToResource: [],
      icon: getIcon(asset.icon),
      title: asset.label,
      tags: asset.TagLink.map((tag) => tag.tag),
      starred: asset.starred,
      primary: String(asset.valuations[0]?.value),
      description: asset.description ?? "",
      attributes: asset.attributes.map((attr) => attr.attribute),
      documents: asset.DocumentLink.map((doc) => doc.document),
      notes: asset.NoteLink.map((note) => note.note),
      actionButtons: [],
      level2Children: asset.children.map((child) => ({
        icon: getIcon(child.icon),
        title: child.label,
        secondary: child.assetType.label,
        primary: child.valuations[0].value,
        tags: child.TagLink.map((tag) => tag.tag),
        color: String(child.color),
        starred: child.starred,
        presetColors: [],
        href: "",
        children: "",
        changeColorCallback: (color: string) => {
          this.changeColor("assetLiability", child.id, color);
        },
        changeStarCallback: (star: boolean) => {
          this.changeStar("assetLiability", child.id, star);
        },
        archiveCallback: () => {
          this.archive("assetLiability", child.id);
        },
      })),
      level3Children: [],
      menuOptions: [],
    }))[0];
  }
}
