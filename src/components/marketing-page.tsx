export default function MarketingPage({
  pageTitle,
  pageDescription,
  children,
}: Readonly<{
  pageTitle: string;
  pageDescription: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-black sm:text-5xl">
            {pageTitle}
          </h1>
          <p className="mt-6 text-lg/8 text-black/60">{pageDescription}</p>
        </div>
        <div className="mx-auto mt-20">{children}</div>
      </div>
    </div>
  );
}
