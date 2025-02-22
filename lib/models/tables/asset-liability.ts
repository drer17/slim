import { prisma } from "@/lib/prisma";
import { Level2RowViewProps } from "@/components/views/level-2-row-view";
import { Level2Model } from "../levels/level-2";
import { Level2TableViewProps } from "@/components/views/level-2-table-view";
import { CardProps } from "@/components/core/card/card";
import { Status, ToastProps } from "@/lib/definitions/response";
import { FormDialog } from "@/components/forms/types";
import { generateToast } from "@/lib/utilities/response";

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

  public async get(): Promise<ToastProps | AssetLiability[]> {
    try {
      const result = await prisma.assetLiability.findMany({
        where: {
          AND: [{ id: this.id }, { archivedAt: null }],
        },
      });
      console.log(
        `Found ${this.tableName} with this id ${this.id} and returned successfully`,
      );
      return result as AssetLiability[];
    } catch (error) {
      console.error(`Error getting ${this.tableName}:`, error);
      return generateToast(Status.failed);
    }
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
        archivedAt: null,
        parentId: null,
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
      pathToResource: [{ label: "portfolio", href: "/portfolio" }],
      formDialog: FormDialog.ASSET_LIABILITY,
      title: this.asset ? "Assets" : "Liabilites",
      items: res.map((asset) => ({
        type: {
          label: asset.assetType.label,
          icon: asset.assetType.icon,
        },
        icon: asset.icon || asset.assetType.icon,
        title: asset.label,
        secondary: asset.assetType.label,
        primary: (
          (asset.assetType.asset ? 1 : -1) * asset.valuations[0]?.value || 0
        ).toLocaleString("en-AU", {
          style: "currency",
          currency: "AUD",
        }),
        tags: asset.TagLink.map((tag) => tag.tag),
        color: asset.color,
        starred: asset.starred,
        presetColors: [],
        href: "/portfolio/row/",
        slug: ["asset-liability", this.asset ? "asset" : "liability", asset.id],
        children: "",
        getRowAsChild: true,
      })) as (CardProps & {
        type: { label: string; icon?: string };
      })[],
      menuOptions: [
        {
          label: "types",
          href: "/portfolio/table/asset-liability-type",
        },
      ],
      modelKey: "assetLiability",
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
        assetType: true,
      },
    });

    const availableAssetLiabilities = await prisma.assetLiability.findMany({
      where: {
        portfolioId: this.portfolioId,
        archivedAt: null,
        NOT: { id: this.id },
      },
    });
    const parsedAvailableAssets = availableAssetLiabilities.map((as) => ({
      id: as.id,
      label: as.label,
    }));

    return assetLiabilityData.map((asset) => ({
      pathToResource: [
        { label: "portfolio", href: "/portfolio" },
        {
          label: "assets",
          href: `/portfolio/table/${this.asset ? "asset" : "liability"}`,
        },
      ],
      icon: asset.icon || asset.assetType.icon,
      title: asset.label,
      tags: asset.TagLink.map((tag) => tag.tag),
      starred: asset.starred,
      color: asset.color,
      primary: (
        (asset.assetType.asset ? 1 : -1) * asset.valuations[0]?.value || 0
      ).toLocaleString("en-AU", {
        style: "currency",
        currency: "AUD",
      }),
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
        icon: child.icon || child.assetType.icon,
        title: child.label,
        secondary: child.assetType.label,
        primary: (
          (child.assetType.asset ? 1 : -1) * child.valuations[0]?.value || 0
        ).toLocaleString("en-AU", {
          style: "currency",
          currency: "AUD",
        }),
        tags: child.TagLink.map((tag) => tag.tag),
        color: String(child.color),
        starred: child.starred,
        presetColors: [],
        slug: [
          "asset-liability",
          child.assetType.asset ? "asset" : "liability",
          child.id,
        ],
        href: `/portfolio/row/`,
        getRowAsChild: true,
      })),
      availableChildren: parsedAvailableAssets,
      menuOptions: ["archive"],
      modelKey: "assetLiability",
    }))[0] as Level2RowViewProps;
  }
}
