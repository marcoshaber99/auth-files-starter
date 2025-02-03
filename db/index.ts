import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Create a SQL client instance with Neon
const sql = neon(process.env.DATABASE_URL!);

// Create a Drizzle instance
export const db = drizzle(sql);

// Export sql client for direct queries if needed
export { sql };
