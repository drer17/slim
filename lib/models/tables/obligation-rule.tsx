import { prisma } from "@/lib/prisma";
import { BaseModel } from "../base";
import { Status } from "@/lib/definitions/response";

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

  public async create(data: Partial<ObligationRule>): Promise<any> {
    data = {
      ...data,
      amount: parseFloat(data?.amount || "0"),
      frequency: parseInt(data?.frequency || "0"),
    };

    delete data?.obligationId;
    delete data?.obligationRuleId;

    const resp = await super.create(data);
    console.log(resp);

    if (resp.title === Status.failed) return resp;
    console.log("UPDATING", this.obligationId, resp.data.id);

    await prisma.obligation.update({
      where: { id: this.obligationId },
      data: { obligationRuleId: resp.data.id },
    });

    return resp;
  }
}
