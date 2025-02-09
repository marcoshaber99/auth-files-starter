# Auth Files Starter

A minimal starter template for authentication and file uploads with Next.js, Better Auth, and UploadThing.

## Stack

- Next.js 15 (App Router)
- Better-Auth
- Drizzle + PostgreSQL
- React Email + Resend
- Shadcn/ui + Tailwind
- UploadThing

## Todo

- [x] Email/Password Auth
- [x] Email Verification OTP
- [x] GitHub Auth
- [ ] File Uploads with UploadThing

## Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

## Environment Variables

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
NEXT_PUBLIC_APP_URL=
DATABASE_URL=
RESEND_API_KEY=
EMAIL_FROM_ADDRESS=
EMAIL_FROM_NAME=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```
