import { memo } from "react";

import { Avatar } from "@components/Avatar";
import { Dropdown } from "@components/index";
import useSelector from "@hooks/useSelector";

import HeaderUserDropdownItem from "./HeaderUserDropdownItem";

const HeaderUserDropdown = () => {
  const user = useSelector((state) => state.common.user);

  return (
    <div className="h-10 w-10 rounded-full shadow-md">
      <Dropdown menu={<HeaderUserDropdownItem />}>
        <Avatar src={user?.avatar} alt={user?.email} className="h-10 w-10" />
      </Dropdown>
    </div>
  );
};
export default memo(HeaderUserDropdown);
