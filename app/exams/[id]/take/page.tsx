"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

// Mock exam data
const examData = {
  id: "exam123",
  title: "Mathematics 101",
  questions: [
    {
      id: "q1",
      text: "What is 2 + 2?",
      options: [
        { id: "a", text: "3" },
        { id: "b", text: "4" },
        { id: "c", text: "5" },
        { id: "d", text: "6" },
      ],
    },
    {
      id: "q2",
      text: "What is the square root of 16?",
      options: [
        { id: "a", text: "2" },
        { id: "b", text: "4" },
        { id: "c", text: "8" },
        { id: "d", text: "16" },
      ],
    },
    // Add more questions as needed
  ],
};

export default function TakeExamPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((videoStream) => {
          stream = videoStream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play();
              // Capture image after a short delay to ensure video is playing
              setTimeout(captureImage, 1000);
            };
          }
        })
        .catch((err) => console.error("Error accessing the camera:", err));
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);
        console.log("Image captured automatically");
      }
    } else {
      console.error("Failed to capture image automatically");
    }
  };

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleNext = () => {
    if (currentQuestion < examData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the answers and captured image to your backend
    console.log("Submitting answers:", answers);
    console.log("Captured image:", capturedImage);
    router.push(`/exams/${examData.id}/results`);
  };

  const question = examData.questions[currentQuestion];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b gap-4 md:gap-0 pb-8 mb-8">
        <Button variant={"outline"}>
          <Link href={"/exams"}>Go Back</Link>
        </Button>
        <h2 className="text-xl font-bold">{examData.title} - Exam</h2>
        <Button className="hidden md:block" onClick={handleSubmit}>Submit</Button>
      </div>
      <Card className="w-full p-5 flex flex-col justify-between max-w-4xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <div>
            <CardHeader className="space-y-2">
              <CardDescription className="font-semibold text-[#36394A] text-lg">
                Question {currentQuestion + 1} of {examData.questions.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <form>
                    <div className="space-y-4">
                      <Label className="text-[#6B6D70] text-base font-medium">
                        {question.text}
                      </Label>
                      <RadioGroup
                        onValueChange={(value) =>
                          handleAnswer(question.id, value)
                        }
                        value={answers[question.id]}
                      >
                        {question.options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Label htmlFor={option.id}>{option.text}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </div>
          {capturedImage && (
            <div>
              <p className="mb-2 font-semibold text-lg text-[#121212]">
                Captured Image:
              </p>
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full max-w-sm h-auto rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
        <div className="mt-8 flex gap-5">
          <div className="flex w-full items-end justify-end gap-3">
            <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </Button>
            {currentQuestion < examData.questions.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleSubmit}>Submit</Button>
            )}
          </div>
        </div>
      </Card>
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
}
