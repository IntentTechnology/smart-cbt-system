import { Metadata } from "next";

import Image from "next/image";
import ChartIcon from "@/public/Images/chart-icon.svg";
import ResultsLists from "@/components/ResultsLists";
export const metadata: Metadata = {
  title: "Exam Results",
  description: "View all your exam results",
};

async function ResultsPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center gap-2 border-b pb-5 space-y-2">
          <Image src={ChartIcon} alt="chart icon" />
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Examination Results
            </h2>
            <p className="text-[#6B6D70] text-[16px]">
              View your examination result here
            </p>
          </div>
        </div>
       <ResultsLists/>
      </div>
    </div>
   
  );
}
export default ResultsPage;
