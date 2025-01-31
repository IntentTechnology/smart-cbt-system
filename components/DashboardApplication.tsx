"use client";
import { ProfileProvider } from "@/lib/ProfileContext";
import React, { useEffect, useState } from "react";
import Navbar from "./nav-bar";
import FullPageLoader from "./FullPageLoader";

const DashboardApplication = ({
  profile,
  children,
  getAllExams,
  credentials,
  examResults,
}: {
  profile: any;
  children: React.ReactNode;
  getAllExams: any;
  examResults: any;
  credentials: any;
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // 2 seconds timer

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div>
        <FullPageLoader />
      </div>
    );
  }

  return (
    
    <ProfileProvider
      profile={profile}
      getAllExams={getAllExams}
      examResults={examResults}
    >
      <Navbar credentials={credentials} />
      <div className="max-w-[1440px]  mx-auto"> {children}</div>
    </ProfileProvider>
  );
};

export default DashboardApplication;
