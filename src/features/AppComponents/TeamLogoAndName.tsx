import { twMerge } from "tailwind-merge";
import { memo } from "react";

import { TeamDataType } from "@interfaces/Common/teamType";
import { TeamLogoAndNameEnum } from "@enums/commonEnum";

interface TeamLogoAndNameProps {
  team?: TeamDataType;
  containerClassName?: string;
  logoClassName?: string;
  teamNameClassName?: string;
  type: TeamLogoAndNameEnum;
}

const TeamLogoAndName = ({
  type,
  team,
  containerClassName,
  logoClassName,
  teamNameClassName,
}: TeamLogoAndNameProps) => {
  return (
    <div
      className={twMerge(
        "flex w-full justify-start h-full items-center gap-x-2",
        type === TeamLogoAndNameEnum.LOGO_INTO_NAME && "w-fit flex-wrap gap-0",
        containerClassName,
      )}
    >
      {type === TeamLogoAndNameEnum.LOGO_TO_NAME && (
        <>
          <img
            className={twMerge("w-8 h-8 object-scale-down", logoClassName)}
            alt={team?.name}
            src={team?.logo}
          />
          <span className={twMerge("text-sm h-8 flex text-start items-center", teamNameClassName)}>
            {team?.name}
          </span>
        </>
      )}
      {type === TeamLogoAndNameEnum.NAME_TO_LOGO && (
        <>
          <span className={twMerge("text-sm h-8 flex text-end items-center", teamNameClassName)}>
            {team?.name}
          </span>
          <img
            className={twMerge("w-8 h-8 object-scale-down", logoClassName)}
            alt={team?.name}
            src={team?.logo}
          />
        </>
      )}
      {type === TeamLogoAndNameEnum.LOGO_INTO_NAME && (
        <>
          <div className="w-full flex h-1/2 justify-center items-end">
            <img
              className={twMerge("w-8 h-8 object-scale-down", logoClassName)}
              alt={team?.name}
              src={team?.logo}
            />
          </div>
          <div className="w-full flex h-1/2 justify-center items-start">
            <span className={twMerge("text-sm h-8 flex  items-center", teamNameClassName)}>{team?.name}</span>
          </div>
        </>
      )}
    </div>
  );
};
export default memo(TeamLogoAndName);
