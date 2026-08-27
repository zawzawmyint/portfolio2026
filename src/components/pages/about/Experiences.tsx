import ExperienceCard from "@/components/card/ExperienceCard";
import { Reveal } from "@/components/ui/aceternity/reveal";
import { Timeline } from "@/components/ui/aceternity/timeline";
import type { WorkExperience } from "@/lib/types/definitions";
import React from "react";
import type { Dictionary } from "@/lib/dictionaries/types";

interface ExperiencesProps {
  experiences: WorkExperience[];
  dictionary: Dictionary["about"]["sections"];
}

const Experiences = ({ experiences, dictionary }: ExperiencesProps) => {
  return (
    <section className="space-y-10">
      <Reveal>
        <p className="mb-3 font-mono text-sm uppercase tracking-[0.28em] text-indigo-500 dark:text-indigo-300">
          {dictionary.career}
        </p>
        <h2 className="text-balance text-4xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl">
          {dictionary.experiences}
        </h2>
      </Reveal>
      <Timeline
        items={experiences.map((experience) => ({
          title: experience.period,
          eyebrow: experience.company,
          content: <ExperienceCard experience={experience} fullTimeLabel={dictionary.fullTime} />,
        }))}
      />
    </section>
  );
};

export default Experiences;
