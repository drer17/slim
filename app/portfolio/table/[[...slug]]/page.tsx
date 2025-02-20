"use server";

import Level1TableView from "@/components/views/level-1-table-view";
import Level2TableView from "@/components/views/level-2-table-view";
import Level3TableView from "@/components/views/level-3-table-view";
import Level4TableView from "@/components/views/level-4-table-view";
import Level5TableView from "@/components/views/level-5-table-view";
import { Level1Model } from "@/lib/models/levels/level-1";
import { Level2Model } from "@/lib/models/levels/level-2";
import { Level3Model } from "@/lib/models/levels/level-3";
import { Level4Model } from "@/lib/models/levels/level-4";
import { Level5Model } from "@/lib/models/levels/level-5";
import { ModelFactory } from "@/lib/models/model-factory";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const model = ModelFactory.create(params.slug);

  if (model instanceof Level1Model)
    return (
      <Level1TableView
        {...await model.getDataForTable(20, 0)}
        slug={params.slug}
      />
    );
  if (model instanceof Level2Model)
    return (
      <Level2TableView {...await model.getDataForTable()} slug={params.slug} />
    );
  if (model instanceof Level3Model)
    return (
      <Level3TableView {...await model.getDataForTable()} slug={params.slug} />
    );
  if (model instanceof Level4Model)
    return (
      <Level4TableView
        {...await model.getDataForTable(20, 0)}
        slug={params.slug}
      />
    );
  if (model instanceof Level5Model)
    return (
      <Level5TableView
        {...await model.getDataForTable(20, 0)}
        slug={params.slug}
      />
    );
}
