import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { LayoutContainer } from "@common/Layout";

import AdminUserManagement from "../User/User";
import AdminRoleManagement from "../Role/Role";
import AdminLeagueManagement from "../League/League";
import AdminTeamManagement from "../Team/Team";
import AdminScoreManagement from "../Score/Score";
import AdminFixtureManagement from "../Fixture/Fixture";
import AdminRankManagement from "../Ranking/Rank";
import AdminConfigManagement from "../Config/Config";
import AdminSidebar from "../Components/AdminSidebar";

const AdminRoutes = () => {
  return (
    <LayoutContainer sidebar={<AdminSidebar />} sidebarIds={["adminSidebar"]}>
      <Routes>
        <Route
          path="*"
          element={<div className="flex min-h-fit-layout w-full items-center justify-center">Admin</div>}
        />
        <Route path="league" element={<AdminLeagueManagement />} />
        <Route path="team" element={<AdminTeamManagement />} />
        <Route path="fixture" element={<AdminFixtureManagement />} />
        <Route path="ranking" element={<AdminRankManagement />} />
        <Route path="score" element={<AdminScoreManagement />} />
        <Route path="user" element={<AdminUserManagement />} />
        <Route path="role" element={<AdminRoleManagement />} />
        <Route path="config" element={<AdminConfigManagement />} />
      </Routes>
    </LayoutContainer>
  );
};

export default memo(AdminRoutes);
