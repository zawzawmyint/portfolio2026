import { BentoGrid, BentoGridItem } from "@/components/ui/aceternity/bento-grid";
import { Reveal } from "@/components/ui/aceternity/reveal";
import IntroductionDesc from "./IntroductionDesc";
import { DeveloperScene } from "./DeveloperScene";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/dictionaries/dictionaries";

const Introduction = ({
  dictionary,
  lang,
}: {
  dictionary: Dictionary["home"]["introduction"];
  lang: Locale;
}) => {
  return (
    <section aria-labelledby="introduction-title" data-robot-guide="homeIntroduction">
      <Reveal>
        <p className="mb-3 font-mono text-sm uppercase tracking-[0.28em] text-brand">
          {dictionary.eyebrow}
        </p>
        <h2
          id="introduction-title"
          className="mb-8 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-[-0.025em] sm:mb-10 sm:text-5xl"
        >
          {dictionary.title}
        </h2>
      </Reveal>
      <BentoGrid>
        <BentoGridItem className="lg:col-span-4">
          <IntroductionDesc dictionary={dictionary} lang={lang} />
        </BentoGridItem>
        <BentoGridItem className="min-h-[24rem] p-2 sm:p-2 lg:col-span-3">
          <DeveloperScene dictionary={dictionary.scene} />
        </BentoGridItem>
      </BentoGrid>
    </section>
  );
};

export default Introduction;
