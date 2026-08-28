import EditorialHero from "@/components/generic/EditorialHero";
import BaseContainer from "@/components/global/base-container/BaseContainer";
import Home from "@/components/pages/home/Home";
import { Button } from "@/components/ui/button";
import { getDictionary, Locale } from "@/lib/dictionaries/dictionaries";
import { Github } from "lucide-react";
import Link from "next/link";
import { MovingBorder } from "@/components/ui/aceternity/moving-border";

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
        variant="home"
        index="01"
        eyebrow={dict.common.navigation.home}
        title={dict.home.mainTitleDesc.title}
        description={dict.home.mainTitleDesc.desc}
        videoSrc="https://www.pexels.com/download/video/855282/"
        poster="/images/intro/Zack.dev.png"
        meta={[dict.common.footer.location, dict.about.sections.experiences, "Next.js · React · TypeScript"]}
      >
          <MovingBorder className="rounded-[calc(1rem-1px)] bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
            <Link href={`/${lang}/projects`} className="block">
              {dict.common.actions.myProjects}
            </Link>
          </MovingBorder>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="https://github.com/zawzawmyint" target="_blank" rel="noreferrer">
              <Github />
              Github
            </Link>
          </Button>
      </EditorialHero>
      <BaseContainer>
        <Home dictionary={dict} lang={lang} />
      </BaseContainer>
    </>
  );
}
