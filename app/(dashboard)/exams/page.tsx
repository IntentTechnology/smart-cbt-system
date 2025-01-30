import { Metadata } from "next";
import { ExamList } from "@/components/exam-list";

import Image from "next/image";
import BookIcon from "@/public/Images/book-icon.svg";
import { getExams } from "@/lib/get-services";

export const metadata: Metadata = {
  title: "Exams",
  description: "List of available exams.",
};

export default async function ExamsPage() {
  const allExams = await getExams();
  return (
    <div className=" flex-col flex">
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
          <ExamList allExams={allExams} />
        </div>
      </div>
    </div>
  );
}
