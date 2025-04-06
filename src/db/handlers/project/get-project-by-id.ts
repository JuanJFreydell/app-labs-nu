import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schemas";

export async function getProjectById(projectId: string) {
  return await db.query.projects.findFirst({
    where: eq(projects.id, projectId),
    with: {
      owner: true,
      teamMembers: {
        with: {
          user: true,
        },
      },
    },
  });
}
