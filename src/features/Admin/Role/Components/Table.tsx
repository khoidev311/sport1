import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Table from "@components/Table/Table";
import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";
import { TableProps } from "@components/Table";
import { BaseListQueryType, ResponseDataType, UserRoleDataType } from "@interfaces/Common";
import { UserRoleEnum } from "@enums/userEnum";

import AdminRoleTableRowAction, { AdminRoleTableRowActionProps } from "./TableRowAction";

interface AdminRoleTableProps extends Omit<TableProps, "columns">, Omit<AdminRoleTableRowActionProps, "id"> {
  data: UserRoleDataType[];
  isLoading: boolean;
  onGetAll: (params?: BaseListQueryType) => Promise<ResponseDataType<UserRoleDataType[]>>;
}

const AdminRoleTable = ({
  data,
  meta,
  isLoading,
  onClickEdit,
  onClickDelete,
  onGetAll,
  ...props
}: AdminRoleTableProps) => {
  const { t } = useTranslation();

  const columnHelper = useMemo(() => createColumnHelper<UserRoleDataType>(), []);

  const columns: Array<ColumnDef<UserRoleDataType, UserRoleEnum>> = useMemo(
    () => [
      columnHelper.accessor((row) => row.name, {
        id: "name",
        header: t("name"),
        meta: {
          filterBy: "name",
          getFilterOptions: onGetAll,
        },
      }),
      columnHelper.accessor((row) => row.slug, {
        id: "slug",
        header: t("slug"),
      }),
      columnHelper.display({
        id: "actions",
        cell: (cell) => (
          <AdminRoleTableRowAction
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
      columns={columns as Array<ColumnDef<UserRoleDataType>>}
      isLoading={isLoading}
      {...props}
    />
  );
};

export default memo(AdminRoleTable);
