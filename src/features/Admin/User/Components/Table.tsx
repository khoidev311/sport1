import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Table from "@components/Table/Table";
import TableImageColumn from "@components/Table/TableImageColumn";
import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";
import { BaseListQueryType, ResponseDataType, UserDataType } from "@interfaces/Common";

import AdminUserTableRowAction, { AdminUserTableRowActionProps } from "./TableRowAction";

interface AdminUserTableProps extends Omit<AdminUserTableRowActionProps, "id"> {
  data: UserDataType[];
  isLoading: boolean;
  onGetAll: (params?: BaseListQueryType) => Promise<ResponseDataType<UserDataType[]>>;
}

const AdminUserTable = ({ data, isLoading, onGetAll, onClickEdit, onClickDelete }: AdminUserTableProps) => {
  const { t } = useTranslation("admin");

  const columnHelper = useMemo(() => createColumnHelper<UserDataType>(), []);

  const columns: Array<ColumnDef<UserDataType, string>> = useMemo(
    () => [
      columnHelper.accessor((row) => String(row.id), {
        id: "id",
        header: t("id"),
      }),
      columnHelper.display({
        id: "avatar",
        header: t("avatar"),
        cell: (props) => (
          <TableImageColumn src={props.row.original.avatar} alt={props.row.original.fullName} />
        ),
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
      columnHelper.accessor((row) => row.fullName, {
        id: "fullName",
        header: t("fullName"),
        meta: {
          filterBy: "fullName",
          filterLabel: t("fullName"),
          getFilterOptions: onGetAll,
        },
      }),
      columnHelper.accessor((row) => row.phone, {
        id: "phone",
        header: t("phone"),
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <AdminUserTableRowAction
            id={props.row.original.id}
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
    <Table
      data={data}
      meta={null}
      columns={columns as Array<ColumnDef<UserDataType>>}
      isLoading={isLoading}
    />
  );
};

export default memo(AdminUserTable);
