import { memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { TableOnclickFunctionType } from "@interfaces/Common";

import { ITableRowActionDropdownMenuItem } from "../interface";

export interface TableRowActionDropdownMenuItemProps<T> {
  data: ITableRowActionDropdownMenuItem<T>;
  onClick: (callback: TableOnclickFunctionType<T>) => void;
}

const TableRowActionDropdownMenuItem = <T extends unknown>({
  data,
  onClick,
}: TableRowActionDropdownMenuItemProps<T>) => {
  const handleClick = useCallback(() => {
    if (data.type === "divider") return;

    onClick(data.onClick);
  }, [data, onClick]);

  if (data.type === "divider")
    return (
      <div className="px-5 py-2">
        <div className="border-b-2 border-gray-100" />
      </div>
    );

  return (
    <button
      className={twMerge("flex w-full items-center space-x-4 px-4 py-1.5 hover:bg-gray-100", data.className)}
      type="button"
      onClick={handleClick}
    >
      <div className="flex h-6 w-6 items-center justify-center">{data.icon}</div>
      <div>{data.label}</div>
    </button>
  );
};

export default memo(TableRowActionDropdownMenuItem) as typeof TableRowActionDropdownMenuItem;
