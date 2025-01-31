"use client";
import React from "react";

import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MobileNav } from "@/components/mobile-nav";
import Link from "next/link";
const SingleResultComponent = ({ results }: any) => {
  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
          <Button  asChild>
          <Link href="/dashboard">← Go Back</Link>
        </Button>
        {/* <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Exam Results</h2>
          <div className="flex items-center space-x-2">
            <Button>Download Results</Button>
          </div>
        </div> */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{results?.examScore}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Correct Answers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {results?.correctAnswers}/{results?.totalQuestions}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{results?.duration}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{results?.subject}</div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Detailed Results</CardTitle>
            <CardDescription>
              Review your answers for each question
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Your Answer</TableHead>
                  <TableHead>Correct Answer</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results?.questions.map(
                  (question: {
                    id: string;
                    question: string;
                    userResponse: string;
                    correctAnswer: string;
                    isCorrect: boolean;
                  }) => (
                    <TableRow key={question.id}>
                      <TableCell>{question.question}</TableCell>
                      <TableCell>{question.userResponse}</TableCell>
                      <TableCell>{question?.correctAnswer}</TableCell>
                      <TableCell>
                        {question.isCorrect ? "Correct" : "Incorrect"}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleResultComponent;
