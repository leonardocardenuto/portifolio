import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "Dec 2019",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-light mb-6">
            <span className="font-semibold">Company:</span> Enter5<br />
            <span className="font-semibold">Role:</span> IT Consultant and Qualitor Technician<br />
            <span className="font-semibold">Duration:</span> December 2019 - October 2024<br />
            <span className="font-semibold">Key Responsibilities:</span> Providing IT support, technical consulting, and system management using Qualitor.<br />
            <span className="font-semibold">Skills Acquired:</span> Strong expertise in SQL development, Power BI for data visualization, business process analysis, and social media feature integration using React and Next.js.
          </p>
        </div>
      ),
    },
    {
      title: "May 2023",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-light mb-6">
            <span className="font-semibold">Company:</span> TheOrigin<br />
            <span className="font-semibold">Role:</span> Junior Fullstack Developer<br />
            <span className="font-semibold">Duration:</span> May 2023 - October 2024<br />
            <span className="font-semibold">Key Responsibilities:</span> Building and maintaining full-stack web applications, including backend API development and integration.<br />
            <span className="font-semibold">Skills Acquired:</span> Knowledge of Python API development, AI model integration (e.g., GPT, Gemini, Cohere), PHP Laravel, React for frontend, and integrating social media features into web applications using Next.js.
          </p>
        </div>
      ),
    },
    {
      title: "Oct 2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-light mb-6">
            <span className="font-semibold">Company:</span> Ekan<br />
            <span className="font-semibold">Role:</span> Development Intern<br />
            <span className="font-semibold">Duration:</span> October 2024 - Present<br />
            <span className="font-semibold">Key Responsibilities:</span> Mantaining existing systems.<br />
            <span className="font-semibold">Skills Acquired:</span> Gained experience with React Native using Expo for cross-platform mobile app development, as well as PHP (CodeIgniter) and React.js for web application development.
          </p>
        </div>
      ),
    },
  ];
  
  
  return (
    <div className="w-full py-8 px-4 md:px-8">
      <Timeline data={data} />
    </div>
  );
}