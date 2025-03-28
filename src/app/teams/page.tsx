import React from "react";
import TeamCard from "@/components/teamsCard";
import { teams } from "@/variables/teams";

export default function TeamsList() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Title */}
      <h1 className="mb-10 pt-20 text-center text-4xl font-bold text-black">
        Active Teams
      </h1>

      {/* Team Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
}
