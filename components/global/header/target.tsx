"use client";

/*
 * Target Component
 *
 * Author: Andre Repanich
 * Date: 05-10-24
 *
 * Component Requirements
 * [ ]- Change the asset target
 */

import { Combobox } from "@/components/ui/combobox";
import React from "react";

const Target = () => {
  return (
    <div className="w-32 md:w-40">
      <Combobox
        items={[]}
        labelKey="label"
        valueKey="id"
        idKey="id"
        values={[]}
        onValueChange={() => {}}
        placeholder="Portfolio"
        buttonClassName="text-lg font-bold pl-2"
        commandPrompt="Search assets..."
      />
    </div>
  );
};

export default Target;
