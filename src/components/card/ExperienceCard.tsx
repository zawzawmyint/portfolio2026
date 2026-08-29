import type { WorkExperience } from "@/lib/types/definitions";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CardSpotlight } from "../ui/aceternity/card-spotlight";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

const ExperienceCard = ({ experience, fullTimeLabel }: { experience: WorkExperience; fullTimeLabel: string }) => {
  return (
    <CardSpotlight className="w-full p-5 sm:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {experience.position}
            </h3>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              <Link
                className="underline decoration-brand/60 underline-offset-4 hover:text-foreground"
                href={experience.company_link}
                target="_blank"
                rel="noreferrer"
              >
                {experience.company} · {fullTimeLabel} · {experience.location}
              </Link>
            </p>
          </div>
          <div className="skeuo-inset relative size-20 shrink-0 overflow-hidden rounded-2xl bg-secondary sm:size-24">
            <Image
              src={experience.companyImage}
              alt={`${experience.company} logo`}
              fill
              sizes="96px"
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-mono text-sm uppercase tracking-[0.18em] text-brand">
            {experience.project}
          </h4>
          <ScrollArea className="h-64 w-full pr-4">
            <ul className="space-y-3">
              {experience.tasks.map((task, index) => (
                <li
                  key={`${task}-${index}`}
                  className="flex gap-3 text-sm leading-6 text-muted-foreground"
                >
                  <CircleCheck className="mt-1 size-4 shrink-0 text-brand" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <div className="flex flex-wrap gap-2">
            {experience.skills.split(",").map((skill, index) => (
              <Badge
                className="rounded-full bg-background/60"
                key={`${skill}-${index}`}
                variant="outline"
              >
                {skill.trim()}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </CardSpotlight>
  );
};

export default ExperienceCard;
