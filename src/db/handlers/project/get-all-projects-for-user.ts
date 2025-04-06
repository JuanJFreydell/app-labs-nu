import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schemas";

export async function getAllProjectsForUser(userId: string) {
  return await db.query.projects.findMany({
    where: eq(projects.projectOwnerUserId, userId),
    orderBy: [projects.createdAt],
    with: {
      teamMembers: {
        with: {
          user: true,
        },
      },
    },
  });
}
