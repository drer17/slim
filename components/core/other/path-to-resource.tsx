/*
 * Path To Resource
 *
 * Author: Andre Repanich
 * Date: 9-10-24
 *
 * Component Requirements:
 * [X]- enable up the tree routing
 */

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface PathToResourceProps {
  path: string[];
  className?: string;
}

const PathToResource: React.FC<PathToResourceProps> = ({
  path = [],
  className,
}) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {path.map((p, idx) => (
          <React.Fragment key={`Path${idx}`}>
            {idx > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              <BreadcrumbLink href={p} className="capitalize">
                {p}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PathToResource;
