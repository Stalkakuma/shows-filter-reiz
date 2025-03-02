import { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid dark:bg-background-dark  bg-white dark:text-white text-brown grid-cols-[auto_1fr_auto] grid-rows-[100px_minmax(900px,1fr)]  min-h-screen">
      <header className="col-start-2 col-span-1 place-content-center ">
        <Navbar />
      </header>
      <main className="col-start-2 col-span-1 md:px-4 sm:px-8 px-16 mr-auto ml-auto  md:max-w-7xl">
        {children}
      </main>
      <footer className="col-start-2 col-span-1 p-5 mr-auto ml-auto  md:max-w-7xl">
        <p>© 2025 ReizTech</p>
      </footer>
    </div>
  );
};
