import { Metadata } from "next";
import { ExamList } from "@/components/exam-list";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import Image from "next/image";
import BookIcon from "@/public/Images/book-icon.svg";
import { MobileNav } from "@/components/mobile-nav";

export const metadata: Metadata = {
  title: "Exams",
  description: "List of available exams.",
};

export default function ExamsPage() {
  return (
    <div className=" flex-col flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className=" mr-auto flex md:hidden items-center">
            <MobileNav />
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-2 md:p-8 pt-6">
        <div className="flex items-center gap-2 border-b pb-5 space-y-2">
          <Image src={BookIcon} alt="book icon" />
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Examinations
            </h2>
            <p className="text-[#6B6D70] text-[16px]">
              Take an examination here
            </p>
          </div>
        </div>
        <div className=" h-full flex-1 flex-col space-y-8 flex">
          <ExamList />
        </div>
      </div>
    </div>
  );
}
