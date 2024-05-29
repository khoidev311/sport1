import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Table from "@components/Table/Table";
import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";
import { TableProps } from "@components/Table";
import { BaseListQueryType, ResponseDataType } from "@interfaces/Common";
import TableImageColumn from "@components/Table/TableImageColumn";
import { TeamDataType } from "@interfaces/Common/teamType";

import AdminTeamTableRowAction, { AdminTeamTableRowActionProps } from "./TableRowAction";

interface AdminTeamTableProps extends Omit<TableProps, "columns">, Omit<AdminTeamTableRowActionProps, "id"> {
  data: TeamDataType[];
  isLoading: boolean;
  onGetAll: (params?: BaseListQueryType) => Promise<ResponseDataType<TeamDataType[]>>;
}

const AdminTeamTable = ({
  data,
  meta,
  isLoading,
  onClickEdit,
  onClickDelete,
  onGetAll,
  ...props
}: AdminTeamTableProps) => {
  const { t } = useTranslation();

  const columnHelper = useMemo(() => createColumnHelper<TeamDataType>(), []);

  const columns: Array<ColumnDef<TeamDataType, string>> = useMemo(
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
      columnHelper.accessor((row) => row.league.name, {
        id: "league",
        header: t("league"),
      }),
      columnHelper.display({
        id: "actions",
        cell: (cell) => (
          <AdminTeamTableRowAction
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
      columns={columns as Array<ColumnDef<TeamDataType>>}
      isLoading={isLoading}
      {...props}
    />
  );
};

export default memo(AdminTeamTable);
