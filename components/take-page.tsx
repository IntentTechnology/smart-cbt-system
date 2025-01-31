"use client";
import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useProfile } from "@/lib/ProfileContext";
import { Avatar, AvatarImage } from "./ui/avatar";
import Logo from "./logo";
import FullPageLoader from "./FullPageLoader";
interface Question {
  id: string;
  examId: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
  createdAt: string;
  updatedAt: string;
}

interface ExamData {
  message: string;
  data: Question[];
  length: number;
}

const TakeExam = ({
  id,
  getSignalExam,
}: {
  id: string;
  getSignalExam: any;
}) => {
  const { profile } = useProfile();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userResponse, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(7200); // 2 hours in seconds
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Fetch exam questions
  useEffect(() => {
    const fetchExamQuestions = async () => {
      try {
        const response = await fetch(
          "https://smart-cbt.onrender.com/api/smart_cbt/get_exam_questions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              examId: id,
              numOfQuestions: "4",
              userId: profile?.data.userId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exam questions");
        }

        const data: ExamData = await response.json();
        if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
          throw new Error("Invalid exam data received");
        }

        setExamData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exam questions:", error);
        toast({
          title: "Error",
          description: "Failed to load exam questions. Please try again.",
          variant: "destructive",
        });
        router.push("/exams");
      }
    };

    fetchExamQuestions();
  }, [id, router]);

  // Timer functionality
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Load captured image from local storage
  useEffect(() => {
    const storedImage = localStorage.getItem("examCapturedImage");
    if (storedImage) {
      setCapturedImage(storedImage);
    }
  }, []);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const submitExam = async () => {
    if (!examData) return;

    const questions = Object.entries(userResponse).map(
      ([questionId, userResponse]) => ({
        questionId,
        userResponse,
      })
    );

    const submissionData = {
      userId: profile?.data.userId,
      examId: id,
      subject: getSignalExam.subject,
      questions,
    };
    console.log(submissionData, "data");
    try {
      setSubmitting(true);
      const response = await fetch(
        "https://smart-cbt.onrender.com/api/smart_cbt/submit_exam",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: profile?.data.userId,
            examId: id,
            subject: getSignalExam.subject,
            questions,
          }),
        }
      );

      //   if (!response.ok) {
      //     throw new Error("Failed to submit exam");
      //   }

      const result = await response.json();
      if (result.message === "Exam submitted successfully") {
        toast({
          title: "Submitted Success",
          description: result?.message,
        });
        router.push(`/exams/${id}/results`);
      } else {
        toast({
          title: result?.message,
          description: "Failed to submit exam. Please try again.",
          variant: "destructive",
        });
      }
      console.log("Exam submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting exam:", error);
      //   toast({
      //     title: "Error",
      //     description: "Failed to submit exam. Please try again.",
      //     variant: "destructive",
      //   });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (!examData) return;
    submitExam();
  };

  const getQuestionStatus = (index: number) => {
    if (!examData) return "unanswered";
    if (index === currentQuestion) return "current";
    if (userResponse[examData.data[index].id]) return "answered";
    return "unanswered";
  };

  if (loading || !examData || !examData.data || examData.data.length === 0) {
    return (
      <div className="">
        <FullPageLoader />
      </div>
    );
  }

  const currentQuestionData = examData.data[currentQuestion];

  if (!currentQuestionData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error loading question data</div>
      </div>
    );
  }
  return (
    <div className="container lg:mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
        {/* <Button variant="outline" asChild>
          <Link href="/exams">← Go Back</Link>
        </Button> */}
        <Logo width={170} height={170} />
        <div>
          <h1 className="text-2xl text-[#121212] font-bold text-center">
            {getSignalExam.subject} - Exam
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <Button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-purple-700"
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>

      <div className="bg-white flex  flex-col-reverse lg:flex-row items-start justify-start lg:justify-between lg:items-center rounded-lg shadow-md p-5 md:p-10 space-y-6">
        <div className="flex flex-col gap-4 mt-8 lg:mt-0">
          {" "}
          <div className="text-xl font-semibold">
            Question {currentQuestion + 1}.
          </div>
          <div className="text-gray-700">{currentQuestionData.question}</div>
          <RadioGroup
            onValueChange={(value) =>
              handleAnswer(currentQuestionData.id, value)
            }
            value={userResponse[currentQuestionData.id] || ""}
            className="space-y-4"
          >
            {Object.entries(currentQuestionData.options).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <RadioGroupItem value={key} id={`option-${key}`} />
                <label htmlFor={`option-${key}`} className="text-gray-700">
                  {value}
                </label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex lg:hidden mt-5 gap-2 justify-start lg:justify-end items-center">
            <Button
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              disabled={currentQuestion === 0}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
              disabled={currentQuestion === examData.data.length - 1}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Next
            </Button>
          </div>
        </div>
        <div>
          <div className="text-xl flex justify-between items-center font-bold">
            <p>Time Left: </p>{" "}
            <span className="text-3xl text-green-500">
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:justify-end pt-10 items-center gap-5">
            <div className="space-y-4">
              <div className="text-lg font-semibold">
                Recent Profile Picture
              </div>
              {profile?.data.profilePhotoUrl && (
                <Avatar className="h-60 w-60 rounded-lg ">
                  <AvatarImage
                    src={profile?.data.profilePhotoUrl || "/placeholder.svg"}
                    alt="profile picture"
                  />
                </Avatar>
              )}
            </div>

            <div className="space-y-4">
              <div className="text-lg font-semibold">Captured Image:</div>
              {capturedImage && (
                <Avatar className="h-60 w-60 rounded-lg ">
                  <AvatarImage
                    src={capturedImage || "/placeholder.svg"}
                    alt="profile picture"
                  />
                </Avatar>
              )}
            </div>
          </div>
          <div className="hidden lg:flex mt-5 gap-2 justify-start lg:justify-end items-center">
            <Button
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              disabled={currentQuestion === 0}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
              disabled={currentQuestion === examData.data.length - 1}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {examData.data.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentQuestion(index)}
            className={cn(
              "w-10 h-10 rounded-full",
              getQuestionStatus(index) === "current" &&
                "bg-blue-500 hover:bg-blue-600",
              getQuestionStatus(index) === "answered" &&
                "bg-purple-600 hover:bg-purple-700",
              getQuestionStatus(index) === "unanswered" &&
                "bg-orange-500 hover:bg-orange-600"
            )}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <video
        ref={videoRef}
        style={{ display: "none" }}
        autoPlay
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width="640"
        height="480"
      />
    </div>
  );
};

export default TakeExam;
