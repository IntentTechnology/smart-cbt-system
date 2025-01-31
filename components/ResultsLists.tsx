"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/lib/ProfileContext";
const ResultsLists = () => {
  const { examResults } = useProfile();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {examResults?.data?.map((result: any) => (
        <Card key={result.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#36394A]">Subject:</p>
                  <p className="text-sm text-[#36394A]">Date taken:</p>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-xl">{result.subject}</h3>
                  <p>{new Date(result.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    result.examScoreStatus === "Pass" ? "passed" : "failed"
                  }
                  className="text-sm font-medium h-[29px]"
                >
                  {result.examScoreStatus}
                </Badge>
                <div
                  className={`text-xl font-semibold ${
                    result.examScoreStatus === "Pass"
                      ? "text-[#9234EA]"
                      : "text-[#DC2626]"
                  }`}
                >
                  {result.examScore}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResultsLists;
