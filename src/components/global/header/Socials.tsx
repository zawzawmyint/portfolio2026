import { Button } from "@/components/ui/button";
import { Github, LucideLinkedin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const socials: { href: string; label: string; icon: React.ReactNode }[] = [
  { href: "https://github.com/zawzawmyint", label: "GitHub", icon: <Github /> },
  {
    href: "https://www.linkedin.com/in/zaw-zaw-myint-29745a199/",
    label: "LinkedIn",
    icon: <LucideLinkedin />,
  },
  // { href: "https://x.com/ZmMusk", icon: <TwitterIcon size={18} /> },
];
const Socials = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-wrap items-center", className)}>
      {socials.map((social, i) => (
        <Link href={social.href} key={i + 1} target="_blank" rel="noreferrer">
          <Button className="size-9 rounded-xl" aria-label={social.label} size={"icon"} variant={"ghost"}>
            {social.icon}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
