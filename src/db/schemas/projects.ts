import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { users } from "@/db/schemas/";

// user projects table
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().notNull(),
  projectOwnerUserId: uuid("project_owner_user_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 100 }).notNull(),
  description: varchar("description", { length: 250 }),
  techStack: varchar("tech_stack", { length: 100 }).array(),
  githubUrl: text("github_url"),
  isProjectPublic: boolean("is_project_public").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}).enableRLS();

export const projectInsertSchema = createInsertSchema(projects);
export const projectSelectSchema = createSelectSchema(projects);
export const projectUpdateSchema = createUpdateSchema(projects);

// Table contains information of team members associated with project
export const projectTeamMembers = pgTable("project_team_members", {
  id: uuid("id").primaryKey().notNull(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
}).enableRLS();

export const teamMembersInsertSchema = createInsertSchema(projectTeamMembers);
export const teamMembersSelectSchema = createSelectSchema(projectTeamMembers);
export const teamMembersUpdateSchema = createUpdateSchema(projectTeamMembers);

// Define relations
export const projectRelations = relations(projects, ({ one, many }) => ({
  owner: one(users, {
    fields: [projects.projectOwnerUserId],
    references: [users.id],
  }),
  teamMembers: many(projectTeamMembers),
}));

export const projectTeamMembersRelations = relations(
  projectTeamMembers,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectTeamMembers.projectId],
      references: [projects.id],
    }),
    user: one(users, {
      fields: [projectTeamMembers.userId],
      references: [users.id],
    }),
  }),
);
