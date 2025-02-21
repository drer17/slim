"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getUser(): Promise<string> {
  const cookieStore = cookies();
  return cookieStore.get("user")?.value ?? "";
}

export async function setUser(userId: string) {
  const cookieStore = cookies();
  cookieStore.set("user", userId);
  revalidatePath("/");
}

export async function setPortfolio(portfolioId: string) {
  const cookieStore = cookies();
  cookieStore.set("portfolio", portfolioId);
  revalidatePath("/");
}
