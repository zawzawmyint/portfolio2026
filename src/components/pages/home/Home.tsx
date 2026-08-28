import Introduction from "./introduction/Introduction";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/dictionaries/dictionaries";
import db from "../../../../_data/db.json";
import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, Code2, FileText, Layers3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/aceternity/reveal";
import { getBlogs } from "@/lib/data/blogs/blogsData";
import type { Blog } from "@/lib/types/definitions";
import { EditorialArrow } from "@/components/ui/EditorialArrow";

const Home = async ({
  dictionary,
  lang,
}: {
  dictionary: Dictionary;
  lang: Locale;
}) => {
  const selectedProjects = db.projects.slice(0, 3);
  const currentRoles = db.workexperiences.slice(0, 2);
  const editorial = dictionary.home.editorial;
  let latestBlog: Blog | null = null;
  try {
    const blogData = await getBlogs();
    latestBlog = blogData.dataMedium?.[0] ?? null;
  } catch {
    latestBlog = null;
  }

  return (
    <div className="space-y-28 sm:space-y-36">
      <Introduction dictionary={dictionary.home.introduction} lang={lang} />

      <section className="grid gap-8 border-y border-border/70 py-12 lg:grid-cols-[0.68fr_1.32fr] lg:py-16">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-indigo-500 dark:text-indigo-300">
            02 · {editorial.currentFocus}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="max-w-4xl">
            <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">
              {editorial.currentTitle}
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {dictionary.home.introduction.currentAfter}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {db.workexperiences[0].skills
                .split(",")
                .slice(0, 8)
                .map((skill) => (
                  <Badge key={skill} variant="outline" className="rounded-full px-3 py-1">
                    {skill.trim()}
                  </Badge>
                ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section data-robot-guide="projectsGallery">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-indigo-500 dark:text-indigo-300">
                03 · {editorial.selectedWork}
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
                {editorial.workTitle}
              </h2>
            </div>
          </Reveal>
          <Link
            className="group/link inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-indigo-400/60 underline-offset-8 transition-colors hover:text-indigo-500 motion-reduce:transition-none"
            href={`/${lang}/projects`}
          >
            {editorial.viewAll}
            <EditorialArrow className="size-4" />
          </Link>
        </div>
        <div className="divide-y divide-border/70 border-y border-border/70">
          {selectedProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.06}>
              <article className="group grid gap-6 py-8 lg:grid-cols-[5rem_1fr_1.2fr_auto] lg:items-center">
                <span className="font-mono text-xs text-muted-foreground">
                  0{index + 1}
                </span>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={project.image}
                    alt={dictionary.projects.previewLabel.replace("{name}", project.name)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                    {dictionary.projects.descriptions[
                      project.name as keyof typeof dictionary.projects.descriptions
                    ] ?? project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.13em] text-muted-foreground">
                    {project.stacks.map((stack) => (
                      <span key={stack}>{stack}</span>
                    ))}
                  </div>
                </div>
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={dictionary.projects.demoLabel.replace("{name}", project.name)}
                  className="group/link grid size-12 place-items-center rounded-full border border-border transition hover:border-foreground hover:bg-foreground hover:text-background motion-reduce:transition-none"
                >
                  <EditorialArrow className="size-5" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-indigo-500 dark:text-indigo-300">
            04 · {editorial.capabilities}
          </p>
        </Reveal>
        <div className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-3">
          {[
            {
              icon: Code2,
              title: dictionary.about.sections.frontend,
              text: "React · Next.js · TypeScript · Nuxt · Vue",
            },
            {
              icon: Layers3,
              title: dictionary.about.sections.backend,
              text: "Strapi · Payload · PostgreSQL · Redis · AWS S3",
            },
            {
              icon: BriefcaseBusiness,
              title: editorial.delivery,
              text: "Accessibility · i18n · Testing · SEO · Performance",
            },
          ].map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.07} className="bg-background">
              <div className="h-full p-7 sm:p-9">
                <Icon className="size-5 text-indigo-500" />
                <h3 className="mt-12 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-indigo-500 dark:text-indigo-300">
            05 · {editorial.experience}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            {editorial.experienceTitle}
          </h2>
        </div>
        <div className="divide-y divide-border/70 border-y border-border/70">
          {currentRoles.map((role, index) => (
            <Reveal key={`${role.company}-${role.period}`} delay={index * 0.07}>
              <article className="grid gap-3 py-7 sm:grid-cols-[1fr_auto]">
                <div>
                  <h3 className="text-xl font-semibold">{role.position}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {role.company} · {role.location}
                  </p>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {role.period}
                </p>
              </article>
            </Reveal>
          ))}
          <Link
            href={`/${lang}/about`}
            className="group/link flex min-h-14 items-center justify-between font-semibold transition-colors hover:text-indigo-500 motion-reduce:transition-none"
          >
            {editorial.fullStory}
            <EditorialArrow className="size-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-foreground px-7 py-12 text-background sm:px-12 sm:py-16">
        <FileText className="absolute end-8 top-8 size-8 opacity-35" />
        <p className="font-mono text-xs uppercase tracking-[0.24em] opacity-65">
          06 · {editorial.writing}
        </p>
        <h2 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">
          {editorial.writingTitle}
        </h2>
        {latestBlog && (
          <Link
            href={latestBlog.link}
            target="_blank"
            rel="noreferrer"
            className="mt-8 block max-w-3xl border-s-2 border-background/35 ps-5"
          >
            <span className="font-mono text-xs uppercase tracking-[0.16em] opacity-65">
              {latestBlog.date}
            </span>
            <strong className="mt-2 block text-xl sm:text-2xl">{latestBlog.title}</strong>
          </Link>
        )}
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            className="group/link inline-flex min-h-11 items-center gap-2 rounded-full bg-background px-5 font-semibold text-foreground"
            href={`/${lang}/blogs`}
          >
            {editorial.readNotes}
            <EditorialArrow className="size-4" />
          </Link>
          <Link
            className="inline-flex min-h-11 items-center rounded-full border border-background/30 px-5 font-semibold"
            href={`/${lang}/contact`}
          >
            {editorial.contact}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
