const BaseContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
      {children}
    </main>
  );
};

export default BaseContainer;
