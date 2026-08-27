import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/dictionaries/dictionaries";

const IntroductionDesc = ({
  dictionary,
  lang,
}: {
  dictionary: Dictionary["home"]["introduction"];
  lang: Locale;
}) => {
  return (
    <div className="space-y-5 text-pretty text-base leading-7 text-muted-foreground sm:text-[1.025rem] sm:leading-8">
      {dictionary.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>
        {dictionary.currentBefore}{" "}
        <Link
          href={"https://www.mhmarkets.com/"}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline decoration-indigo-400 underline-offset-4"
        >
          MH Markets
        </Link>
        {" "}{dictionary.currentAfter}
      </p>
      <p>
        {dictionary.closingBefore}{" "}
        <Link
          href={"https://github.com/zawzawmyint"}
          target="_blank"
          className="font-medium text-foreground underline decoration-indigo-400 underline-offset-4"
        >
          GitHub
        </Link>{" "}
        {dictionary.closingMiddle}{" "}
        <Link href={`/${lang}/contact`} className="font-medium text-foreground underline decoration-indigo-400 underline-offset-4">
          {dictionary.closingContact}
        </Link>{" "}
        {dictionary.closingAfter}
      </p>
    </div>
  );
};

export default IntroductionDesc;
