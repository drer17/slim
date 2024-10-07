"use server";

import { Slug } from "../definitions/response";
import { ModelFactory } from "../models/model-factory";

export async function create(slug: Slug, data: Record<string, any>) {
  const model = ModelFactory.create(slug);
  model.create(data);
}
