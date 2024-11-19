"use client";

import Image from "next/image";
import mainIcon from "../Icons/mainIcon.png";
import { Header } from "./Header";

export const Main = () => {
  return (
    <div className="bg-secondaryWhite h-screen flex-[4]">
      <Header />
      <main className="flex items-center justify-center flex-col pt-8">
        <Image
          src={mainIcon.src}
          alt="mainIcon"
          width="411"
          height="411"
          layout="intrinsic"
        />
        <div className="flex items-center justify-center gap-6 flex-col pt-12 px-[40px]">
          <h2 className="text-[32px] font-inter font-bold leading-snug">
            Let Free Your Creativity with Our Intuitive Content Creator
          </h2>
          <p className="text-[16px] font-inter font-normal text-[#64748B]">
            No design degree is required! Effortlessly craft and design stunning
            and captivating content using our user-friendly creative editor.
            With our drag-and-drop technology, anyone can create amazing
            marketing materials in.
          </p>
        </div>
      </main>
    </div>
  );
};
