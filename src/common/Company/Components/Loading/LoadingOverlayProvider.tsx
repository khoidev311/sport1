import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { ConfigKeyEnum } from "../../../../app/Enums/configEnum";
import { useConfig, useSelector } from "../../Hooks";
import LoadingSpinnerSVG from "./LoadingSpinnerSVG";

const LoadingOverlayProvider = () => {
  const ids = useSelector((state) => state.common.loadingOverlayIds);

  const config = useConfig();
  const logoSrc = config(ConfigKeyEnum.LOGO);
  const loadingText = config(ConfigKeyEnum.APP_DESCRIPTION);
  const loadingName = config(ConfigKeyEnum.APP_NAME);

  return (
    <div
      className={twMerge(
        "fixed inset-0 z-50 flex items-center justify-center bg-white",
        !ids?.length && "hidden",
      )}
    >
      <div className="relative flex w-screen flex-col items-center justify-center">
        <div
          className={twMerge(
            "flex w-4/5 -translate-y-16 flex-col items-center justify-center opacity-0 duration-200",
            (logoSrc || loadingText) && "-translate-y-6 opacity-100",
          )}
        >
          <div className="text-6xl text-center font-semibold w-full text-app">{loadingName}</div>
          <div className="text-center">{loadingText}</div>
        </div>
        <div
          className={twMerge(
            "-translate-y-12 duration-100",
            (logoSrc || loadingText) && "translate-y-2 opacity-100",
          )}
        >
          <LoadingSpinnerSVG />
        </div>
      </div>
    </div>
  );
};

export default memo(LoadingOverlayProvider);
