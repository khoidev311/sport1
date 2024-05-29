import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Table from "@components/Table/Table";
import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";
import { TableProps } from "@components/Table";
import { BaseListQueryType, ResponseDataType } from "@interfaces/Common";
import { LeagueDataType } from "@interfaces/Common/leagueType";
import TableImageColumn from "@components/Table/TableImageColumn";

import AdminLeagueTableRowAction, { AdminLeagueTableRowActionProps } from "./TableRowAction";

interface AdminLeagueTableProps
  extends Omit<TableProps, "columns">,
    Omit<AdminLeagueTableRowActionProps, "id"> {
  data: LeagueDataType[];
  isLoading: boolean;
  onGetAll: (params?: BaseListQueryType) => Promise<ResponseDataType<LeagueDataType[]>>;
}

const AdminLeagueTable = ({
  data,
  meta,
  isLoading,
  onClickEdit,
  onClickDelete,
  onGetAll,
  ...props
}: AdminLeagueTableProps) => {
  const { t } = useTranslation();

  const columnHelper = useMemo(() => createColumnHelper<LeagueDataType>(), []);

  const columns: Array<ColumnDef<LeagueDataType, string>> = useMemo(
    () => [
      columnHelper.display({
        id: "logo",
        header: t("logo"),
        cell: (cell) => (
          <TableImageColumn
            className="rounded-none"
            imageClassName="rounded-none"
            src={cell.row.original.logo}
            alt={cell.row.original.name}
          />
        ),
        meta: {
          skeleton: <TableImageColumn skeleton />,
        },
      }),
      columnHelper.accessor((row) => row.name, {
        id: "name",
        header: t("name"),
        meta: {
          filterBy: "name",
          getFilterOptions: onGetAll,
        },
      }),
      columnHelper.display({
        id: "actions",
        cell: (cell) => (
          <AdminLeagueTableRowAction
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
      columns={columns as Array<ColumnDef<LeagueDataType>>}
      isLoading={isLoading}
      {...props}
    />
  );
};

export default memo(AdminLeagueTable);
