import { getIcon } from "@/components/global/icons";
import { prisma } from "@/lib/prisma";
import { Level2RowViewProps } from "@/components/views/level-2-row-view";
import { Level2ModelView } from "../levels/level-2";
import { Level2TableViewProps } from "@/components/views/level-2-table-view";
import { CardProps } from "@/components/core/card/card";

export class AssetLiabilityModel extends Level2ModelView {
  private asset?: boolean;

  constructor(type?: string, id?: string) {
    super();
    this.tableName = "assetLiability";
    this.asset = type === "liability" ? false : true;
    this.id = id;
    this.getDataForRow();
  }

  public async getDataForTable(): Promise<Level2TableViewProps> {
    const res = await prisma.assetLiability.findMany({
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
        assetType: true,
        TagLink: {
          include: {
            tag: true,
          },
        },
        valuations: { take: 1, orderBy: { createdAt: "desc" } },
      },
    });

    const data: Level2TableViewProps = {
      pathToResource: ["portfolio", "assets"],
      title: this.asset ? "Assets" : "Liabilites",
      items: res.map((asset) => ({
        type: {
          label: asset.assetType.label,
          icon: getIcon(asset.assetType.icon),
        },
        icon: getIcon(asset.icon),
        title: asset.label,
        secondary: asset.assetType.label,
        primary: asset.valuations[0]?.value,
        tags: asset.TagLink.map((tag) => tag.tag),
        color: asset.color,
        starred: asset.starred,
        presetColors: [],
        href: "/portfolio/row/",
        slug: ["asset-liability", this.asset ? "asset" : "liability", asset.id],
        children: "",
        getRowAsChild: true,
      })) as (CardProps & {
        type: { label: string; icon?: React.ReactNode };
      })[],
      menuOptions: [],
    };

    return data;
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
      color: asset.color,
      primary: String(asset.valuations[0]?.value),
      description: asset.description ?? "",
      attributes: asset.attributes.map((attr) => attr.attribute),
      documents: asset.DocumentLink.map((doc) => doc.document),
      notes: asset.NoteLink.map((note) => note.note),
      slug: ["asset-liability", this.asset ? "asset" : "liability", asset.id],
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
        slug: [
          "asset-liability",
          child.assetType.asset ? "asset" : "liability",
          asset.id,
        ],
        href: "/portfolio/row/",
        getRowAsChild: true,
      })),
      level3Children: [],
      menuOptions: ["archive"],
    }))[0] as Level2RowViewProps;
  }
}
