import React from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  picture: string; // URL to the team member's picture
}

interface Team {
  name: string;
  projectDescription: string;
  stack: string[];
  presentationDate: string; // Format: YYYY-MM-DD
  members: TeamMember[];
}

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div className="mx-auto max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
      {/* Team Name */}
      <h2 className="mb-4 text-2xl font-bold text-red-600">{team.name}</h2>

      {/* Project Description */}
      <p className="mb-4 text-sm text-gray-800">{team.projectDescription}</p>

      {/* Stack */}
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold text-black">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {team.stack.map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Presentation Date */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-black">
          Presentation Date
        </h3>
        <p className="text-sm text-gray-600">{team.presentationDate}</p>
      </div>

      {/* Team Members */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-black">Team Members</h3>
        <div className="flex -space-x-4">
          {team.members.map((member, index) => (
            <div
              key={index}
              className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-md"
            >
              <Image
                src={member.picture}
                alt={member.name}
                width={100}
                height={100}
                unoptimized={true}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
