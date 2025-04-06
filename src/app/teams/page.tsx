import React from "react";
import TeamCard from "@/components/teamsCard";
import MarketingPage from "@/components/marketing-page";
import { teams } from "@/variables/teams";

export default function TeamsList() {
  const pageTitle = "Active Teams";
  const pageDescription =
    "Here are some of the projects that members of App Lab Northeastern are currently working on.";

  return (
    <MarketingPage pageTitle={pageTitle} pageDescription={pageDescription}>
      {/* Team Cards */}
      <ul
        role="list"
        className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
      >
        {teams.map((team, index) => (
          <li key={index} className="p-4">
            <TeamCard
              team={{
                ...team,
                members: team.members,
              }}
            />
          </li>
        ))}
      </ul>
    </MarketingPage>
  );
}
