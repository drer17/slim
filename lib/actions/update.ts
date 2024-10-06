"use server";

import { Level2Model } from "../models/levels/level-2";
import { ModelFactory } from "../models/model-factory";
import { Status, ToastProps } from "../interfaces/response";
import { generateToast } from "../utilities/response";
import { revalidatePath } from "next/cache";
import { TableNames } from "../models/base";

export async function updateColor(
  slug: (string | undefined)[],
  color: string,
): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2Model) return model.changeColor(color);
  return generateToast(Status.failed);
}

export async function updateStar(
  slug: (string | undefined)[],
  star: boolean,
): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2Model) {
    revalidatePath("/");
    return model.changeStar(star);
  }
  return generateToast(Status.failed);
}

export async function archive(
  slug: (string | undefined)[],
): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2Model) {
    revalidatePath("/");
    return model.archive();
  }
  return generateToast(Status.failed);
}

export async function upsertLevel7(
  slug: (string | undefined)[],
  targetTable: TableNames,
  data: Record<string, string>,
  targetId?: string,
  link?: { linkingTable: TableNames; key: string },
): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2Model) {
    revalidatePath("/");
    return model.upsertLevel7(targetTable, data, targetId, link);
  }
  return generateToast(Status.failed);
}

export async function update(
  slug: (string | undefined)[],
  data: Record<string, string>,
): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  return model.update(data);
}
