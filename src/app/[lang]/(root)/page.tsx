import MainTitleDesc from "@/components/generic/MainTitleDesc";
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
      <MainTitleDesc
        title={dict.home.mainTitleDesc.title}
        desc={dict.home.mainTitleDesc.desc}
        url="https://www.pexels.com/download/video/855282/"
        high="min-h-[470px]"
      >
        <h4 className="text-sm">{dict.home.mainTitleDesc.subdesc}</h4>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <MovingBorder className="rounded-[calc(1rem-1px)] bg-white px-5 py-2.5 text-sm font-semibold text-slate-950">
            <Link href={`/${lang}/projects`} className="block">
              {dict.common.actions.myProjects}
            </Link>
          </MovingBorder>
          <Button asChild variant="outline" className="border-white/20 bg-slate-950/35 text-white backdrop-blur-md hover:bg-white hover:text-slate-950">
            <Link href="https://github.com/zawzawmyint" target="_blank" rel="noreferrer">
              <Github />
              Github
            </Link>
          </Button>
        </div>
      </MainTitleDesc>
      <BaseContainer>
        <Home dictionary={dict.home.introduction} lang={lang} />
      </BaseContainer>
    </>
  );
}
