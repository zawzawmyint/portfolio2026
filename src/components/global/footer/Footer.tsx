import { Separator } from "@/components/ui/separator";
import BuildTools from "./BuildTools";
import Licensed from "./Licensed";
import type { Dictionary } from "@/lib/dictionaries/types";

const Footer = ({ dictionary }: { dictionary: Dictionary["common"]["footer"] }) => {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-border/60 py-10 text-center">
      <div className="aceternity-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="skeuo-inset skeuo-engraved relative mx-auto max-w-3xl rounded-2xl px-6 py-5">
        <Licensed dictionary={dictionary} />
        <Separator className="mx-auto my-4 max-w-lg opacity-50" />
        <BuildTools dictionary={dictionary} />
      </div>
    </footer>
  );
};

export default Footer;
