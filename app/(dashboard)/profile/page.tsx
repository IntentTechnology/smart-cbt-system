import { Metadata } from "next";
import Image from "next/image";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Profile",
  description: "User profile management page.",
};

export default function ProfilePage() {
  return (
    <div className="flex-col flex justify-center items-center">
      <div className="flex-1 space-y-4 p-2 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        </div>
        <div className="w-full">
          <Card className="w-full  ">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="">
              <form>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="picture">Profile Picture</Label>
                  <div className="flex flex-col md:flex-row items-center md:space-x-4">
                    <Image
                      src="/placeholder.svg"
                      alt="Profile picture"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <Button>Upload New Picture</Button>
                  </div>
                </div>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="john@example.com"
                      type="email"
                    />
                  </div>

                  <Button>Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
