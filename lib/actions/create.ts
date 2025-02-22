"use server";

import { Slug, Status, ToastProps } from "../definitions/response";
import { ModelFactory } from "../models/model-factory";
import { generateToast } from "../utilities/response";
import { promises as fs } from "fs";
import path from "path";
import { upsertLevel7 } from "./update";
import { Document } from "@prisma/client";
import { Level4Model } from "../models/levels/level-4";

export async function create(slug: Slug, data: Record<string, any>) {
  console.log("CREATING", slug);
  const model = ModelFactory.create(slug);
  return model.create(data);
}

export async function createFile(
  form: FormData,
  parentSlug: Slug,
): Promise<ToastProps> {
  const file = form.get("file") as Blob;

  if (!file) {
    console.log(file);
    return generateToast(Status.failed);
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const originalFileName = (file as File).name;
  const fileExtension = path.extname(originalFileName).replace(".", "");
  const fileName = originalFileName.replace(`.${fileExtension}`, "");

  const timestamp = Date.now();
  const newFileName = `${timestamp}_${originalFileName}`;

  const uploadsDir = path.join(process.cwd(), "uploads");
  const filePath = path.join(uploadsDir, newFileName);

  await fs.mkdir(uploadsDir, { recursive: true });
  await fs.writeFile(filePath, buffer);

  const data: Partial<Document> = {
    filePath: newFileName,
    fileType: fileExtension,
    label: fileName,
  };

  await upsertLevel7(
    parentSlug,
    "document",
    data as Record<string, any>,
    undefined,
    {
      linkingTable: "documentLink",
      key: "documentId",
    },
  );

  return generateToast(Status.success);
}

export async function importData(
  data: Record<string, string>[],
  slug: Slug,
): Promise<ToastProps> {
  console.log("IMporting", slug, data);
  const model = ModelFactory.create(slug);
  if (model instanceof Level4Model) {
    console.log("HERE");
    model.importData(data);
    return generateToast(Status.success);
  }
  return generateToast(Status.failed);
}

export async function createOccurrences() {
  const model = ModelFactory.create(["obligation"]);
  await model.createOccurrences();
}
