import MainTitleDesc from "@/components/generic/MainTitleDesc";
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
      <MainTitleDesc
        title={dict.projects.mainTitleDesc.title}
        desc={dict.projects.mainTitleDesc.desc}
        url="https://www.pexels.com/download/video/2909914/"
      />
      <BaseContainer>
        <Projects dictionary={dict.projects} />
      </BaseContainer>
    </>
  );
}
