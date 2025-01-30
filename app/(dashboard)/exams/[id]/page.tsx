import { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Exam Details",
  description: "Details of a specific exam.",
}

export default  async  function ExamDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  // In a real application, you would fetch the exam details based on the ID
  const exam = {
    id: id,
    subject: "Mathematics 101",
    date: "2023-12-25",
    status: "Scheduled",
    duration: 120,
    description: "This exam covers basic algebra, geometry, and trigonometry.",
    instructor: "Dr. Jane Smith",
  }

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{exam.subject}</h2>
          <div className="flex items-center space-x-2">
            <Button>Start Exam</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Exam ID
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{exam.id}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{exam.date}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{exam.status}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{exam.duration} minutes</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Exam Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{exam.description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{exam.instructor}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please ensure you have a stable internet connection before starting the exam.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

