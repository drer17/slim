/* eslint-disable */

import * as React from "react";

export const defaultColumn = {
  cell: ({ getValue, row, column, table }) => {
    const initialValue = getValue();

    const [value, setValue] = React.useState<unknown>(initialValue);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const cellRef = React.useRef<HTMLDivElement>(null);

    const onBlur = () => {
      setIsEditMode(false);
      table.options.meta?.updateData(row.index, column.id, value);
      !table.options.meta?.dataModifier &&
        console.warn("Provide Data Modifier to persist data change.");
    };

    // if the initialValue is changed externally, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
      if (!isEditMode) return;
      const handleClickOutside = (event: MouseEvent) => {
        if (
          cellRef.current &&
          !cellRef.current.contains(event.target as Node)
        ) {
          onBlur();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onBlur]);

    return (
      <div
        ref={cellRef}
        onDoubleClick={() =>
          column.columnDef.meta?.renderEditCell && setIsEditMode(true)
        }
      >
        {isEditMode && column.columnDef.meta?.renderEditCell
          ? column.columnDef.meta?.renderEditCell(row, onBlur, (value) =>
              setValue(value),
            )
          : column.columnDef.meta?.renderCell(row) || String(value)}
      </div>
    );
  },
};
