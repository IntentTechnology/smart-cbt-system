import { Metadata } from "next";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import ChartIcon from "@/public/Images/chart-icon.svg";
import { getExamsResult } from "@/lib/get-services";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Exam Results",
  description: "View all your exam results",
};



async function ResultsPage() {
  const credentials = await getSession();
  const examResults = await getExamsResult(credentials?.id);
  console.log(examResults);
  return (
    // <div className="flex flex-col min-h-screen">
    //   <div className="flex-1 space-y-4 p-8 pt-6">
    //     <div className="flex items-center gap-2 border-b pb-5 space-y-2">
    //       <Image src={ChartIcon} alt="chart icon" />
    //       <div>
    //         <h2 className="text-xl font-semibold tracking-tight">
    //           Examination Results
    //         </h2>
    //         <p className="text-[#6B6D70] text-[16px]">
    //           View your examination result here
    //         </p>
    //       </div>
    //     </div>
    //     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    //       {examResults.data.map((result:any) => (
    //         <Card key={result.id} className="overflow-hidden">
    //           <CardContent className="p-6">
    //             <div className="space-y-4">
    //               <div className="space-y-2">
    //                 <div className="flex items-center justify-between">
    //                   <p className="text-sm text-[#36394A]">Subject:</p>
    //                   <p className="text-sm text-[#36394A]">Date taken:</p>
    //                 </div>
    //                 <div className="flex items-center justify-between">
    //                   <h3 className="font-semibold text-xl">{result.subject}</h3>
    //                   <p className="font-semibold text-sm">{result.createdAt}</p>
    //                 </div>
    //               </div>
    //               <div className="flex items-center justify-between">
    //                 <Badge
    //                   variant={result.status === "Passed" ? "passed" : "failed"}
    //                   className="text-sm font-medium h-[29px]"
    //                 >
    //                   {result.status}
    //                 </Badge>
    //                 <div
    //                   className={`text-xl font-semibold ${
    //                     result.status === "Passed"
    //                       ? "text-[#9234EA]"
    //                       : "text-[#DC2626]"
    //                   }`}
    //                 >
    //                   {result.score}%
    //                 </div>
    //               </div>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <>result</>
  );
}
export default ResultsPage;
