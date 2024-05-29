import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Table from "@components/Table/Table";
import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";
import { TableProps } from "@components/Table";
import { BaseListQueryType, ResponseDataType } from "@interfaces/Common";
import TableImageColumn from "@components/Table/TableImageColumn";
import { FixtureDataType } from "@interfaces/Common/fixrureType";

import AdminFixtureTableRowAction, { AdminFixtureTableRowActionProps } from "./TableRowAction";

interface AdminFixtureTableProps
  extends Omit<TableProps, "columns">,
    Omit<AdminFixtureTableRowActionProps, "id"> {
  data: FixtureDataType[];
  isLoading: boolean;
  onGetAll: (params?: BaseListQueryType) => Promise<ResponseDataType<FixtureDataType[]>>;
}

const AdminFixtureTable = ({
  data,
  meta,
  isLoading,
  onClickEdit,
  onClickDelete,
  onGetAll,
  ...props
}: AdminFixtureTableProps) => {
  const { t } = useTranslation();

  const columnHelper = useMemo(() => createColumnHelper<FixtureDataType>(), []);

  const columns: Array<ColumnDef<FixtureDataType, string>> = useMemo(
    () => [
      columnHelper.display({
        id: "host_team",
        header: t("hostTeam"),
        cell: (cell) => (
          <TableImageColumn
            className="rounded-none"
            imageClassName="rounded-none"
            src={cell.row.original.host_team.logo}
            alt={cell.row.original.host_team.name}
          />
        ),
        meta: {
          skeleton: <TableImageColumn skeleton />,
        },
      }),
      columnHelper.accessor((row) => row.start_time, {
        id: "start_time",
        header: t("startTime"),
      }),
      columnHelper.display({
        id: "guest_team",
        header: t("guestTeam"),
        cell: (cell) => (
          <TableImageColumn
            className="rounded-none"
            imageClassName="rounded-none"
            src={cell.row.original.guest_team.logo}
            alt={cell.row.original.guest_team.name}
          />
        ),
        meta: {
          skeleton: <TableImageColumn skeleton />,
        },
      }),
      columnHelper.accessor((row) => row.league.name, {
        id: "league",
        header: t("league"),
      }),
      columnHelper.display({
        id: "actions",
        cell: (cell) => (
          <AdminFixtureTableRowAction
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
    [columnHelper, onClickDelete, onClickEdit, t],
  );

  return (
    <Table
      data={data}
      meta={meta}
      columns={columns as Array<ColumnDef<FixtureDataType>>}
      isLoading={isLoading}
      {...props}
    />
  );
};

export default memo(AdminFixtureTable);
