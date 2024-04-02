import _ from "lodash";
import { ReactNode, memo, useRef } from "react";
import { Link } from "react-router-dom";

import { Logo } from "@components/Logo";

import { useSelector } from "../../../Hooks";
import HeaderUserDropdown from "./HeaderUserDropdown";
import HeaderLanguageSelector from "./LanguageSelector";
import HeaderLoginButton from "./LoginButton";
import LayoutHeaderNavbar from "./Navbar";

interface LayoutHeaderProps {
  prefix?: ReactNode;
}

const LayoutHeader = ({ prefix }: LayoutHeaderProps) => {
  const user = useSelector((state) => state.common.user);

  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky top-0 z-50 h-16 w-full bg-white shadow-md" ref={headerRef}>
      <div className="flex h-full w-full justify-between px-8">
        <div className="flex items-center justify-start">
          {prefix}
          <Link to="/" className="flex h-full flex-shrink-0 items-center">
            <Logo imageClassName="h-full" className="h-10" />
          </Link>
          <LayoutHeaderNavbar />
        </div>
        <div className="flex h-full w-fit items-center space-x-6">
          <HeaderLanguageSelector />
          {_.isEmpty(user) ? <HeaderLoginButton /> : <HeaderUserDropdown />}
        </div>
      </div>
    </div>
  );
};
export default memo(LayoutHeader);
