import { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Exam Results",
  description: "View your exam results.",
}

export default async function ExamResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  // In a real application, you would fetch the results based on the exam ID and user
  const results = {
    examId: id,
    subject: "Mathematics 101",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    timeTaken: "45 minutes",
    questions: [
      { id: 1, question: "What is 2 + 2?", yourAnswer: "4", correctAnswer: "4", isCorrect: true },
      { id: 2, question: "Whatis the square root of 16?", yourAnswer: "4", correctAnswer: "4", isCorrect: true },
      { id: 3, question: "What is 10 * 5?", yourAnswer: "50", correctAnswer: "50", isCorrect: true },
      // Add more questions as needed
    ],
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
          <h2 className="text-3xl font-bold tracking-tight">Exam Results</h2>
          <div className="flex items-center space-x-2">
            <Button>Download Results</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{results.score}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Correct Answers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{results.correctAnswers}/{results.totalQuestions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{results.timeTaken}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subject
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{results.subject}</div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Detailed Results</CardTitle>
            <CardDescription>Review your answers for each question</CardDescription>
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
                {results.questions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell>{question.question}</TableCell>
                    <TableCell>{question.yourAnswer}</TableCell>
                    <TableCell>{question.correctAnswer}</TableCell>
                    <TableCell>{question.isCorrect ? "Correct" : "Incorrect"}</TableCell>
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

