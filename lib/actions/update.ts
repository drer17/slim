"use server";

import { Level2Model } from "../models/levels/level-2";
import { ModelFactory } from "../models/model-factory";
import { Slug, Status, ToastProps } from "../definitions/response";
import { generateToast } from "../utilities/response";
import { TableNames } from "../models/base";

export async function updateColor(
  slug: Slug,
  color: string,
): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2Model) return await model.changeColor(color);
  return generateToast(Status.failed);
}

export async function updateStar(
  slug: Slug,
  star: boolean,
): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2Model) {
    return await model.changeStar(star);
  }
  return generateToast(Status.failed);
}

export async function archive(slug: Slug): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2Model) {
    return await model.archive();
  }
  return generateToast(Status.failed);
}

export async function upsertLevel7(
  slug: Slug,
  targetTable: TableNames,
  data: Record<string, string>,
  targetId?: string,
  link?: { linkingTable: TableNames; key: string },
): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2Model) {
    return await model.upsertLevel7(targetTable, data, targetId, link);
  }
  return generateToast(Status.failed);
}

export async function update(
  slug: Slug,
  data: Record<string, string | null>,
): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  return await model.update(data);
}

export async function createOrRemoveLink(
  slug: Slug,
  linkingTable: TableNames,
  linkedId: string,
  linkedKey: string,
  remove?: boolean,
): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2Model) {
    return await model.createOrRemoveLink(
      linkingTable,
      linkedId,
      linkedKey,
      remove,
    );
  }
  return generateToast(Status.failed);
}

export async function updateTransactionLink(props: {
  occurrenceId: string;
  newTransactions: string[];
}) {
  const model = ModelFactory.create(["occurrence"]);
  await model.updateTransactionLink(props);
}
