import { Metadata } from "next";
import { ExamList } from "@/components/exam-list";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";

export const metadata: Metadata = {
  title: "Exams",
  description: "List of available exams.",
};

export default function ExamsPage() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Exams</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <ExamList />
        </div>
      </div>
    </div>
  );
}
