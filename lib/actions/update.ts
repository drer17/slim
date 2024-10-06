"use server";

import { Level2ModelView } from "../models/levels/level-2";
import { ModelFactory } from "../models/model-factory";
import { Status, ToastProps } from "../interfaces/response";
import { generateToast } from "../utilities/response";
import { revalidatePath } from "next/cache";

export async function updateColor(
  slug: (string | undefined)[],
  color: string,
): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2ModelView) return model.changeColor(color);
  return generateToast(Status.failed);
}

export async function updateStar(
  slug: (string | undefined)[],
  star: boolean,
): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2ModelView) {
    revalidatePath("/");
    return model.changeStar(star);
  }
  return generateToast(Status.failed);
}

export async function archive(
  slug: (string | undefined)[],
): Promise<void | ToastProps> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2ModelView) {
    revalidatePath("/");
    return model.archive();
  }
  return generateToast(Status.failed);
}
