import Image from "next/image";

// const events = [
//   { title: "Team Meeting", date: "2025-01-10" },
//   { title: "Project Deadline", date: "2025-01-15" },
//   { title: "Code Review", date: "2025-01-20" },
// ];

export default function Home() {
  return (
    <div className="h-fit flex flex-col bg-gradient-to-tr from-white from-40% to-fuchsia-100 to-80%">
      {/* Hero Section */}

      <div className="flex flex-row h-dvh w-full ">
        <div className="flex flex-col h-full lg:w-1/2 justify-center">
          <p className="flex items-center px-5 lg:px-20 h-fit pt-14 text-red-600 font-bold text-sm lg:text-2xl">
            Where we gather to launch software products
          </p>
          <h1 className="flex items-center px-5 lg:px-20 h-fit font-bold text-5xl lg:text-8xl leading-tight">
            Northeastern Students Build
          </h1>
          <p className="flex items-center px-5 lg:px-20 h-fit pt-4 text-zinc-600 lg:text-2xl">
            Join us to attend/host full-stack development seminars, find a team
            to collaborate with on software projects, and drink boba🧋.
          </p>
        </div>
        <div className="lg:flex w-1/2 h-full justify-center items-center hidden">
          <Image
            src="/AppDevelopment.png"
            alt="App Lab Visual"
            width={300}
            height={300}
            priority
            className="rounded-lg shadow-lg w-auto"
          />
        </div>
      </div>

      {/* Calendar Section */}

      <div className="lg:flex h-dvh w-full items-center justify-center">
        <div className="flex items-center justify-center text-center w-full lg:w-1/2 text-4xl font-bold text-gray-800 underline">
          Event Calendar
        </div>
        <div className="w-dvw h-full lg:w-1/2 lg:h-3/4 flex justify-center items-center rounded-lg">
          <iframe
            src="https://lu.ma/embed/calendar/cal-GUaschGEOamfwOu/events?lt=light"
            width="95%"
            height="90%"
            className="border-2 rounded-lg"
            aria-hidden="false"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
