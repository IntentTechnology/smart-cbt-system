import DashboardApplication from "@/components/DashboardApplication";
import Navbar from "@/components/nav-bar";
import { getExams, getExamsResult, getProfile } from "@/lib/get-services";
import { ProfileProvider } from "@/lib/ProfileContext";
import { getSession } from "@/lib/session";
import React from "react";

async function Layout({ children }: { children: React.ReactNode }) {
  const credentials = await getSession();
  console.log(credentials);
  const profile = await getProfile(credentials?.id);
  const getAllExams = await getExams();
  const examResults = await getExamsResult(credentials?.id);

  return (
    <DashboardApplication
      profile={profile}
      credentials={credentials}
      getAllExams={getAllExams}
      examResults={examResults}
    >
      {children}
    </DashboardApplication>
  );
}

export default Layout;
