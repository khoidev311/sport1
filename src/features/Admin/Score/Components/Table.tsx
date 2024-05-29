import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Table from "@components/Table/Table";
import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";
import { TableProps } from "@components/Table";
import { BaseListQueryType, ResponseDataType } from "@interfaces/Common";
import TableImageColumn from "@components/Table/TableImageColumn";
import { ScoreDataType } from "@interfaces/Common/scoreType";

import AdminScoreTableRowAction, { AdminScoreTableRowActionProps } from "./TableRowAction";

interface AdminScoreTableProps
  extends Omit<TableProps, "columns">,
    Omit<AdminScoreTableRowActionProps, "id"> {
  data: ScoreDataType[];
  isLoading: boolean;
  onGetAll: (params?: BaseListQueryType) => Promise<ResponseDataType<ScoreDataType[]>>;
}

const AdminScoreTable = ({
  data,
  meta,
  isLoading,
  onClickEdit,
  onClickDelete,
  onGetAll,
  ...props
}: AdminScoreTableProps) => {
  const { t } = useTranslation();

  const columnHelper = useMemo(() => createColumnHelper<ScoreDataType>(), []);

  const columns: Array<ColumnDef<ScoreDataType, string>> = useMemo(
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
      columnHelper.accessor((row) => row.score, {
        id: "score",
        header: t("score"),
        meta: {
          filterBy: "score",
          getFilterOptions: onGetAll,
        },
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
          <AdminScoreTableRowAction
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
      columns={columns as Array<ColumnDef<ScoreDataType>>}
      isLoading={isLoading}
      {...props}
    />
  );
};

export default memo(AdminScoreTable);
