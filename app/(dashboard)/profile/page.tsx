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
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-2 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="w-full lg:col-span-3">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
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
                  <Button>Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card className="w-full lg:col-span-4">
            <CardHeader>
              <CardTitle>Exam History</CardTitle>
              <CardDescription>Your recent exam results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="lg:ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Mathematics 101
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Score: 85%
                      </p>
                    </div>
                    <div className="ml-auto font-medium">2023-06-{15 + i}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
