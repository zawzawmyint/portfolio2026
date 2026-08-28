import { Separator } from "@/components/ui/separator";
import Logo from "@/components/generic/Logo";
import Socials from "../header/Socials";
import BuildTools from "./BuildTools";
import Licensed from "./Licensed";
import type { Dictionary } from "@/lib/dictionaries/types";

const Footer = ({ dictionary }: { dictionary: Dictionary["common"] }) => {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-border/60 px-4 py-8 sm:mt-32 sm:px-6 sm:py-12">
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px)] [background-size:5rem_100%] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border/70 bg-background/75 p-7 shadow-[0_30px_100px_-55px_rgba(15,23,42,0.65)] backdrop-blur-xl sm:p-10 lg:p-14">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-indigo-500 dark:text-indigo-300">
              {dictionary.navigation.contact} · 05
            </p>
            <h2 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {dictionary.footer.tagline}
            </h2>
            <a className="mt-8 inline-flex min-h-11 items-center border-b border-foreground pb-1 text-lg font-semibold" href="mailto:cuzawzawmyint@gmail.com">
              cuzawzawmyint@gmail.com
            </a>
          </div>
          <div className="space-y-5 lg:text-end">
            <div className="flex lg:justify-end">
              <Logo />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-300">
              {dictionary.footer.location}
            </p>
            <Socials className="lg:justify-end" />
          </div>
        </div>
        <Separator className="my-6 opacity-50" />
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Licensed dictionary={dictionary.footer} />
          <BuildTools dictionary={dictionary.footer} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
