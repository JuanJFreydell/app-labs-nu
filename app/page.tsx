"use client";
import Image from "next/image";
import Calendar from "./calendar";

const events = [
  { title: "Team Meeting", date: "2025-01-10" },
  { title: "Project Deadline", date: "2025-01-15" },
  { title: "Code Review", date: "2025-01-20" },
];

export default function Home() {
  return (
    <div className="h-fit flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-row h-screen w-full bg-gradient-to-tr from-white from-40% to-fuchsia-100 to-80%">
        <div className="flex flex-col h-full w-11/12 md:w-1/2 justify-center">
          <p className="flex items-center px-5 md:px-20 h-fit pt-14 text-red-600 font-bold text-xs md:text-2xl">
            Where we gather to launch software products
          </p>
          <h1 className="flex items-center px-5 md:px-20 h-fit font-bold text-4xl md:text-8xl leading-tight">
            Northeastern Students Build.
          </h1>
          <p className="flex items-center px-5 md:px-20 h-fit pt-4 text-zinc-600 text-sm md:text-2xl">
            Join us to attend/host full-stack development seminars, find a team
            to collaborate with on software projects, and drink boba🧋.
          </p>
        </div>
        <div className="md:flex w-1/2 h-full justify-center items-center hidden">
          <Image
            src="/AppDevelopment.png"
            alt="App Lab Visual"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Calendar Section */}
      {/* <div className="w-full bg-white py-20 px-10">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-10">
          Event Calendar
        </h2>
        <div className="min-h-screen flex justify-center items-center bg-gray-100 rounded-lg shadow-lg">
          <Calendar events={events} />
        </div>
      </div> */}
    </div>
  );
}
