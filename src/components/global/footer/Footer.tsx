import { Separator } from "@/components/ui/separator";
import Logo from "@/components/generic/Logo";
import Socials from "../header/Socials";
import BuildTools from "./BuildTools";
import Licensed from "./Licensed";
import type { Dictionary } from "@/lib/dictionaries/types";

const Footer = ({ dictionary }: { dictionary: Dictionary["common"]["footer"] }) => {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-border/60 px-3 py-10 sm:mt-24 sm:px-5 sm:py-14">
      <div className="aceternity-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="skeuo-inset skeuo-engraved relative mx-auto max-w-6xl rounded-3xl px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-start">
          <div className="space-y-3">
            <div className="flex justify-center sm:justify-start">
              <Logo />
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              {dictionary.tagline}
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-300">
              {dictionary.location}
            </p>
          </div>
          <Socials className="justify-center sm:justify-end" />
        </div>
        <Separator className="my-6 opacity-50" />
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
          <Licensed dictionary={dictionary} />
          <BuildTools dictionary={dictionary} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
