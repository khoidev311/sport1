import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiHelpCircle, FiLogOut, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

import useSelector from "@hooks/useSelector";
import { authService } from "@services/index";

interface HeaderUserDropdownItemProps {
  onClick?: () => void;
}

const HeaderUserDropdownItem = ({ onClick }: HeaderUserDropdownItemProps) => {
  const { t } = useTranslation("company");

  const user = useSelector((state) => state.common.user);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickLogout = useCallback(() => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    authService
      .logOut()
      .then(() => {
        return authService.removeAuthToken();
      })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  }, [isSubmitting]);

  return (
    <>
      <div className="group flex w-full cursor-pointer" role="button" tabIndex={0} onClick={onClick}>
        <div className="mb-3 h-full w-full border-b-2 border-gray-100 pb-4 text-sm">
          <Link to="profile" className="font-semibold group-hover:text-primary-500">
            {user?.fullName}
          </Link>
          <Link to="profile" className="mt-1 line-clamp-1 break-all text-sm group-hover:text-primary-500">
            {user?.email}
          </Link>
        </div>
      </div>
      <div
        className="mt-1 flex w-full items-center hover:text-red-600"
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <FiSettings />
        <p className="ml-3 text-sm">
          <Link to="dashboard">{t("dashboard")}</Link>
        </p>
      </div>
      <div
        className="mt-2 flex w-full items-center hover:text-red-600"
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <FiHelpCircle />
        <Link to="help">
          <p className="ml-3 text-sm">{t("helpAndContact")}</p>
        </Link>
      </div>
      <div
        className="mt-4 flex w-full items-center border-t-2 border-gray-100 pt-3 hover:text-red-600"
        role="button"
        tabIndex={0}
        onClick={handleClickLogout}
      >
        {isSubmitting ? (
          <div className="h-4 w-4 animate-spin rounded-full border border-slate-700 border-t-transparent" />
        ) : (
          <FiLogOut />
        )}
        <div className="ml-3 text-sm">{t("logOut")}</div>
      </div>
    </>
  );
};
export default memo(HeaderUserDropdownItem);
