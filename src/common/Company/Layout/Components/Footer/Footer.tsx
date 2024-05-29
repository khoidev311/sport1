import { memo } from "react";
import { useTranslation } from "react-i18next";

import { Logo } from "@components/Logo";
import { ConfigKeyEnum } from "@enums/configEnum";

import { commonSelector } from "../../../../../app/Selectors";
import { useSelector } from "../../../Hooks";
import FooterSocialIcon from "./SocialIcon";

const Footer = () => {
  const { t } = useTranslation();
  const appNameConfigValue = useSelector(commonSelector.appNameConfigSelector);
  const config = useSelector(commonSelector.configSelector);

  return (
    <div
      className="relative z-40 mx-auto overflow-hidden border-t-2 border-gray-100 bg-white px-3 sm:px-6 lg:px-8 xl:px-36"
      id="footer"
    >
      <div className="relative z-10 grid gap-x-10 py-4 sm:grid-cols-2 sm:py-6 md:grid-cols-3 md:py-10">
        <div className="">
          <div className="mt-1.5">
            <Logo imageClassName="h-10" />
          </div>
          <div className="mt-6 max-w-xs font-semibold">{appNameConfigValue}</div>
          <div className="mt-1">{config[ConfigKeyEnum.APP_DESCRIPTION] as string}</div>
        </div>
      </div>
      <div className="relative z-10 my-2 items-center justify-between border-t-2 border-gray-100 py-4 md:flex">
        <div className="text-center md:text-left">
          &copy; {appNameConfigValue} 2024. {t("reserved")}
        </div>
        <FooterSocialIcon className="mt-4 flex justify-center gap-x-3 md:mt-0 md:justify-start md:gap-x-4" />
      </div>
    </div>
  );
};

export default memo(Footer);
