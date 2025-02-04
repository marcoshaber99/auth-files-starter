import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  otp: string;
  type: "sign-in" | "email-verification" | "forget-password";
  appName?: string;
}

export default function VerificationEmail({
  otp,
  type,
  appName = "Auth by Marco",
}: VerificationEmailProps) {
  let actionText = "";
  switch (type) {
    case "sign-in":
      actionText = "sign in to";
      break;
    case "email-verification":
      actionText = "verify your email for";
      break;
    case "forget-password":
      actionText = "reset your password for";
      break;
  }

  return (
    <Html>
      <Head />
      <Preview>
        Your verification code for {appName} - {otp}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>{appName}</Heading>
          <Text style={text}>
            Use the following verification code to {actionText} {appName}:
          </Text>
          <Section style={codeContainer}>
            <Text style={otpCode}>{otp}</Text>
          </Section>
          <Text style={footer}>
            This code will expire in 10 minutes.
            <br />
            If you did not request this code, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f3f4f6",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  maxWidth: "600px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0 0 30px",
  color: "#111827",
};

const text = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#4b5563",
  margin: "0 0 24px",
};

const codeContainer = {
  background: "#f3f4f6",
  borderRadius: "6px",
  padding: "20px",
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const otpCode = {
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
  fontSize: "32px",
  fontWeight: "bold",
  color: "#111827",
  letterSpacing: "6px",
};

const footer = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#6b7280",
  textAlign: "center" as const,
  margin: 0,
};
