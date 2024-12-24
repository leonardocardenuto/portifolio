"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import "../styles/navbar.css";

export const Navbar = ({
  navItems,
  className,
}: {
  navItems: { name: string; link?: string; icon?: JSX.Element; action?: () => void }[];
  className?: string;
}) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY <= 50 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`navbar-container ${className}`}>
      <nav
        className={`navbar ${visible ? "navbar-visible" : "navbar-hidden"}`}
      >
        <ul className="navbar-items">
          {navItems.map((navItem, idx) => (
            <li key={idx} className="nav-item">
              {navItem.action ? (
                <button
                  onClick={navItem.action}
                  className="nav-link nav-button"
                >
                  {navItem.icon && (
                    <span className="nav-icon">{navItem.icon}</span>
                  )}
                  <span className="nav-text">{navItem.name}</span>
                </button>
              ) : (
                <Link href={navItem.link || "#"} className="nav-link">
                  {navItem.icon && (
                    <span className="nav-icon">{navItem.icon}</span>
                  )}
                  <span className="nav-text">{navItem.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};