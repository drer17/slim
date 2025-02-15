import { getIcon } from "@/components/global/icons";
import { prisma } from "@/lib/prisma";
import { Level2RowViewProps } from "@/components/views/level-2-row-view";
import { Level2Model } from "../levels/level-2";
import { Level2TableViewProps } from "@/components/views/level-2-table-view";
import { CardProps } from "@/components/core/card/card";
import { ToastProps } from "@/lib/definitions/response";
import { FormDialog } from "@/components/forms/types";

export class AssetLiabilityModel<
  AssetLiability,
> extends Level2Model<AssetLiability> {
  private asset?: boolean;

  constructor(type?: string, id?: string) {
    super();
    this.tableName = "assetLiability";
    this.asset = type === "liability" ? false : true;
    this.id = id;
    this.getDataForRow();
  }

  public async create(
    data: Partial<AssetLiability>,
  ): Promise<any | ToastProps> {
    console.log(data);
    return super.create({ portfolioId: this.portfolioId, ...data });
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
      pathToResource: [{ label: "portfolio", href: "/portfolio/dashboard" }],
      formDialog: FormDialog.ASSET_LIABILITY,
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
            note: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
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
      pathToResource: [
        { label: "portfolio", href: "/portfolio/dashboard" },
        {
          label: "assets",
          href: `/portfolio/table/${this.asset ? "asset" : "liability"}`,
        },
      ],
      icon: asset.icon,
      title: asset.label,
      tags: asset.TagLink.map((tag) => tag.tag),
      starred: asset.starred,
      color: asset.color,
      primary: String(asset.valuations[0]?.value),
      description: asset.description ?? "",
      attributes: asset.attributes.map((attr) => attr.attribute),
      documents: asset.DocumentLink.map((doc) => doc.document),
      notes: asset.NoteLink.map((noteLink) => ({
        ...noteLink.note,
        author: noteLink.note.user.name,
      })),
      slug: ["asset-liability", this.asset ? "asset" : "liability", asset.id],
      actionButtons: [
        {
          label: "Transactions",
          href: `/portfolio/table/transaction/${asset.id}`,
          icon: "transactions",
        },
        {
          label: "Obligations",
          href: `/portfolio/table/obligation/${asset.id}`,
          icon: "obligations",
        },
        {
          label: "Valuations",
          href: `/portfolio/table/valuation/${asset.id}`,
          icon: "valuations",
        },
      ],
      level2Children: asset.children.map((child) => ({
        icon: child.icon,
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
