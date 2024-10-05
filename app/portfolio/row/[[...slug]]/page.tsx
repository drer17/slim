"use server";

import Level2RowView from "@/components/views/level-2-row-view";
import { Level2ModelView } from "@/lib/models/levels/level-2";
import { Level3ModelView } from "@/lib/models/levels/levels";
import { ModelFactory } from "@/lib/models/model-factory";

export default async function Page({ params }: { params: { slug: string } }) {
  const model = ModelFactory.create(params.slug);

  if (model instanceof Level2ModelView)
    return <Level2RowView {...await model.getDataForRow()} />;
  if (model instanceof Level3ModelView)
    return <Level3RowView {...await model.getDataForRow()} />;
}
