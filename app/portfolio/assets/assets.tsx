"use client";

import Card, { CardProps } from "@/components/core/card/card";
import { Button } from "@/components/ui/button";
import ViewOptions from "@/components/core/other/view-options";
import { usePortfolioContext } from "../portfolio-provider";
import { useMemo } from "react";
import { FormDialog } from "@/components/forms/types";

interface AssetsProps {
  assets: CardProps[];
}

const Assets: React.FC<AssetsProps> = ({ assets }) => {
  const { setOpenForm } = usePortfolioContext();

  const sortedAssets = useMemo(() => {
    const newAssets: Record<string, CardProps[]> = {};
    assets.forEach((asset) => {
      if (asset.starred) {
        if (!newAssets?.favourites) newAssets["favourites"] = [];
        newAssets["favourites"].push(asset);
        return;
      }
      if (asset.category) {
        if (!newAssets[asset.category]) newAssets[asset.category] = [];
        newAssets[asset.category].push(asset);
      }
    });
    return newAssets;
  }, [assets]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1>Assets</h1>
        </div>

        <div className="flex gap-2 items-center">
          <Button
            className="h-8"
            variant="outline"
            onClick={() => setOpenForm(FormDialog.ASSET_LIABILITY)}
          >
            Create New Asset
          </Button>

          <ViewOptions menuOptions={[]} availableMenuOptions={{}} />
        </div>
      </div>
      <div className="flex gap-3 flex-col">
        {Object.entries(sortedAssets).map(([category, assets]) => (
          <div key={category} className="gap-2 flex flex-col">
            <h2 className="capitalize text-muted-foreground">{category}</h2>
            <div className="flex flex-col gap-2">
              {assets.map((asset, index) => (
                <Card key={index} {...asset}></Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assets;
