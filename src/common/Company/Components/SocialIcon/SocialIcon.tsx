import React, { memo } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhoneCall,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { IconBaseProps } from "react-icons/lib";
import { RiSoundcloudLine, RiTelegramLine } from "react-icons/ri";

export interface SocialIconProps extends IconBaseProps {
  hostname: string;
  children?: React.ReactNode;
}

const SocialIcon = ({ hostname, children, ...props }: SocialIconProps) => {
  const icons = {
    facebook: <FiFacebook />,
    youtube: <FiYoutube />,
    email: <FiMail />,
    twitter: <FiTwitter />,
    instagram: <FiInstagram />,
    soundcloud: <RiSoundcloudLine />,
    linkedin: <FiLinkedin />,
    whatsapp: <AiOutlineWhatsApp />,
    telegram: <RiTelegramLine />,
    phone: <FiPhoneCall />,
    default: <HiOutlineGlobeAlt />,
  };

  return React.cloneElement(icons[hostname as keyof typeof icons] || icons.default, { ...props }, children);
};

export default memo(SocialIcon);
