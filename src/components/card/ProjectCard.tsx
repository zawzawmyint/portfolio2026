import type { Project } from "@/lib/types/definitions";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../ui/aceternity/reveal";
import { Badge } from "../ui/badge";
import type { Dictionary } from "@/lib/dictionaries/types";
import { cn } from "@/lib/utils";
import { EditorialArrow } from "../ui/EditorialArrow";

const ProjectCard = ({
  project,
  labels,
  index,
}: {
  project: Project;
  labels: Dictionary["projects"];
  index: number;
}) => {
  const formatLabel = (template: string) => template.replace("{name}", project.name);
  const isReversed = index % 2 === 1;

  return (
    <Reveal>
      <article className="group overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/75 p-3 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.75)]">
        <div className={cn("grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch", isReversed && "lg:grid-cols-[0.85fr_1.15fr]")}>
          <div className={cn("relative min-h-[19rem] overflow-hidden rounded-[1.25rem] bg-muted sm:min-h-[25rem]", isReversed && "lg:order-2")}>
            <Image
              src={project.image}
              alt={formatLabel(labels.previewLabel)}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
            <span className="absolute start-5 top-5 rounded-full border border-white/20 bg-slate-950/45 px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-white backdrop-blur-md">{labels.projectLabel} / {String(index + 1).padStart(2, "0")}</span>
          </div>

          <div className={cn("flex min-h-[24rem] flex-col justify-between p-5 sm:p-8 lg:p-10", isReversed && "lg:order-1")}>
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand">{labels.selectedBuild} · 2026</p>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl">{project.name}</h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">{project.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.stacks.map((stack, stackIndex) => <Badge className="rounded-full bg-background/60" key={`${stack}-${stackIndex}`} variant="outline">{stack}</Badge>)}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-border/70 pt-6">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{labels.exploreProject}</span>
              <div className="flex shrink-0 gap-2">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={formatLabel(labels.sourceLabel)}
                    className="group/link grid size-11 place-items-center rounded-full border border-border transition hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand motion-reduce:transition-none"
                  >
                    <Github className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover/link:translate-y-0" />
                  </Link>
                )}
                {project.demo && (
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={formatLabel(labels.demoLabel)}
                    className="group/link grid size-11 place-items-center rounded-full bg-foreground text-background transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand motion-reduce:transition-none motion-reduce:hover:scale-100"
                  >
                    <EditorialArrow className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

export default ProjectCard;
