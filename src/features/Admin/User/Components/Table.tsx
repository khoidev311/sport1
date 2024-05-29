import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Table from "@components/Table/Table";
import TableImageColumn from "@components/Table/TableImageColumn";
import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";
import { BaseListQueryType, ResponseDataType, UserDataType } from "@interfaces/Common";
import { TableProps } from "@components/Table";

import AdminUserTableRowAction, { AdminUserTableRowActionProps } from "./TableRowAction";

interface AdminUserTableProps extends Omit<TableProps, "columns">, Omit<AdminUserTableRowActionProps, "id"> {
  data: UserDataType[];
  isLoading: boolean;
  onGetAll: (params?: BaseListQueryType) => Promise<ResponseDataType<UserDataType[]>>;
}

const AdminUserTable = ({
  data,
  isLoading,
  onGetAll,
  onClickEdit,
  onClickDelete,
  ...props
}: AdminUserTableProps) => {
  const { t } = useTranslation();

  const columnHelper = useMemo(() => createColumnHelper<UserDataType>(), []);

  const columns: Array<ColumnDef<UserDataType, string>> = useMemo(
    () => [
      columnHelper.display({
        id: "avatar",
        header: t("avatar"),
        cell: (cell) => <TableImageColumn src={cell.row.original.avatar} alt={cell.row.original.fullname} />,
        meta: {
          skeleton: <TableImageColumn skeleton />,
        },
      }),
      columnHelper.accessor((row) => row.email, {
        id: "email",
        header: t("email"),
        meta: {
          filterBy: "email",
          getFilterOptions: onGetAll,
        },
      }),
      columnHelper.accessor((row) => row.fullname, {
        id: "fullname",
        header: t("fullName"),
        meta: {
          filterBy: "fullname",
          filterLabel: t("fullName"),
          getFilterOptions: onGetAll,
        },
      }),
      columnHelper.display({
        id: "actions",
        cell: (cell) => (
          <AdminUserTableRowAction
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
    [columnHelper, onClickDelete, onClickEdit, onGetAll, t],
  );

  return (
    <Table data={data} columns={columns as Array<ColumnDef<UserDataType>>} isLoading={isLoading} {...props} />
  );
};

export default memo(AdminUserTable);
