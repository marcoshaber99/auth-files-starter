"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import { Loader2 } from "lucide-react";

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/sign-in");
    }
  }, [email, router]);

  const handleVerify = async () => {
    if (!email || !otp) return;

    try {
      setLoading(true);
      await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });
      toast.success("Email verified successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      setResendLoading(true);
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });
      toast.success("Verification code resent!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to resend verification code");
    } finally {
      setResendLoading(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>
          Enter the verification code sent to {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              placeholder="Enter verification code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <Button
            onClick={handleVerify}
            className="w-full"
            disabled={loading || !otp}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Verify Email"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleResend}
            className="w-full"
            disabled={resendLoading}
          >
            {resendLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Resend Code"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Suspense
        fallback={
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
              <CardDescription>Please wait</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </CardContent>
          </Card>
        }
      >
        <VerifyEmailForm />
      </Suspense>
    </main>
  );
}
