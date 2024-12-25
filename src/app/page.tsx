'use client';
import { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { BackgroundLines } from "@/components/ui/background-lines";
import { FlipWords } from "@/components/ui/flip-words";
import { FaUser, FaProjectDiagram, FaDownload, FaChessKnight, FaTerminal } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Skills from "@/components/Skills";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const scrollToRef = (ref: React.RefObject<HTMLElement>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Home() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "TechStack", link: "#", icon: <FaTerminal />, action: () => scrollToRef(skillsRef) },
    { name: "Experience", link: "#", icon: <FaChessKnight />, action: () => scrollToRef(experienceRef) },
    { name: "Projects", link: "/projects", icon: <FaProjectDiagram /> },
    { name: "Contact", link: "/about", icon: <FaUser /> },
  ];

  const words = ["SMART", "PRETTY", "QUICK"];
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleDarkMode = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setIsDarkMode(checked);
    document.documentElement.classList.toggle("dark", checked);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <Navbar navItems={navItems} />
      <main className="">
        <div className="absolute top-4 right-4 z-50">
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={40}
            moonColor="white"
            sunColor="black"
          />
        </div>

        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 py-8">
          <div className="max-w-4xl w-full bg-white dark:bg-neutral-900 rounded-xl transform transition-all duration-300 ease-in-out p-8 flex items-center space-x-8">
            <div className="relative w-[120px] h-[120px]">
              <img
                src="https://64.media.tumblr.com/27af6e6a4e06e6d33d535710bd6ca948/50f70419bc70f9d7-b7/s400x600/d6fd17a4115f03bd49c11357084496c5e2a0f17d.png"
                alt="Leonardo Cardenuto"
                className=" profile w-[120px] h-[120px] rounded-full object-cover border-4 border-gradient-to-r from-blue-500 to-green-400"
              />
              <p className="flex items-center text-danger font-semibold mt-2">
                &nbsp; &nbsp; <FaLocationDot /> &nbsp; Brazil, SP
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="bg-clip-text text-primary bg-gradient-to-b text-3xl md:text-5xl lg:text-6xl font-sans font-semibold tracking-tight leading-tight">
                Leonardo Cardenuto, <br /> <p className="text-warning">Full Stack Developer</p>
              </h2>
              <div className="flex items-center space-x-2 text-neutral-700 text-neutral-300 text-lg">
                <p className="introduction-text text-sm md:text-base mt-1 max-w-prose">
                  Hi 👋, I'm Leo, a 2nd year computer science student, coding{" "}
                  {isClient && <FlipWords words={words} />} solutions.
                </p>
              </div>
            </div>
          </div>
          <button className="custom-button inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors hover:outline-none hover:ring-2 hover:ring-slate-400 hover:ring-offset-2 hover:ring-offset-slate-50 animate-shimmer">
            <FaDownload /> &nbsp; Download my CV
          </button>
        </BackgroundLines>

        <div ref={skillsRef} className="flex items-center justify-center w-full flex-col px-4 py-8 mt-5">
          <Skills />
        </div>
      </main>
    </div>
  );
}