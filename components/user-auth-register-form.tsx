"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import RegisterForm from "./forms/RegisterForm";
import OtpForm from "./forms/OtpForm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createProfile, Register, sendOtp } from "@/lib/auth-actions";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterUserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  const { toast } = useToast();
  const [form, setForm] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({
    message: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  // Sends otp User function
  const handleSendOtp = async () => {
    setError({
      message: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    });
    setIsLoading(true);

    if (password !== confirmPassword) {
      // setError("Passwords do not match");
      setError({
        message: "",
        name: "",
        email: "",
        password: "Passwords do not match",
        confirmPassword: "",
        otp: "",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await sendOtp({
        email,
        name,
      });

      if (response.message === "OTP sent successfully") {
        toast({
          title: response.message,
          description: response?.error,
          className: "bg-green.300",
          variant: "default",
        });
        // Handle successful registration
        console.log("Registration successful:", response);
        setForm(1);
      } else if (response.message === "This email already exists with us") {
        toast({
          title: "Email already Exists",
          description: response?.message,
          variant: "destructive",
        });
        // Handle registration error
        setError({
          message: "",
          name: response.error.name,
          email: response.error.email,
          password: response.error.password,
          confirmPassword: response.error.confirmPassword,
          otp: "",
        });
      }
      setOtpSent(true);
    } catch (err) {
      // setError("Failed to send OTP. Please try again.");
      console.log(error);
      setError({
        message: "Failed to send OTP. Please try again.",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Registers User
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({
      message: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    });
    setIsLoading(true);

    try {
      const response = await Register({
        email,
        name,
        otp,
        password,
        confirmPassword,
      });

      if (response.message === "Account created successfully") {
        // Handle successful registration
        toast({
          title: response?.message,
          description: " Registration successful",
          className: "bg-green.500",
          variant: "default",
        });
        console.log("Registration successful:", response);
        //creates the user profile after sign up
        const userId = response.userId;
        // localStorage.setItem("userId", userId);
        const createProf = createProfile({
          userId,
          biometricToken: "4tgasf43hfvzbjcvagcvgaugfyavfqfq36567",
        });

        router.push("/");
      } else {
        // Handle registration error
        setError(response.message || "Registration failed. Please try again.");
        setError({
          message: response.message,
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          otp: "",
        });
      }
    } catch (err) {
      // setError("An error occurred. Please try again.");
      setError({
        message: "An error occurred. Please try again.",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const activeForm = () => {
    if (form === 0) {
      return (
        <RegisterForm
          isLoading={isLoading}
          setForm={setForm}
          name={name}
          setEmail={setEmail}
          setName={setName}
          form={form}
          password={password}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          confirmPassword={confirmPassword}
          email={email}
          error={error}
          handleSubmit={handleSendOtp}
        />
      );
    } else {
      return (
        <OtpForm
          handleSubmit={handleSubmit}
          email={email}
          otp={otp}
          error={error}
          isLoading={isLoading}
          setOtp={setOtp}
        />
      );
    }
  };

  return <>{activeForm()}</>;
}
