import React from "react";
import PersonCard from "@/components/personCard"; // Import the new PersonCard component
import { board_members, students, advisors } from "@/variables/people";

export default function Members() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Board */}
      <h2 className="mb-6 pt-20 text-center text-3xl font-bold text-black">
        NU App Lab Board
      </h2>
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {board_members.map((member, index) => (
          <PersonCard
            key={index}
            url={member.url}
            firstName={member.firstName}
            lastName={member.lastName}
            title={member.title}
            interests={member.interests}
            skills={member.skills}
            position={member.position}
            linkedin={member.linkedin}
            neuEmail={member.neuEmail}
          />
        ))}
      </div>

      {/* Students Section */}
      <h2 className="mb-6 pt-20 text-center text-3xl font-bold text-black">
        Students
      </h2>
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student, index) => (
          <PersonCard
            key={index}
            url={student.url}
            firstName={student.firstName}
            lastName={student.lastName}
            title={student.title}
            interests={student.interests}
            skills={student.skills}
            position={student.position}
            linkedin={student.linkedin}
            neuEmail={student.neuEmail}
          />
        ))}
      </div>

      {/* Advisors Section */}
      <h2 className="mb-6 pt-20 text-center text-3xl font-bold text-black">
        Advisors
      </h2>
      <div className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {advisors.map((advisor, index) => (
          <PersonCard
            key={index}
            url={advisor.url}
            firstName={advisor.firstName}
            lastName={advisor.lastName}
            title={advisor.title}
            interests={advisor.interests}
            skills={advisor.skills}
            position={advisor.position}
            linkedin={advisor.linkedin}
            neuEmail={advisor.neuEmail}
          />
        ))}
      </div>
    </div>
  );
}
