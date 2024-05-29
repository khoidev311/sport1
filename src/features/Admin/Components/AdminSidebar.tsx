import { memo } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineSettings } from "react-icons/md";
import { LuUser, LuUserCog, LuUsers } from "react-icons/lu";
import { IoCalendarNumberOutline, IoFootball } from "react-icons/io5";
import { TbScoreboard } from "react-icons/tb";
import { RiNumbersLine } from "react-icons/ri";

import { LayoutSidebar, LayoutSidebarItem } from "@common/Layout";
import { ADMIN_PATH } from "@constants/routeConstant";

const AdminSidebar = () => {
  const { t } = useTranslation();
  return (
    <LayoutSidebar id="adminSidebar" className="pt-16">
      <LayoutSidebarItem id="league" icon={<IoFootball />} text={t("league")} to={ADMIN_PATH.LEAGUE} />
      <LayoutSidebarItem id="team" icon={<LuUsers />} text={t("team")} to={ADMIN_PATH.TEAM} />
      <LayoutSidebarItem id="score" icon={<TbScoreboard />} text={t("score")} to={ADMIN_PATH.SCORE} />
      <LayoutSidebarItem
        id="fixture"
        icon={<IoCalendarNumberOutline />}
        text={t("fixture")}
        to={ADMIN_PATH.FIXTURE}
      />
      <LayoutSidebarItem id="ranking" icon={<RiNumbersLine />} text={t("ranking")} to={ADMIN_PATH.RANKING} />
      <LayoutSidebarItem id="user" icon={<LuUser />} text={t("user")} to={ADMIN_PATH.USER} />
      <LayoutSidebarItem id="role" icon={<LuUserCog />} text={t("role")} to={ADMIN_PATH.ROLE} />
      <LayoutSidebarItem id="config" icon={<MdOutlineSettings />} text={t("config")} to={ADMIN_PATH.CONFIG} />
    </LayoutSidebar>
  );
};
export default memo(AdminSidebar);
