import { memo } from "react";
import dayjs from "dayjs";
import TeamLogoAndName from "src/features/AppComponents/TeamLogoAndName";

import { FixtureDataType } from "@interfaces/Common/fixrureType";
import { TeamLogoAndNameEnum } from "@enums/commonEnum";

interface HomeFixtureItemProps {
  fixture: FixtureDataType;
}

const HomeFixtureItem = ({ fixture }: HomeFixtureItemProps) => {
  return (
    <div className="xs:px-2 md:px-10 w-full group">
      <div className="w-full h-28 flex border-b group-last:border-b-0">
        <div className="xs:w-1/6 md:w-28 font-semibold xs:text-sm md:text-base flex xs:text-center md:text-start items-center text-ellipsis break-words line-clamp-2">
          {dayjs(fixture?.start_time).format("HH:mm DD/MM")}
        </div>
        <div className="xs:w-5/6 md:flex-auto py-6 ">
          <div className="w-full grid grid-cols-9 h-full border-l md:px-0 xs:px-4 items-center">
            <div className="col-span-4 h-full flex items-center justify-end">
              <TeamLogoAndName
                teamNameClassName="font-semibold xs:text-xs md:text-base text-end text-ellipsis xs:line-clamp-2 md:line-clamp-1 xs:h-fit md:h-6 break-words"
                type={TeamLogoAndNameEnum.NAME_TO_LOGO}
                team={fixture.host_team}
                containerClassName="w-fit"
              />
            </div>
            <div className="col-span-1 flex justify-center items-center h-full text-sm">VS</div>
            <div className="col-span-4 h-full flex justify-start items-center ">
              <TeamLogoAndName
                teamNameClassName="font-semibold xs:text-xs md:text-base text-start text-ellipsis xs:line-clamp-2 md:line-clamp-1 xs:h-fit md:h-6 break-words"
                type={TeamLogoAndNameEnum.LOGO_TO_NAME}
                team={fixture.guest_team}
                containerClassName="w-fit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(HomeFixtureItem);
