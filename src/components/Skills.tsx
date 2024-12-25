"use client";

import { techCardsItems, frameworksItems, databasesItems } from "@/lib/constants";
import TechCard from "@/components/CodingCard";
import { motion } from "framer-motion";

type TechCardItem = {
  name: string;
  description: string;
  imageUrl: string;
  bgColor: string;
};

const Skills = () => {
  const fadeIn = (direction: string, delay = 0.25) => ({
    initial: { opacity: 0, [direction]: direction === "x" ? -75 : 75 },
    whileInView: { opacity: 1, [direction]: 0 },
    transition: { duration: 0.5, delay },
    viewport: { once: true },
  });

  return (
    <section className="relative z-10 py-16 sm:py-24" id="about">
      <header className="mb-10 space-y-4">
        <motion.h1
          {...fadeIn("x")}
          className="text-3xl min-[430px]:text-4xl md:text-5xl font-bold dark:text-stone-200"
        >
          Current Technologies
        </motion.h1>
        <motion.p
          {...fadeIn("x", 0.3)}
          className="text-sm min-[430px]:text-base max-w-lg md:max-w-3xl text-dark-200/70 dark:text-stone-200/70"
        >
          I&apos;m skilled in a variety of modern tools and frameworks that enable me 
          to create seamless, high-performing solutions. Here&apos;s a glimpse at my tech stack:
        </motion.p>
      </header>

      <motion.h1
        {...fadeIn("x")}
        className="mb-5 text-2xl min-[430px]:text-3xl md:text-4xl font-bold dark:text-stone-200"
      >
        Programming Languages
      </motion.h1>
      <motion.div
        {...fadeIn("y")}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {techCardsItems.map((cardItem: TechCardItem) => (
          <TechCard key={cardItem.name} cardInfo={cardItem} />
        ))}
      </motion.div>

      <motion.h1
        {...fadeIn("x", 0.3)}
        className="mb-5 text-2xl min-[430px]:text-3xl md:text-4xl font-bold dark:text-stone-200 mt-10"
      >
        Frameworks
      </motion.h1>
      <motion.div
        {...fadeIn("y", 0.3)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {frameworksItems.map((cardItem: TechCardItem) => (
          <TechCard key={cardItem.name} cardInfo={cardItem} />
        ))}
      </motion.div>

      <motion.h1
        {...fadeIn("x", 0.6)}
        className="mb-5 text-2xl min-[430px]:text-3xl md:text-4xl font-bold dark:text-stone-200 mt-10"
      >
        Databases
      </motion.h1>
      <motion.div
        {...fadeIn("y", 0.6)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {databasesItems.map((cardItem: TechCardItem) => (
          <TechCard key={cardItem.name} cardInfo={cardItem} />
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;