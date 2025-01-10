import React from "react";
import TeamCard from "../teams";

const teams = [
  {
    name: "Code Warriors",
    projectDescription: "Building a real-time chat app with secure messaging.",
    stack: ["React", "Node.js", "Socket.IO", "MongoDB"],
    presentationDate: "2025-01-30",
    members: [
      { name: "Alice", picture: "https://via.placeholder.com/150" },
      { name: "Bob", picture: "https://via.placeholder.com/150" },
      { name: "Charlie", picture: "https://via.placeholder.com/150" },
    ],
  },
  {
    name: "Data Titans",
    projectDescription:
      "Developing a machine learning model for stock predictions.",
    stack: ["Python", "TensorFlow", "Pandas", "AWS"],
    presentationDate: "2025-02-15",
    members: [
      { name: "Dana", picture: "https://via.placeholder.com/150" },
      { name: "Eve", picture: "https://via.placeholder.com/150" },
      { name: "Frank", picture: "https://via.placeholder.com/150" },
    ],
  },
  {
    name: "AI Pioneers",
    projectDescription: "Creating an AI-powered personal assistant.",
    stack: ["Python", "Flask", "OpenAI", "Docker"],
    presentationDate: "2025-03-01",
    members: [
      { name: "Grace", picture: "https://via.placeholder.com/150" },
      { name: "Hank", picture: "https://via.placeholder.com/150" },
      { name: "Ivy", picture: "https://via.placeholder.com/150" },
    ],
  },
  {
    name: "Web Wizards",
    projectDescription:
      "Designing a collaborative online whiteboard application.",
    stack: ["React", "TypeScript", "Firebase", "TailwindCSS"],
    presentationDate: "2025-03-10",
    members: [
      { name: "Jack", picture: "https://via.placeholder.com/150" },
      { name: "Kara", picture: "https://via.placeholder.com/150" },
      { name: "Liam", picture: "https://via.placeholder.com/150" },
    ],
  },
  {
    name: "Crypto Coders",
    projectDescription: "Developing a decentralized wallet for NFTs.",
    stack: ["Solidity", "Ethereum", "React", "Web3.js"],
    presentationDate: "2025-04-05",
    members: [
      { name: "Mia", picture: "https://via.placeholder.com/150" },
      { name: "Noah", picture: "https://via.placeholder.com/150" },
      { name: "Olivia", picture: "https://via.placeholder.com/150" },
    ],
  },
];

const TeamsList: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-24">
      {/* Title */}
      <h1 className="text-4xl font-bold text-black mb-10 text-center">
        Active Teams
      </h1>

      {/* Team Cards */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-20">
        {teams.map((team, index) => (
          <div key={index} className="p-4">
            <TeamCard
              team={{
                ...team,
                members: team.members, // Pass members to avoid spread issues
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsList;
