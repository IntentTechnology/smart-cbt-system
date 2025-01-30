"use client";

import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { setProfilePic } from "@/lib/auth-actions";

export function ProfilePhotoUpload({ setIsOpen, isOpen, profile }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      // const response = await fetch(
      //   "https://smart-cbt-profile.onrender.com/api/smart_cbt/set_profile_photo/FlryW3e2vC",
      //   {
      //     method: "POST",
      //     body: formData,
      //   }
      // );
      const response = await setProfilePic(formData, profile.data.userId);

      if (response.message === "Picture uploaded successfully") {
        toast({
          title: "Success",
          description: "Profile photo updated successfully",
        });
      }

      setIsOpen(false);
      router.refresh(); // Refresh the page to show the new profile photo
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload profile photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription>
            You need to upload a profile picture before taking this exam. This
            picture will be used for verification purposes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Profile Picture</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              disabled={isLoading}
            />
          </div>
          {file && (
            <div className="text-sm text-muted-foreground">
              Selected file: {file.name}
            </div>
          )}
          <Button type="submit" disabled={!file || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Picture
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
