"use server";

/*
 * Row Page
 *
 * A route to display a database row
 * NOTE: currently only supports level 2 table category
 */

import { ModelContext } from "@/components/contexts/model-contexts";
import Level2RowView from "@/components/views/level-2-row-view";
import { Level2Model } from "@/lib/models/levels/level-2";
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
}
