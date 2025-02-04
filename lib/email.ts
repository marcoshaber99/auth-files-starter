import { Resend } from "resend";
import { renderAsync } from "@react-email/render";
import VerificationEmail from "@/emails/verification-code";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

if (!process.env.EMAIL_FROM_ADDRESS || !process.env.EMAIL_FROM_NAME) {
  throw new Error("Missing email configuration environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`;

type SendVerificationEmailParams = {
  email: string;
  otp: string;
  type: "sign-in" | "email-verification" | "forget-password";
};

export async function sendVerificationEmail({
  email,
  otp,
  type,
}: SendVerificationEmailParams) {
  const appName = process.env.EMAIL_FROM_NAME || "Auth Starter";
  let subject = "";

  switch (type) {
    case "sign-in":
      subject = `Sign in to ${appName}`;
      break;
    case "email-verification":
      subject = `Verify your email for ${appName}`;
      break;
    case "forget-password":
      subject = `Reset your password for ${appName}`;
      break;
  }

  try {
    const html = await renderAsync(VerificationEmail({ otp, type, appName }));

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject,
      html,
      text: `Your verification code for ${appName} is: ${otp}. This code will expire in 10 minutes.`,
      tags: [{ name: "category", value: type }],
      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      },
    });

    if (error) {
      console.error("Failed to send email:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error(
      "Failed to send verification email. Please try again later."
    );
  }
}
