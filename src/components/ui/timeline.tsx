"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  view,
  onViewChange,
}: {
  data: TimelineEntry[];
  view: string;
  onViewChange: (view: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const fadeIn = (direction: string, delay = 0.25) => ({
    initial: { opacity: 0, [direction]: direction === "x" ? -75 : 75 },
    whileInView: { opacity: 1, [direction]: 0 },
    transition: { duration: 0.5, delay },
    viewport: { once: true },
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <motion.div
        style={{ opacity: 1 }}
        className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10"
      >
        <motion.h1
          {...fadeIn("y", 0.3)}
          className="text-3xl min-[430px]:text-4xl md:text-5xl font-bold dark:text-stone-200"
        >
          Experience
        </motion.h1>
        <motion.p
          {...fadeIn("y", 0.4)}
          className="text-sm min-[430px]:text-base max-w-lg md:max-w-3xl text-dark-200/70 dark:text-stone-200/70"
        >
          On this section I'd like to show my experience with coding along the
          years.
        </motion.p>

        <motion.div
          className="no-pointer flex justify-left items-center my-6"
          {...fadeIn("y", 0.5)}
        >
          <div className="no-pointer relative inline-block w-[10.5rem]">
            <input
              type="checkbox"
              id="switch"
              className="hidden no-pointer"
              checked={view === "academic"}
              onChange={() => onViewChange(view === "work" ? "academic" : "work")}
            />
            <label
              htmlFor="switch"
              className="no-pointer block bg-gray-200 dark:bg-gray-700 cursor-pointer rounded-full w-full h-12"
            >
              <span
                className={`no-pointer absolute top-1 left-1 h-10 w-20 bg-blue-600 rounded-full shadow-md transform transition-transform ${
                  view === "academic" ? "translate-x-20" : "translate-x-0"
                }`}
              ></span>
              <div className="no-pointer flex justify-between items-center absolute w-full h-full text-neutral-800 dark:text-neutral-200 text-sm font-medium">
                <span
                  className={`no-pointer w-1/2 text-center transition-colors ${
                    view === "work" ? "text-white" : "text-neutral-800"
                  }`}
                >
                  Work
                </span>
                <span
                  className={`no-pointer w-1/2 text-center transition-colors ${
                    view === "academic" ? "text-white" : "text-neutral-800"
                  }`}
                >
                  Academic
                </span>
              </div>
            </label>
          </div>
        </motion.div>
      </motion.div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const fadeInItem = fadeIn("y", 0.5 + index * 0.2);

          return (
            <motion.div
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
              {...fadeInItem}
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                  {item.title}
                </h3>
                {item.content}
              </div>
            </motion.div>
          );
        })}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};