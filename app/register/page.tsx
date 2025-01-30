import { Metadata } from "next";
import Image from "next/image";
import LockIcon from "@/public/Images/lock-icon.svg";
import AuthBanner from "@/public/Images/user-auth-banner.svg";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { RegisterUserAuthForm } from "@/components/user-auth-register-form";
import AuthWrapper from "@/components/auth-wrapper";

export const metadata: Metadata = {
  title: "ExamEdge | Register  ",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <>
      <AuthWrapper>
        <RegisterUserAuthForm />
      </AuthWrapper>
    </>
  );
}
