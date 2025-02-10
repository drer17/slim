"use server";

import Level2TableView from "@/components/views/level-2-table-view";
import Level3TableView from "@/components/views/level-3-table-view";
import { Level2Model } from "@/lib/models/levels/level-2";
import { Level3Model } from "@/lib/models/levels/level-3";
import { ModelFactory } from "@/lib/models/model-factory";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const model = ModelFactory.create(params.slug);

  if (model instanceof Level2Model)
    return <Level2TableView {...await model.getDataForTable()} />;
  if (model instanceof Level3Model)
    return <Level3TableView {...await model.getDataForTable()} />;
}
