import { memo } from "react";
import { useTranslation } from "react-i18next";
import { BiPlus } from "react-icons/bi";

import { Button } from "@components/Button";

interface AdminLeagueHeaderActionsProps {
  onClickAdd?: () => void;
}

const AdminLeagueHeaderAction = ({ onClickAdd }: AdminLeagueHeaderActionsProps) => {
  const { t } = useTranslation();

  return (
    <Button className="rounded-md shadow-none" size="sm" onClick={onClickAdd}>
      <BiPlus size={24} className="mr-2" />
      {t("addLeague")}
    </Button>
  );
};

export default memo(AdminLeagueHeaderAction);
