"use client";

import { useState } from "react";
import { usePasswordValidation } from "@/lib/usePasswordValidation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PasswordValidation({
  password,
  setPassword,
}: {
  password: string;
  setPassword: any;
}) {
  const { validLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar } =
    usePasswordValidation(password);

  const isValid =
    validLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  return (
    <div className="flex flex-col gap-5">
   
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`mt-1 ${isValid ? "border-green-500" : "border-red-500"}`}
        />
      </div>
      <ul className="list-disc pl-5 space-y-1">
        <ValidationItem valid={validLength}>
          At least 8 characters long
        </ValidationItem>
        <ValidationItem valid={hasUpperCase}>
          Contains an uppercase letter
        </ValidationItem>
        <ValidationItem valid={hasLowerCase}>
          Contains a lowercase letter
        </ValidationItem>
        <ValidationItem valid={hasNumber}>Contains a number</ValidationItem>
        <ValidationItem valid={hasSpecialChar}>
          Contains a special character
        </ValidationItem>
      </ul>
    </div>
  );
}

function ValidationItem({
  valid,
  children,
}: {
  valid: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className={`text-sm ${valid ? "text-green-600" : "text-red-600"}`}>
      {valid ? "✓" : "✗"} {children}
    </li>
  );
}
