"use server";

import { ModelContext } from "@/components/contexts/model-contexts";
import Level2RowView from "@/components/views/level-2-row-view";
import { Level2Model } from "@/lib/models/levels/level-2";
import { Level3Model } from "@/lib/models/levels/level-3";
import { ModelFactory } from "@/lib/models/model-factory";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const model = ModelFactory.create(params.slug);

  if (model instanceof Level2Model) {
    const data = await model.getDataForRow();
    return (
      <ModelContext modelKey={data.modelKey}>
        <Level2RowView {...data} />
      </ModelContext>
    );
  }
  if (model instanceof Level3Model) {
    const data = await model.getDataForRow();
    return (
      <ModelContext modelKey={data.modelKey}>
        <Level3RowView {...data} />
      </ModelContext>
    );
  }
}
