import React from "react";
import TeamCard from "../teamsCard";
import { teams } from "../(variables)/teams";

const TeamsList: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Title */}
      <h1 className="pt-20 text-4xl font-bold text-black mb-10 text-center">
        Active Teams
      </h1>

      {/* Team Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teams.map((team, index) => (
          <div key={index} className="p-4">
            <TeamCard
              team={{
                ...team,
                members: team.members,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsList;
