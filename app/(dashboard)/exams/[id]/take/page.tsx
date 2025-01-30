import TakeExam from "@/components/take-page";
import { getExams } from "@/lib/get-services";

export default async function TakeExamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const exam = await getExams();
  const id = (await params).id;
  const getSignalExam = exam.data.find((i:any) => i.id === id);
 
  return <TakeExam id={id} getSignalExam={getSignalExam} />;
}
