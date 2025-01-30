import { Metadata } from "next";

import Dashboard from "@/components/dashboard";
import { getSession } from "@/lib/session";
import { getExamsStats } from "@/lib/get-services";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
  const credentials = await getSession();
  // console.log(credentials)
  const getStats = await getExamsStats(credentials?.id)
  return (
    <>
      <Dashboard credentials={credentials} getStats={getStats}  />
    </>
  );
}
