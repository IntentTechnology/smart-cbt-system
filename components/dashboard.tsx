"use client";
import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { MainNav } from "@/components/main-nav";
import { useEffect, useState } from "react";
import { Overview } from "@/components/overview";
import { RecentExams } from "@/components/recent-exams";
import { Search } from "@/components/search";
import { UserNav } from "@/components/user-nav";
import { getFirstName, getInitials } from "@/lib/getInitialsFunction";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useProfile } from "@/lib/ProfileContext";
import { BookOpen, BookOpenCheck, PenBox } from "lucide-react";
import FullPageLoader from "./FullPageLoader";
import Link from "next/link";

const Dashboard = ({ credentials, getStats }: any) => {
  const { profile, getAllExams } = useProfile();
  const firstName = getFirstName(credentials.name);
  const initials = getInitials(credentials.name);
  return (
    <div className=" ">
    <div className=" flex-col md:flex gap-5 mt-5">
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="flex justify-between items-center">
          <div className="  flex flex-row items-center md:items-center justify-start gap-5 ">
            <div className="rounded-full">
              <Avatar className="   h-20 w-20">
                <AvatarImage
                  src={profile?.data?.profilePhotoUrl || "/default-profile.png"}
                  alt="profile picture"
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex flex-col gap-0">
              {" "}
              <h2 className="text-xl font-[700] ">Hi,{firstName} </h2>
              <p className="text-sm text-[#6B6D70] ">
                Welcome to your dashboard
              </p>
            </div>

            {/* <div className="w-fit flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              <CalendarDateRangePicker />
              <Button className="w-full self-start">Download</Button>
            </div> */}
          </div>
          <Link href={"/exams"} passHref>
            <Button>Take Exam <PenBox/></Button>
          </Link>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Exams Taken
                  </CardTitle>

                  <BookOpenCheck    className="h-8 w-8 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">
                    {getStats.data.totalExams}
                  </div>
                  {/* <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  {` (${((getStats.data.totalExams - getStats.data.lastMonthExams) / getStats.data.lastMonthExams * 100).toFixed(1)}% from last month)`}
                  </p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Available Exams
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-8 w-8  text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">
                    {getAllExams && getAllExams?.data?.length}
                  </div>
                  {/* <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card className="backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CardHeader className="flex flex-row items-center justify-between  space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Exams
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                   className="h-8 w-8  text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">
                    {getStats.data.recentExams.length}
                  </div>
                  {/* <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p> */}
                </CardContent>
              </Card>
              {/* <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Users
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card> */}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview getStats={getStats} />
                </CardContent>
              </Card>
              <Card className="col-span-4 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Exams</CardTitle>
                  <CardDescription>
                    You have taken {getStats.data.recentExams.length} exams this
                    month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentExams getStats={getStats} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
