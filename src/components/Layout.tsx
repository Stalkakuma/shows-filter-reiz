import { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid max-w-screen-xl mx-auto w-full grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto]  min-h-screen">
      <header className="flex  items-center justify-center col-start-2 col-span-1 p-4">
        <Navbar />
      </header>
      <main className="flex min-h-[80vh] items-start justify-center col-start-2 col-span-1 p-4">
        {children}
      </main>
      <footer className="flex items-center justify-center col-start-2 col-span-1 p-4">
        <p>© 2025 ReizTech</p>
      </footer>
    </div>
  );
};
