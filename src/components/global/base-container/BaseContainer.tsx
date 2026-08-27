const BaseContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
      {children}
    </main>
  );
};

export default BaseContainer;
