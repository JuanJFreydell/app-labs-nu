import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-white from-40% to-fuchsia-100 to-80%">
      {/* Hero Section */}
      <section className="mx-auto flex h-screen max-w-7xl flex-col px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="flex h-full w-full flex-col lg:flex-row">
          <div className="mt-16 h-full lg:mt-0 lg:flex lg:w-1/2 lg:flex-col">
            <p className="text-base font-bold text-red-600 lg:text-2xl">
              Where we gather to launch software products
            </p>
            <h1 className="text-5xl leading-tight font-bold lg:text-7xl">
              Northeastern Students Build
            </h1>
            <p className="pt-4 text-zinc-600 lg:text-2xl">
              Join us to attend/host full-stack development seminars, find a
              team to collaborate with on software projects, and drink boba🧋.
            </p>
          </div>
          <div className="hidden h-2/3 justify-center pt-12 md:flex lg:w-1/2">
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
      </section>
      {/* Calendar Section */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 sm:py-32 lg:flex-row lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="w-full text-center text-4xl font-bold text-gray-800 underline lg:w-1/2">
          Event Calendar
        </div>
        <div className="mx-auto mt-8 flex h-[31.25rem] w-full items-center justify-center rounded-lg lg:mt-0 lg:w-2/3">
          <iframe
            src="https://lu.ma/embed/calendar/cal-GUaschGEOamfwOu/events?lt=light"
            width="100%"
            height="100%"
            className="h-full rounded-lg border-2"
            aria-hidden="false"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
