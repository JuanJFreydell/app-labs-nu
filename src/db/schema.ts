import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  boolean,
  pgEnum,
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
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatarUrl: text("avatar_url"),
  jobTitle: text("job_title"),
  clubRole: clubRoleEnum("club_role").default("student").notNull(),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  interests: text("interests").array(),
  skills: text("skills").array(),

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
