"use server";

import { Level2RowViewProps } from "@/components/views/level-2-row-view";
import { Level2ModelView } from "../models/levels/level-2";
import { ModelFactory } from "../models/model-factory";

export async function getRowData(
  slug: (string | undefined)[],
): Promise<{ viewLevel: string; data: Level2RowViewProps } | undefined> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2ModelView) {
    return { viewLevel: "level-2", data: await model.getDataForRow() };
  }
  return undefined;
}
