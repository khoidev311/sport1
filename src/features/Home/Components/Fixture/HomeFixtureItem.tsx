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
    <div className="px-10 w-full group">
      <div className="w-full h-28  flex border-b group-last:border-b-0">
        <div className="w-28 font-semibold flex justify-start items-center">
          {dayjs(fixture?.start_time).format("HH:mm DD/MM")}
        </div>
        <div className="flex-auto py-6">
          <div className="w-full grid grid-cols-9 h-full border-l items-center">
            <div className="col-span-4 h-full flex items-center justify-end">
              <TeamLogoAndName
                teamNameClassName="font-semibold text-md"
                type={TeamLogoAndNameEnum.NAME_TO_LOGO}
                team={fixture.host_team}
                containerClassName="w-fit"
              />
            </div>
            <div className="col-span-1 flex justify-center items-center h-full text-sm">VS</div>
            <div className="col-span-4 h-full flex justify-start items-center ">
              <TeamLogoAndName
                teamNameClassName="font-semibold text-md"
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
