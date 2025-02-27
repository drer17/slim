import { prisma } from "@/lib/prisma";
import { BaseModel } from "../base";
import { Status, ToastProps } from "@/lib/definitions/response";
import { revalidatePath } from "next/cache";
import { generateToast } from "@/lib/utilities/response";

export class ObligationRuleModel<
  ObligationRule,
> extends BaseModel<ObligationRule> {
  obligationId?: string;

  constructor(obligationId?: string, obligationRuleId?: string) {
    super();
    this.id = obligationRuleId;
    this.obligationId = obligationId;
    this.tableName = "obligationRule";
  }

  public async update(
    data: Partial<ObligationRule>,
  ): Promise<void | ToastProps> {
    try {
      await prisma.obligationRule.update({
        where: { id: this.id },
        data: {
          ...data,
          amount: parseFloat(data?.amount || "0"),
          frequency: parseInt(data?.frequency || "0"),
        },
      });
      console.log(`${this.tableName} with ID ${this.id} updated successfully`);
      revalidatePath("/portfolio/");
      return generateToast(Status.success);
    } catch (error) {
      console.error("Error archiving asset:", error);
      return generateToast(Status.failed);
    }
  }

  public async create(
    data: Partial<
      ObligationRule & { obligationId?: string; obligationRuleId?: string }
    >,
  ): Promise<any> {
    data = {
      ...data,
      amount: parseFloat(data?.amount || "0"),
      frequency: parseInt(data?.frequency || "0"),
    };

    delete data?.obligationId;
    delete data?.obligationRuleId;

    const resp = await super.create(data);

    if (resp.title === Status.failed) return resp;

    await prisma.obligation.update({
      where: { id: this.obligationId },
      data: { obligationRuleId: resp.data.id },
    });

    return resp;
  }
}
