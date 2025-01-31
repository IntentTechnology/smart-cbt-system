"use client";
import React, { useEffect, useState } from "react";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { UserNav } from "./user-nav";
import { usePathname } from "next/navigation";
import { MobileNav } from "./mobile-nav";
import Logo from "./logo";
import { getSession } from "@/lib/session";
import FullPageLoader from "./FullPageLoader";

const Navbar = ({ credentials }: any) => {
  const pathname = usePathname();
  if (pathname.includes("/take")) {
    return <></>;
  }

  return (
    <header className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="border-b ">
        <div className="flex h-16 items-center px-4">
          <Logo width={120} height={120} />
          <MainNav className="mx-6" />
          <div className=" mr-auto flex md:hidden items-center">
            <MobileNav />
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
            <UserNav credentials={credentials} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
