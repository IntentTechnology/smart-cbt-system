import Navbar from "@/components/nav-bar";
import { getExams, getProfile } from "@/lib/get-services";
import { ProfileProvider } from "@/lib/ProfileContext";
import { getSession } from "@/lib/session";
import React from "react";

async function Layout({ children }: { children: React.ReactNode }) {
  const credentials = await getSession();
  const profile = await getProfile(credentials?.id);
  const getAllExams = await getExams();

  return (
    <ProfileProvider profile={profile} getAllExams={getAllExams}>
      <Navbar credentials={credentials} />
      <div className="container  mx-auto">{children}</div>
    </ProfileProvider>
  );
}

export default Layout;
