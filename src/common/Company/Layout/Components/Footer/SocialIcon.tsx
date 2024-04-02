import { memo } from "react";

import { ConfigKeyEnum } from "../../../../../app/Enums";
import { SocialIcon } from "../../../Components";
import { useConfig } from "../../../Hooks";

interface FooterSocialIconProps {
  className?: string;
}

const FooterSocialIcon = ({ className }: FooterSocialIconProps) => {
  const getConfig = useConfig();

  return (
    <div className={className}>
      <a href={`tel:${getConfig(ConfigKeyEnum.FOOTER_PHONE)}`} target="_blank" rel="noreferrer">
        <div className=" flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-green-600 shadow-md duration-200 hover:bg-green-600 hover:text-white">
          <SocialIcon hostname="phone" size={20} />
        </div>
      </a>
      <a href={`mailto:${getConfig(ConfigKeyEnum.FOOTER_EMAIL)}`} target="_blank" rel="noreferrer">
        <div className=" flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-primary-500 shadow-md duration-200 hover:bg-primary-500 hover:text-white">
          <SocialIcon hostname="email" size={20} />
        </div>
      </a>
      <a href={getConfig(ConfigKeyEnum.FOOTER_FACEBOOK)} target="_blank" rel="noreferrer">
        <div className=" flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-blue-500 shadow-md duration-200 hover:bg-blue-500 hover:text-white">
          <SocialIcon hostname="facebook" size={20} />
        </div>
      </a>
      <a href={getConfig(ConfigKeyEnum.FOOTER_INSTAGRAM)} target="_blank" rel="noreferrer">
        <div className=" flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-purple-600 shadow-md duration-200 hover:bg-purple-600 hover:text-white">
          <SocialIcon hostname="instagram" size={20} />
        </div>
      </a>
      <a href={getConfig(ConfigKeyEnum.FOOTER_TWITTER)} target="_blank" rel="noreferrer">
        <div className=" flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-cyan-500 shadow-md duration-200 hover:bg-cyan-500 hover:text-white">
          <SocialIcon hostname="twitter" size={20} className="mt-1" />
        </div>
      </a>
      <a href={getConfig(ConfigKeyEnum.FOOTER_LINKEDIN)} target="_blank" rel="noreferrer">
        <div className=" flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-blue-500 shadow-md duration-200 last:mr-0 hover:bg-blue-500 hover:text-white">
          <SocialIcon hostname="linkedin" size={20} />
        </div>
      </a>
    </div>
  );
};

export default memo(FooterSocialIcon);
