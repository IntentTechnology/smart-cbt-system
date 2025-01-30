"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Row } from "@tanstack/react-table";
import { Exam } from "./exam-list";
import Image from "next/image";
import CopyIcon from "@/public/Images/copy-icon.svg";
import { useState } from "react";
import { useProfile } from "@/lib/ProfileContext";
import { ProfilePhotoUpload } from "./ProfileUpdatePopUp";
import { useRouter } from "next/navigation";
interface ExamCardProps {
  row: Exam;
  onTakeExam: any;
}

export function ExamCard({ row, onTakeExam }: ExamCardProps) {
  const router = useRouter();
  const { profile } = useProfile();
  const exam = row;
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleTakeExam = () => {
    if (!profile?.data.profilePhotoUrl) {
      setIsOpen(true);
    } else {
      onTakeExam(exam.id);
    }
  };

  return (
    <>
      <ProfilePhotoUpload
        profile={profile}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <Card className="flex flex-col">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center border-b pb-4">
            <div className="space-y-5">
              <div>
                <p className="text-[#36394A] text-sm">Subject:</p>
                <h3 className="text-[#0A0A0E] font-semibold text-xl">
                  {exam?.subject}
                </h3>
              </div>
              <div>
                <p className="text-[#36394A] text-sm">Date:</p>
                <p className="text-sm text-[#121212] font-semibold">
                  {new Date(exam?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <div
                onClick={() => {
                  navigator.clipboard.writeText(exam.id);
                  setToggle(true);
                }}
                className="flex items-center gap-1 md:px-[14px] py-[6px] bg-[#EBECED] rounded-full cursor-pointer"
              >
                <Image src={CopyIcon} alt="copy icon" />
                <p className="text-[#36394A] text-[10px] md:text-sm font-medium">
                  {toggle ? "Copied" : "Copy exam ID"}
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex flex-col md:flex-row gap-1 md:gap-3 justify-between items-center">
                  <p className="text-[#36394A] text-sm"> Duration:</p>
                  <span className="text-sm text-[#121212] font-semibold">
                    {exam.duration} mins
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-auto">
          {/* <Badge
          variant={exam.status === "Scheduled" ? "destructive" : "secondary"}
          className="h-[29px] text-sm font-medium"
        >
          {exam.status}
        </Badge> */}
          <Button
            onClick={handleTakeExam}
            className="max-w-[135px] max-h-[52px] h-full px-7 py-4 text-[#FFFFFF] text-base font-semibold"
          >
            Take Exam
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
