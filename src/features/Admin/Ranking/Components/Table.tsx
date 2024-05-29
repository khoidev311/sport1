import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Table from "@components/Table/Table";
import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";
import { TableProps } from "@components/Table";
import { BaseListQueryType, ResponseDataType } from "@interfaces/Common";
import TableImageColumn from "@components/Table/TableImageColumn";
import { RankDataType } from "@interfaces/Common/rankType";

import AdminRankTableRowAction, { AdminRankTableRowActionProps } from "./TableRowAction";

interface AdminRankTableProps extends Omit<TableProps, "columns">, Omit<AdminRankTableRowActionProps, "id"> {
  data: RankDataType[];
  isLoading: boolean;
  onGetAll: (params?: BaseListQueryType) => Promise<ResponseDataType<RankDataType[]>>;
}

const AdminRankTable = ({
  data,
  meta,
  isLoading,
  onClickEdit,
  onClickDelete,
  onGetAll,
  ...props
}: AdminRankTableProps) => {
  const { t } = useTranslation();

  const columnHelper = useMemo(() => createColumnHelper<RankDataType>(), []);

  const columns: Array<ColumnDef<RankDataType, string>> = useMemo(
    () => [
      columnHelper.accessor((row) => String(row.rank), {
        id: "rank",
        header: t("rank"),
      }),
      columnHelper.accessor((row) => String(row.point), {
        id: "point",
        header: t("point"),
      }),
      columnHelper.display({
        id: "team",
        header: t("team"),
        cell: (cell) => (
          <TableImageColumn
            className="rounded-none"
            imageClassName="rounded-none"
            src={cell.row.original.team.logo}
            alt={cell.row.original.team.name}
          />
        ),
        meta: {
          skeleton: <TableImageColumn skeleton />,
        },
      }),
      columnHelper.accessor((row) => String(row.league.name), {
        id: "league",
        header: t("league"),
      }),
      columnHelper.accessor((row) => String(row.win), {
        id: "win",
        header: t("win"),
      }),
      columnHelper.accessor((row) => String(row.lost), {
        id: "lost",
        header: t("lost"),
      }),
      columnHelper.accessor((row) => String(row.draw), {
        id: "draw",
        header: t("draw"),
      }),
      columnHelper.accessor((row) => String(row.total_match), {
        id: "total_match",
        header: t("totalMatch"),
      }),
      columnHelper.accessor((row) => String(row.efficiency), {
        id: "efficiency",
        header: t("efficiency"),
      }),
      columnHelper.accessor((row) => String(row.goal), {
        id: "goal",
        header: t("goal"),
      }),
      columnHelper.display({
        id: "actions",
        cell: (cell) => (
          <AdminRankTableRowAction
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
      columns={columns as Array<ColumnDef<RankDataType>>}
      isLoading={isLoading}
      {...props}
    />
  );
};

export default memo(AdminRankTable);
