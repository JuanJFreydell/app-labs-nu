import React from "react";
import { board_members, students, advisors } from "@/variables/people";
import MarketingPage from "@/components/marketing-page";
import PersonCard from "@/components/person-card";

export default function Members() {
  const pageTitle = "Members";
  const pageDescription =
    "Meet our board, club members, and advisors that love building software.";

  return (
    <MarketingPage pageTitle={pageTitle} pageDescription={pageDescription}>
      <h2 className="mt-20 text-center text-3xl font-bold text-black">Board</h2>
      <ul
        role="list"
        className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
      >
        {board_members.map((member) => (
          <li key={`${member.firstName}${member.lastName}`} className="flex">
            <PersonCard props={member} />
          </li>
        ))}
      </ul>

      <h2 className="mt-20 text-center text-3xl font-bold text-black">
        Students
      </h2>
      <ul
        role="list"
        className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
      >
        {students.map((student) => (
          <li key={`${student.firstName}${student.lastName}`} className="flex">
            <PersonCard props={student} />
          </li>
        ))}
      </ul>

      <h2 className="mt-20 text-center text-3xl font-bold text-black">
        Advisors
      </h2>
      <ul
        role="list"
        className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
      >
        {advisors.map((advisor) => (
          <li key={`${advisor.firstName}${advisor.lastName}`} className="flex">
            <PersonCard props={advisor} />
          </li>
        ))}
      </ul>
    </MarketingPage>
  );
}
