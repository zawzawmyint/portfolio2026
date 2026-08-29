import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries/types";

const BuildTools = ({ dictionary }: { dictionary: Dictionary["common"]["footer"] }) => {
  const builds = [
    { text: dictionary.builtWith, platform: "Next.js 16", href: "https://nextjs.org/" },
    { text: dictionary.hostedWith, platform: "Netlify", href: "https://www.netlify.com/" },
    { text: dictionary.sourceAt, platform: "GitHub", href: "https://github.com/zawzawmyint" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-end">
      {builds.map((build, i) => (
        <div className="flex gap-1 text-xs" key={i + build.text}>
          <p>{build.text}</p>
          <Link className="underline decoration-brand/60 underline-offset-4" href={build.href} target="_blank" rel="noreferrer">
            {build.platform}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BuildTools;
