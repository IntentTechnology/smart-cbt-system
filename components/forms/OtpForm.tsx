import { error } from "console";
import { Link } from "lucide-react";
import { Input } from "../ui/input";
import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

interface OtpFormProps {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
  error?: {
        message: string;
        name: string;
        password: string;
        confirmPassword: string;
        email: string;
      }
    | undefined;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const OtpForm: React.FC<OtpFormProps> = ({
  isLoading,
  email,
  otp,
  setOtp,
  error,
  handleSubmit,
}) => {
  return (
    <Card className=" py-2 flex flex-col  md:w-[400px]  gap-2">
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
        <CardDescription>
          input the 4 digit number sent to your email {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="otp">OTP</Label>
              <div className="flex space-x-2">
                <Input
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  //   disabled={!otpSent}
                />
                {/* <Button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isLoading || otpSent}
                >
                  {otpSent ? "OTP Sent" : "Send OTP"}
                </Button> */}
              </div>
            </div>
          </div>
        </>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button
        className="w-full"
          onClick={handleSubmit}
          //   disabled={isLoading || !otpSent}
        >
          {isLoading ? "Sending Otp" : "Verify"}
        </Button>
        {error?.message && <p className="text-red-500 mt-2">{error?.message}</p>}
        {/* <p className="mt-4">
          Already have an account?{" "}
          <Link href="/" className="text-[#65aabd] hover:underline">
            Login
          </Link>
        </p> */}
      </CardFooter>
    </Card>
  );
};

export default OtpForm;
