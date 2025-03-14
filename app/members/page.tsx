import React from "react";
import PersonCard from "../personCard"; // Import the new PersonCard component
import { board_members, students, advisors } from "../(variables)/people";

const Members: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Board */}
      <h2 className="pt-20 text-3xl font-bold text-black mb-6 text-center">
        NU App Lab Board
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mb-10">
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
          />
        ))}
      </div>

      {/* Students Section */}
      <h2 className="pt-20 text-3xl font-bold text-black mb-6 text-center">
        Students
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mb-10">
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
          />
        ))}
      </div>

      {/* Advisors Section */}
      <h2 className="pt-20 text-3xl font-bold text-black mb-6 text-center">
        Advisors
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 pb-10">
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
          />
        ))}
      </div>
    </div>
  );
};

export default Members;
