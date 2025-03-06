import { Level3TableViewProps } from "@/components/views/level-3-table-view";
import { Level3Model } from "../levels/level-3";
import { prisma } from "@/lib/prisma";
import { Entity } from "@prisma/client";
import { FormDialog } from "@/components/forms/types";
import { Status, ToastProps } from "@/lib/definitions/response";
import { revalidatePath } from "next/cache";
import { generateToast } from "@/lib/utilities/response";

export class EntityModel extends Level3Model<Entity> {
  constructor(id?: string) {
    super();
    this.tableName = "entity";
    this.id = id;
  }

  public async create(data: Partial<Entity>): Promise<any | ToastProps> {
    return super.create({
      portfolioId: this.portfolioId,
      ...data,
      phone: parseInt(data.phone as unknown as string),
    });
  }

  public async update(data: Partial<Entity>): Promise<void | ToastProps> {
    try {
      await prisma.entity.update({
        where: { id: this.id },
        data: { ...data, phone: parseInt(data?.phone as unknown as string) },
      });
      console.log(`${this.tableName} with ID ${this.id} updated successfully`);
      revalidatePath("/portfolio/");
      return generateToast(Status.success);
    } catch (error) {
      console.error("Error updating asset:", error);
      return generateToast(Status.failed);
    }
  }

  async getDataForTable(): Promise<Level3TableViewProps> {
    const rows = await prisma.entity.findMany({
      where: {
        portfolio: {
          PortfolioUsers: {
            some: {
              userId: this.userId,
            },
          },
        },
      },
    });

    const ents: Level3TableViewProps = {
      title: "Entities",
      pathToResource: [{ label: "portfolio", href: "/portfolio" }],
      rows: rows,
      formDialog: FormDialog.ENTITY,
      menuOptions: [],
      modelKey: "entities",
    };

    return ents;
  }
}
