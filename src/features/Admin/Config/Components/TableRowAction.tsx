import { Key, memo } from "react";

import TableRowActionEdit from "@components/Table/TableRowAction/TableRowActionEdit";
import { TableOnclickFunctionType } from "@interfaces/Common";
import { TableRowActionDelete } from "@components/Table";

export interface AdminConfigTableRowActionProps {
  id: Key;
  onClickEdit: TableOnclickFunctionType<number>;
  onClickDelete: TableOnclickFunctionType<number>;
}

const AdminConfigTableRowAction = ({ id, onClickEdit, onClickDelete }: AdminConfigTableRowActionProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowActionEdit data={id} onClick={onClickEdit} />
      <TableRowActionDelete data={id} onClick={onClickDelete} />
    </div>
  );
};

export default memo(AdminConfigTableRowAction);
