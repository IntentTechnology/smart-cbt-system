// import { error } from 'console'
import Link from "next/link";
import { Input } from "../ui/input";
import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import PasswordValidation from "../PasswordValidation";
import { Icons } from "../icons";

interface RegisterFormProps {
  form: number;
  setForm: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit?: any;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  otpSent?: boolean;
  error?:
    | {
        message: string;
        name: string;
        password: string;
        confirmPassword: string;
        email: string;
      }
    | undefined;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  handleSubmit,
  email,
  setEmail,
  name,
  form,
  setForm,
  setName,
  password,
  setPassword,
  setConfirmPassword,
  confirmPassword,
  isLoading,
  otpSent,
  error,
}) => {
  return (
    <>
      <div className={"grid gap-6"}>
        <div className="grid gap-5">
          <div className="grid gap-3">
            <Label className="" htmlFor="name">
              Fullname
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
            {error?.name && (
              <p className="text-red-500 text-xs mt-2">{error?.name}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            {error?.email && (
              <p className="text-red-500 text-xs mt-2">{error?.email}</p>
            )}
          </div>
          <PasswordValidation setPassword={setPassword} password={password} />
          <div className="grid gap-3">
            <Label className="" htmlFor="password">
              Confirm Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
            {error?.password && (
              <p className="text-red-500 text-xs mt-2">{error?.password}</p>
            )}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!email || !password || !name || !confirmPassword}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
