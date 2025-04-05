import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/db/schema";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });
const { users } = schema;
export { db, users };
