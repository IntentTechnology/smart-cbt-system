"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { login } from "@/lib/auth-actions";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login({
        loginType: "regular",
        email,
        password,
      });

      if (response.message === "Login successful") {
        toast({
          title: response.message,
          description: "Welcome Back",
          variant: "default",
        });
        router.push("/dashboard");
      } else {
        // Handle login error
        setError(
          (response.errors.password && response.errors.password) ||
            (response.errors.email && response.errors.email) ||
            "Login failed. Please try again."
        );

        return toast({
          title: response.message,
          description:
            (response.errors.password && response.errors.password) ||
            (response.errors.email && response.errors.email),
          variant: "destructive",
        });
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <div className="grid gap-3">
            <Label className="" htmlFor="email">
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              autoCapitalize="none"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoCorrect="off"
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-3">
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Input
              required
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log in
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        {/* <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
           Register
          </span>
        </div> */}
      </div>
      {/* <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  );
}
