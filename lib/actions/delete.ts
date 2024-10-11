"use server";

import { Slug, ToastProps } from "../definitions/response";
import { ModelFactory } from "../models/model-factory";

export async function deleteItem(slug: Slug): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  return model.delete();
}
