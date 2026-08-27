import MainTitleDesc from "@/components/generic/MainTitleDesc";
import BaseContainer from "@/components/global/base-container/BaseContainer";
import About from "@/components/pages/about/About";
import { Button } from "@/components/ui/button";
import { getDictionary, Locale } from "@/lib/dictionaries/dictionaries";
import { DownloadCloud, Linkedin } from "lucide-react";
import Link from "next/link";

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
        title={dict.about.mainTitleDesc.title}
        desc={dict.about.mainTitleDesc.desc}
        high="min-h-[400px]"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="bg-white text-slate-950 hover:bg-white/90">
            <Link
              href="https://www.linkedin.com/in/zaw-zaw-myint-29745a199/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin />
              LinkedIn
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 bg-slate-950/35 text-white backdrop-blur-md hover:bg-white hover:text-slate-950">
            <a href="/resume/Zaw_Zaw_Myint_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <DownloadCloud />
              {dict.contact.resume}
            </a>
          </Button>
        </div>
      </MainTitleDesc>
      <BaseContainer>
        <About dictionary={dict.about} />
      </BaseContainer>
    </>
  );
}
