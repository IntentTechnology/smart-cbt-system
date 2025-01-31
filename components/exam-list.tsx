"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ExamCard } from "./exam-card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type Exam = {
  id: string;
  subject: string;
  createdAt: string;
  duration: number;
};

export function ExamList({ allExams }: any) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isCapturing, setIsCapturing] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = React.useState<string | null>(
    null
  );
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const startCapture = async () => {
    setIsCapturing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
      toast({
        title: "Camera Access Error",
        description:
          "Unable to access the camera. Please ensure you have given permission.",
        variant: "destructive",
      });
      setIsCapturing(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);
        localStorage.setItem("examCapturedImage", imageDataUrl);
        setIsCapturing(false);

        // Stop all video tracks
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const handleTakeExam = (examId: string) => {
    setSelectedExamId(examId);
    setIsDialogOpen(true);
    startCapture();
  };

  const handleStartExam = () => {
    if (selectedExamId && capturedImage) {
      router.push(`/exams/${selectedExamId}/take`);
    } else {
      toast({
        title: "Error",
        description: "Please capture an image before starting the exam.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center py-4 space-y-4 md:space-y-0">
        {/* <Input
          placeholder="Filter subjects..."
          value={(table.getColumn("subject")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("subject")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="md:ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <div className="rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {allExams?.data.length ? (
            allExams?.data.map((row: any) => (
              <ExamCard key={row.id} row={row} onTakeExam={handleTakeExam} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              No Available Exams! Please check Back Later.
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        {/* <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div> */}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {capturedImage ? "Ready to Start" : "Capture Image"}
            </DialogTitle>
            <DialogDescription>
              {capturedImage
                ? "Your image has been captured. You can now start the exam."
                : "Please look at the camera and click the capture button when ready."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            {!capturedImage && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: "100%", maxWidth: "640px" }}
              />
            )}
            {capturedImage && (
              <Image
                src={capturedImage || "/placeholder.svg"}
                alt="Captured"
                style={{ width: "100%", maxWidth: "640px" }}
                width={0}
                height={0}
              />
            )}
            {!capturedImage ? (
              <Button onClick={captureImage} disabled={!isCapturing}>
                Capture
              </Button>
            ) : (
              <Button
                onClick={handleStartExam}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Start Exam
              </Button>
            )}
          </div>
          <canvas
            ref={canvasRef}
            style={{ display: "none" }}
            width="640"
            height="480"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
