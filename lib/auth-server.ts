import { auth } from "./auth";
import { headers } from "next/headers";

export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}
