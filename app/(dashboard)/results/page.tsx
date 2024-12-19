import { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Exam Results",
  description: "View all your exam results",
}

// Mock data for exam results
const examResults = [
  { id: 1, name: "Mathematics 101", date: "2023-05-15", score: 85, status: "Passed" },
  { id: 2, name: "Physics 201", date: "2023-06-02", score: 78, status: "Passed" },
  { id: 3, name: "Chemistry 301", date: "2023-06-20", score: 92, status: "Passed" },
  { id: 4, name: "Biology 102", date: "2023-07-05", score: 68, status: "Failed" },
  { id: 5, name: "Computer Science 401", date: "2023-07-18", score: 88, status: "Passed" },
]

export default function ResultsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div> */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Exam Results</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam Name</TableHead>
                  <TableHead>Date Taken</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {examResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.name}</TableCell>
                    <TableCell>{result.date}</TableCell>
                    <TableCell>{result.score}%</TableCell>
                    <TableCell>
                      <Badge variant={result.status === "Passed" ? "default" : "destructive"}>
                        {result.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
