import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const  DashboardSkeleton=()=> {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      {/* <header className="border-b">
        <div className="container flex h-16 items-center gap-4">
          <Skeleton className="h-8 w-32" />
          <nav className="flex gap-4 ml-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </nav>
          <Skeleton className="h-8 w-8 rounded-full ml-auto" />
        </div>
      </header> */}

      <main className="container py-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-6 space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-16" />
            </Card>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          {/* Overview Section */}
          <Card className="p-6 space-y-4">
            <Skeleton className="h-6 w-24" />
            <div className="aspect-[2/1] rounded-lg bg-muted/10">
              <Skeleton className="h-full w-full" />
            </div>
          </Card>

          {/* Recent Exams Section */}
          <Card className="p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
export default DashboardSkeleton