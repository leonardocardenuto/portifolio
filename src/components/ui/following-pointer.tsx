import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { getVisitorPosition } from "@/components/ui/services/visitorService";

export const FollowerPointerCard = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [isInside, setIsInside] = useState(false);
  const [hideAll, setHideAll] = useState(false); 
  const [visitorPosition, setVisitorPosition] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        ref.current.getBoundingClientRect();
      }
    };

    const checkInitialPosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const cursorX = window.innerWidth / 2;
        const cursorY = window.innerHeight / 2;

        const isInsideArea =
          cursorX >= rect.left &&
          cursorX <= rect.right &&
          cursorY >= rect.top &&
          cursorY <= rect.bottom;

        setIsInside(isInsideArea);
      }
    };

    window.addEventListener("scroll", handleScroll);
    checkInitialPosition();

    const fetchVisitorPosition = async () => {
      const position = await getVisitorPosition();
      setVisitorPosition(position);
    };

    fetchVisitorPosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("no-pointer")) {
      setHideAll(true); 
    } else {
      setHideAll(false);
    }

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
  };

  const handleMouseEnter = () => setIsInside(true);

  const handleMouseLeave = () => {
    setIsInside(false);
    setHideAll(false); 
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={ref}
      className={cn("relative", className)}
      style={{
        cursor: "none",
      }}
    >
      <AnimatePresence>
        {isInside && !hideAll && (
          <FollowPointer
            x={x}
            y={y}
            hideCursor={hideAll}
            title={visitorPosition !== "" ? `${visitorPosition} VISITOR` : title}
          />
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  hideCursor,
  title,
}: {
  x: any;
  y: any;
  hideCursor: boolean;
  title?: string | React.ReactNode;
}) => {
  const colors = [
    "var(--sky-500)",
    "var(--neutral-500)",
    "var(--teal-500)",
    "var(--green-500)",
    "var(--blue-500)",
    "var(--red-500)",
    "var(--yellow-500)",
  ];

  return (
    <motion.div
      className="absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      {!hideCursor && (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="1"
          viewBox="0 0 16 16"
          className="h-6 w-6 text-sky-500 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-sky-600"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
        </svg>
      )}

      {!hideCursor && (
        <motion.div
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          }}
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.5,
            opacity: 0,
          }}
          className={
            "px-2 py-2 bg-neutral-200 text-white whitespace-nowrap min-w-max text-xs rounded-full"
          }
        >
          {title || `#? VISITOR`}
        </motion.div>
      )}
    </motion.div>
  );
};