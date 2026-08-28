"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/generic/Logo";
import { ModeToggle } from "../modetoggle/ModeToggle";
import { MobileDrawer } from "./MobileDrawer";
import { Navs } from "./Navs";
import Socials from "./Socials";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Dictionary } from "@/lib/dictionaries/types";
import RobotFollowToggle from "../robot-companion/RobotFollowToggle";

const Header = ({ dictionary }: { dictionary: Dictionary["common"] }) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const revealAtTop = 24;
    const hideAfter = 96;
    const directionThreshold = 8;

    const handleScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const distance = currentScrollY - lastScrollY.current;
      const distanceToBottom =
        document.documentElement.scrollHeight - (currentScrollY + window.innerHeight);

      if (currentScrollY <= revealAtTop || distanceToBottom <= 32) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
      } else if (distance > directionThreshold && currentScrollY > hideAfter) {
        setIsVisible(false);
        lastScrollY.current = currentScrollY;
      } else if (distance < -directionThreshold) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
      }
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky left-0 top-0 z-50 transform-gpu px-3 py-3 transition-transform duration-300 motion-reduce:transition-none sm:px-6 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative mx-auto grid min-h-14 max-w-7xl grid-cols-[1fr_auto] items-center gap-4 rounded-2xl border border-border/70 bg-background/80 px-4 py-2 shadow-[0_18px_60px_-38px_rgba(15,23,42,0.75)] backdrop-blur-2xl sm:grid-cols-[1fr_auto_1fr] sm:px-5">
        <div className="flex min-w-0 items-center gap-4">
          <Logo />
          <div className="hidden min-w-0 border-s border-border/70 ps-4 lg:block">
            <p className="truncate font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
              {dictionary.footer.location}
            </p>
          </div>
        </div>
        <div className="hidden sm:block">
          <Navs dictionary={dictionary.navigation} />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1">
          <Socials className="hidden sm:flex" />
          <div className="hidden sm:block">
            <RobotFollowToggle dictionary={dictionary.robotControls} compact />
          </div>
          <LanguageSwitcher controls={dictionary.controls} languages={dictionary.languages} />
          <ModeToggle label={dictionary.controls.toggleTheme} />
          <div className="sm:hidden">
            <MobileDrawer dictionary={dictionary} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
