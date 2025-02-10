"use client";

import Card, { CardProps } from "@/components/core/card/card";
import { Button } from "@/components/ui/button";
import ViewOptions from "@/components/core/other/view-options";
import { FormDialog } from "../forms";
import { usePortfolioContext } from "../portfolio-provider";

interface AssetsProps {
  assets: CardProps[];
}

const Assets: React.FC<AssetsProps> = ({ assets }) => {
  const { setOpenForm } = usePortfolioContext();
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
      <div className="flex gap-2">
        {assets.map((asset, index) => (
          <Card key={index} {...asset}></Card>
        ))}
      </div>
    </div>
  );
};

export default Assets;
