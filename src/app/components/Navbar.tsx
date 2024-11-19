"use client";

import logo from "../Icons/logo.png";
import Image from "next/image";
import { ErrorIcon } from "./ErrorIcon";
import { NotificationIcon } from "./NotificationIcon";
import { SearchIcon } from "./SearchIcon";
import { ArrowIcon } from "./ArrowIcon";

export const Navbar: React.FC<{
  user: {
    firstName: string;
    lastName: string;
  };
}> = ({ user }) => {
  return (
    <div className="p-[24px] flex justify-between w-full border-b border-b-[#E2E8F0]">
      <Image
        className="w-[170px] h-[36px] mt-[4px] ml-[8px]"
        src={logo.src}
        width="170"
        height="36"
        alt="logo"
      />
      <div className="pr-[44px] flex items-center gap-[16px]">
        <div className="flex justify-center items-center gap-[16px]">
          <SearchIcon />
          <ErrorIcon />
          <NotificationIcon />
        </div>
        <div className="rounded-full font-inter text-[16px] font-bold bg-[#E6FFE6] radius-[50%] text-[#00B500] w-[44px] h-[44px] flex items-center justify-center">{`${user.firstName[0]}${user.lastName[0]}`}</div>
        <div className="flex items-center gap-[4px]">
          <span className="font-inter text-[16px]">{`${user.firstName} ${user.lastName}`}</span>
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
};
