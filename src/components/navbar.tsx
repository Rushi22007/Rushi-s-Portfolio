import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { logo, menu, close } from "../assets";
import { NAV_LINKS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

type NavbarProps = {
  hide: boolean;
};

// Navbar
export const Navbar = ({ hide }: NavbarProps) => {
  // state variables
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        styles.paddingX,
        "w-full flex items-center py-4 sm:py-5 fixed top-0 z-20 bg-primary/95 backdrop-blur-md transition-all duration-300 border-b border-white/5",
        isAtBottom || hide ? "mt-0 shadow-lg shadow-black/40" : "mt-16 sm:mt-20",
      )}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 z-30"
          onClick={() => {
            setActive("");
            setToggle(false);
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="Logo" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
          <div className="flex flex-col">
            <p className="text-white text-[15px] sm:text-[18px] font-bold tracking-tight cursor-pointer leading-tight">
              Rushikesh Chamle
            </p>
            <span className="text-[#915eff] text-[11px] sm:text-[12px] font-medium leading-none">
              Data Analyst &amp; Python Dev
            </span>
          </div>
        </Link>

        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="list-none flex flex-row items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li
                key={link.id}
                className={cn(
                  active === link.title ? "text-white font-semibold" : "text-secondary",
                  "hover:text-white text-[15px] font-medium cursor-pointer transition-colors",
                )}
                onClick={() => !link.link && setActive(link.title)}
              >
                {link.link ? (
                  <a href={link.link} target="_blank" rel="noreferrer noopener">
                    {link.title}
                  </a>
                ) : (
                  <a href={`#${link.id}`}>{link.title}</a>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Rushi's_Resume.pdf"
            className="flex items-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-[#915eff] to-[#7038e8] text-white font-semibold text-[13px] shadow-md shadow-[#915eff]/30 hover:opacity-90 hover:scale-105 active:scale-95 transition-all"
            title="Download Rushikesh's Resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <span>Resume</span>
          </a>
        </div>

        {/* Hamburger Trigger for Mobile */}
        <div className="md:hidden flex items-center z-30">
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg bg-tertiary/70 text-white hover:bg-tertiary transition-colors"
            onClick={() => setToggle((prev) => !prev)}
          >
            <img
              src={toggle ? close : menu}
              alt="Menu"
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>

        {/* Mobile Slide-Out Drawer Overlay */}
        {toggle && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-20 md:hidden transition-opacity"
            onClick={() => setToggle(false)}
          />
        )}

        {/* Mobile Slide-out Menu Panel */}
        <aside
          className={cn(
            "fixed top-0 right-0 h-screen w-72 bg-[#100d25] border-l border-white/10 z-20 shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out md:hidden",
            toggle ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex flex-col mt-16">
            <p className="text-xs uppercase tracking-wider text-secondary font-semibold mb-4 px-2">
              Navigation
            </p>
            <ul className="list-none flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.id}
                  className={cn(
                    active === link.title
                      ? "text-white bg-tertiary/80 font-semibold"
                      : "text-secondary hover:text-white hover:bg-tertiary/40",
                    "rounded-xl px-4 py-3 text-[16px] font-medium transition-all",
                  )}
                  onClick={() => {
                    if (!link.link) {
                      setActive(link.title);
                      setToggle(false);
                    }
                  }}
                >
                  {link.link ? (
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="block w-full"
                    >
                      {link.title}
                    </a>
                  ) : (
                    <a href={`#${link.id}`} className="block w-full">
                      {link.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Dedicated Resume Action in Mobile Drawer */}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <p className="text-xs text-secondary px-1">
              Looking for credentials &amp; experience?
            </p>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Rushi's_Resume.pdf"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#915eff] to-[#7038e8] text-white font-bold text-[15px] shadow-lg shadow-[#915eff]/30 active:scale-98 transition-all"
              onClick={() => setToggle(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <span>Download Resume (PDF)</span>
            </a>
            <span className="text-center text-[11px] text-secondary/70">
              Rushikesh Chamle &bull; Data Analyst
            </span>
          </div>
        </aside>
      </div>
    </nav>
  );
};
