import { memo } from "react";

import TableRowActionEdit from "@components/Table/TableRowAction/TableRowActionEdit";
import { TableOnclickFunctionType } from "@interfaces/Common";

export interface AdminUserTableRowActionProps {
  id: number;
  onClickEdit: TableOnclickFunctionType<number>;
  onClickDelete: TableOnclickFunctionType<number>;
}

const AdminUserTableRowAction = ({ id, onClickEdit, onClickDelete }: AdminUserTableRowActionProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowActionEdit data={id} onClick={onClickEdit} />
      <TableRowActionEdit data={id} onClick={onClickDelete} />
    </div>
  );
};

export default memo(AdminUserTableRowAction);
