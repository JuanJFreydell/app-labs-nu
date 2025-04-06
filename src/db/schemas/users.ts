import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  boolean,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";

const clubRoleEnum = pgEnum("club_role", [
  "board_member",
  "student",
  "advisor",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(),

  email: text("email").notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  avatarUrl: text("avatar_url"),
  jobTitle: varchar("job_title", { length: 100 }),
  clubRole: clubRoleEnum("club_role").default("student").notNull(),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  interests: varchar("interests", { length: 100 }).array(),
  skills: varchar("skills", { length: 100 }).array(),

  preferences: jsonb("preferences").default({}),
  isProfileComplete: boolean("is_profile_complete").default(false),
  isProfilePublic: boolean("is_profile_public").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at").defaultNow(),
}).enableRLS();

export const userInsertSchema = createInsertSchema(users);
export const userSelectSchema = createSelectSchema(users);
export const userUpdateSchema = createUpdateSchema(users);
