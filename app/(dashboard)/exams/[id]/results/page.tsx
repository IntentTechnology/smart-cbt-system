import SingleResultComponent from "@/components/SingleResultComponent";
import { getSingleExamResult } from "@/lib/get-services";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Exam Results",
  description: "View your exam results.",
};

export default async function ExamResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  // In a real application, you would fetch the results based on the exam ID and user
  const results = await getSingleExamResult(id);
 console.log(results)
  return (
    <div>
      <SingleResultComponent results={results} />
    </div>
  );
}
