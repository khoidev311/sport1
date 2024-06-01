import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Table from "@components/Table/Table";
import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";
import { TableProps } from "@components/Table";
import { BaseListQueryType, ConfigDataType, ResponseDataType } from "@interfaces/Common";

import AdminConfigTableRowAction, { AdminConfigTableRowActionProps } from "./TableRowAction";

interface AdminConfigTableProps
  extends Omit<TableProps, "columns">,
    Omit<AdminConfigTableRowActionProps, "id"> {
  data: ConfigDataType[];
  isLoading: boolean;
  onGetAll: (params?: BaseListQueryType) => Promise<ResponseDataType<ConfigDataType[]>>;
}

const AdminConfigTable = ({
  data,
  meta,
  isLoading,
  onClickEdit,
  onClickDelete,
  onGetAll,
  ...props
}: AdminConfigTableProps) => {
  const { t } = useTranslation();

  const columnHelper = useMemo(() => createColumnHelper<ConfigDataType>(), []);

  const columns: Array<ColumnDef<ConfigDataType, string>> = useMemo(
    () => [
      columnHelper.accessor((row) => String(row.key), {
        id: "key",
        header: t("key"),
        meta: {
          filterBy: "key",
          getFilterOptions: onGetAll,
        },
      }),
      columnHelper.accessor((row) => String(row.value), {
        id: "value",
        header: t("value"),
      }),
      columnHelper.display({
        id: "actions",
        cell: (cell) => (
          <AdminConfigTableRowAction
            id={cell.row.original._id}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
          />
        ),
        meta: {
          skeleton: <TableRowActionSkeleton numberOfActions={2} />,
        },
      }),
    ],
    [columnHelper, onClickDelete, onClickEdit, t, onGetAll],
  );

  return (
    <Table
      data={data}
      meta={meta}
      columns={columns as Array<ColumnDef<ConfigDataType>>}
      isLoading={isLoading}
      {...props}
    />
  );
};

export default memo(AdminConfigTable);
