import EditorialHero from "@/components/generic/EditorialHero";
import BaseContainer from "@/components/global/base-container/BaseContainer";
import Projects from "@/components/pages/projects/Projects";
import { getDictionary, Locale } from "@/lib/dictionaries/dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <>
      <EditorialHero
        variant="projects"
        index="03"
        eyebrow={dict.common.navigation.projects}
        title={dict.projects.mainTitleDesc.title}
        description={dict.projects.mainTitleDesc.desc}
        videoSrc="https://www.pexels.com/download/video/2909914/"
        poster="/images/intro/cbjm.jpg"
        meta={[dict.projects.selectedBuild, dict.common.actions.myProjects, "2022 — 2026"]}
      />
      <BaseContainer>
        <Projects dictionary={dict.projects} />
      </BaseContainer>
    </>
  );
}
