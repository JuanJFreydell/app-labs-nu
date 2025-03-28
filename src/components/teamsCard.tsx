import React from "react";

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
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto border border-gray-200">
      {/* Team Name */}
      <h2 className="text-2xl font-bold text-red-600 mb-4">{team.name}</h2>

      {/* Project Description */}
      <p className="text-gray-800 text-sm mb-4">{team.projectDescription}</p>

      {/* Stack */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-black mb-2">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {team.stack.map((tech, index) => (
            <span
              key={index}
              className="bg-red-100 text-red-600 px-3 py-1 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Presentation Date */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-black mb-2">
          Presentation Date
        </h3>
        <p className="text-gray-600 text-sm">{team.presentationDate}</p>
      </div>

      {/* Team Members */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Team Members</h3>
        <div className="flex -space-x-4">
          {team.members.map((member, index) => (
            <div
              key={index}
              className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md"
            >
              <img
                src={member.picture}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
