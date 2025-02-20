"use client";

/*
 * Hidden Input
 *
 * Author: Andre Repanich
 * Date: 09-10-24
 *
 * Component Requirements
 * [X]- Show the description
 * [X]- Click to edit
 */

import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const HiddenInput: React.FC<
  {
    textClass?: string;
    textLimit?: number;
  } & React.InputHTMLAttributes<HTMLInputElement>
> = (props) => {
  const [editing, setEditing] = React.useState<boolean>(false);

  return (
    <div
      className={cn(
        "w-full h-full flex justify-between flex-col items-center",
        props.className,
      )}
    >
      {editing && !props.disabled ? (
        <div className="w-full">
          <Input
            {...props}
            autoFocus
            onBlur={(e) => {
              props.onBlur && props.onBlur(e);
              setEditing(false);
            }}
          />
        </div>
      ) : (
        <p
          className={cn("mt-0 h-full text-left w-full", props.textClass)}
          onClick={() => setEditing(true)}
          dir={props.dir}
        >
          {props.value || props.placeholder}
        </p>
      )}
    </div>
  );
};

export default HiddenInput;
