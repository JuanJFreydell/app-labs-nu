import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-fit flex-col bg-gradient-to-tr from-white from-40% to-fuchsia-100 to-80%">
      {/* Hero Section */}

      <div className="flex h-dvh w-full flex-row">
        <div className="flex h-full flex-col justify-center lg:w-1/2">
          <p className="flex h-fit items-center px-5 pt-14 text-sm font-bold text-red-600 lg:px-20 lg:text-2xl">
            Where we gather to launch software products
          </p>
          <h1 className="flex h-fit items-center px-5 text-5xl leading-tight font-bold lg:px-20 lg:text-8xl">
            Northeastern Students Build
          </h1>
          <p className="flex h-fit items-center px-5 pt-4 text-zinc-600 lg:px-20 lg:text-2xl">
            Join us to attend/host full-stack development seminars, find a team
            to collaborate with on software projects, and drink boba🧋.
          </p>
        </div>
        <div className="hidden h-full w-1/2 items-center justify-center lg:flex">
          <Image
            src="/AppDevelopment.png"
            alt="App Lab Visual"
            width={300}
            height={300}
            priority
            className="w-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Calendar Section */}

      <div className="h-dvh w-full items-center justify-center lg:flex">
        <div className="flex w-full items-center justify-center text-center text-4xl font-bold text-gray-800 underline lg:w-1/2">
          Event Calendar
        </div>
        <div className="flex h-full w-dvw items-center justify-center rounded-lg lg:h-3/4 lg:w-1/2">
          <iframe
            src="https://lu.ma/embed/calendar/cal-GUaschGEOamfwOu/events?lt=light"
            width="95%"
            height="90%"
            className="rounded-lg border-2"
            aria-hidden="false"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
