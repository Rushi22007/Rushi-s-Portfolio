import { Link } from "react-router-dom";

import { SOCIALS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

// Footer
const Footer = () => {
  return (
    <nav
      className={cn(
        styles.paddingX,
        "w-full flex items-center py-8 bg-primary border-t border-t-secondary/5"
      )}
    >
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <p className="text-white text-md font-bold">
            &copy; Rushikesh Chamle {new Date().getFullYear()}. All rights reserved.
          </p>
          <span className="hidden sm:inline text-secondary/40">|</span>
          <div className="flex items-center gap-4 text-xs text-secondary">
            <a
              href="mailto:officialrushikesh22@gmail.com"
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current text-[#915eff]" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              officialrushikesh22@gmail.com
            </a>
            <span className="text-secondary/40">•</span>
            <a
              href="tel:+918767599309"
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current text-[#915eff]" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              +91 8767599309
            </a>
          </div>
        </div>

        {/* Nav Links (Desktop) */}
        <ul className="list-none hidden flex-row sm:flex gap-10">
          {SOCIALS.map((social) => (
            <li
              key={social.name}
              className="text-secondary font-poppins font-medium cursor-pointer text-[16px] opacity-80 hover:opacity-100 transition"
            >
              <Link to={social.link} target="_blank" rel="noreferrer noopener">
                <img src={social.icon} alt={social.name} className="h-6 w-6" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Footer;
