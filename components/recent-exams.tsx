import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
export function RecentExams({ getStats }: any) {
  return (
    <div className="space-y-8 w-full">
      {getStats.data.recentExams.length > 0 &&
        getStats.data.recentExams.map((i: any, index: number) => (
          <div key={index} className="flex items-center">
            {/* <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar> */}
            <div className=" space-y-1">
              <p className="text-sm font-medium leading-none">{i.subject}</p>
              <p
                className={`text-sm text-center ${
                  i.examScoreStatus === "Fail" ? "bg-red-500" : "bg-green-500"
                } text-white px-2 py-1 rounded`}
              >
                {i.examScoreStatus}
              </p>
            </div>
            <div className="ml-auto font-medium">{i.examScore}</div>
          </div>
        ))}

      {getStats.data.recentExams.length === 0 && (
        <div className=" mt-10 flex gap-5 justify-center flex-col items-center">
          <Image src="/Images/noee.svg" width={140} height={140} alt="" />
          <div className="text-center text-gray-500">
            No recent exams available.
          </div>
          <Link href={"/exams"} passHref>
            <Button>Take Exam</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
