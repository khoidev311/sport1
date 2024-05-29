import { memo } from "react";
import { useTranslation } from "react-i18next";
import { BiPlus } from "react-icons/bi";

import { Button } from "@components/Button";

interface AdminFixtureHeaderActionsProps {
  onClickAdd?: () => void;
}

const AdminFixtureHeaderAction = ({ onClickAdd }: AdminFixtureHeaderActionsProps) => {
  const { t } = useTranslation();

  return (
    <Button className="rounded-md shadow-none" size="sm" onClick={onClickAdd}>
      <BiPlus size={24} className="mr-2" />
      {t("addFixture")}
    </Button>
  );
};

export default memo(AdminFixtureHeaderAction);
