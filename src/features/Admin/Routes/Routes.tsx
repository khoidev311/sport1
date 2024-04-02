import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { LayoutContainer } from "@common/Layout";

import AdminUserManagement from "../User/User";

const AdminRoutes = () => {
  return (
    <LayoutContainer sidebar={<div>Sidebar</div>} sidebarIds={[]}>
      <Routes>
        <Route
          path="*"
          element={<div className="flex min-h-fit-layout w-full items-center justify-center">Admin</div>}
        />
        <Route path="user" element={<AdminUserManagement />} />
      </Routes>
    </LayoutContainer>
  );
};

export default memo(AdminRoutes);
