"use client";
import React from "react";
import Image from "next/image";
import LockIcon from "@/public/Images/lock-icon.svg";
import AuthBanner from "@/public/Images/user-auth-banner.svg";
import Link from "next/link";
import Logo from "@/components/logo";
import { usePathname } from "next/navigation";
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="container relative  h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-[100vh] lg:flex-col gap-20 bg-[#FAFAFA] p-10 text-black dark:border-r lg:flex">
          <div className="flex flex-col mt-10 gap-4">
            <Logo />
            <div className="relative z-20 max-w-[400px] mx-auto">
              <p className="text-md text-center text-[#121212] text-muted-foreground font-bold">
                Your ultimate platform for seamless, efficient, and reliable CBT
                examinations.
              </p>
            </div>
          </div>

          <div className="flex justify-center  items-center">
            <Image src={AuthBanner} width={500} alt="a person taking an exam" />
          </div>
        </div>
        {/* login */}
        <div className="lg:p-5">
          <div className=" px-4 mb-10  flex lg:hidden flex-col mt-20 gap-1">
            <Logo />
            <div className="relative z-20 max-w-[250px] mx-auto">
              <p className="text-xs text-center text-[#121212] text-muted-foreground ">
                Your ultimate platform for seamless, efficient, and reliable CBT
                examinations.
              </p>
            </div>
          </div>
          <div className=" px-4  lg:mx-auto flex  flex-col justify-center space-y-6 w-full lg:w-[450px]">
            <div className="  flex self-center lg:self-center p-[15px] bg-[#F4EBFD] rounded-xl">
              <Image src={LockIcon} width={20} alt="lock icon" />
            </div>
            <div className="flex flex-col space-y-2 tx lg:text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {pathname === "/" ? "Login to" : "Register"} your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            {children}

            <p className=" flex justify-between  text-center text-sm text-muted-foreground">
              <Link
                href={pathname === "/" ? "/register" : "/"}
                className="underline font-bold underline-offset-4 hover:text-primary"
              >
                {pathname === "/" ? "Create an Account" : "Login"}
              </Link>
              <Link
                href="/forgot"
                className="underline font-bold underline-offset-4 hover:text-primary"
              >
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthWrapper;
