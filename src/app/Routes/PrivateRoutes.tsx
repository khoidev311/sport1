import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoutes from "src/features/Admin/Routes/Routes";

import useSelector from "@hooks/useSelector";
import { userRoleSelector } from "@selectors/commonSelector";

import HomeRoutes from "../../features/Home/Routes/HomeRoutes";

const PrivateRoutes = () => {
  const { isAdmin } = useSelector(userRoleSelector);

  return (
    <Routes>
      {isAdmin && <Route path="admin/*" element={<AdminRoutes />} />}

      <Route path="/*" element={<HomeRoutes />} />
    </Routes>
  );
};

export default memo(PrivateRoutes);
