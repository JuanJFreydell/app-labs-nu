import { userSelectSchema } from "@/db/schemas";
import { redirect } from "next/navigation";
import {
  getAuthenticatedUserProfile,
  getAllProjectsForUser,
} from "@/db/handlers";

export default async function ProfilePage() {
  const user = await getAuthenticatedUserProfile();

  if (!user) {
    redirect("/login");
  }

  const parsedUser = userSelectSchema.parse(user);
  const projects = await getAllProjectsForUser(user.id);

  return (
    <div>
      <ul>
        <li>id: {parsedUser.id}</li>
        <li>Name: {`${parsedUser.firstName} ${parsedUser.lastName}`}</li>
        <li>
          Role:{" "}
          {parsedUser.clubRole
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </li>
      </ul>
      <h2 className="text-2xl font-bold">Projects</h2>
      <ul>
        {projects?.map((project) => (
          <div key={project.id}>
            <div className="text-xl font-semibold">{project?.title}</div>
            <div>{project?.description}</div>
            <div>{project?.githubUrl}</div>
            <div>{project?.techStack?.map((item) => item + " ")}</div>
            <h3 className="text-lg font-bold">Team Members</h3>
            {project.teamMembers.map((teamMember) => (
              <div key={teamMember.userId}>
                <div>{`${teamMember.user.firstName} ${teamMember.user.lastName}`}</div>
                <div>{teamMember.user.avatarUrl}</div>
                <div>{teamMember.user.interests}</div>
              </div>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
}
