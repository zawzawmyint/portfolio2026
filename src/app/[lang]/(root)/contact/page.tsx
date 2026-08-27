import MainTitleDesc from "@/components/generic/MainTitleDesc";
import BaseContainer from "@/components/global/base-container/BaseContainer";
import Contact from "@/components/pages/contact/Contact";
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
        title={dict.contact.mainTitleDesc.title}
        desc={dict.contact.mainTitleDesc.desc}
        url="https://www.pexels.com/download/video/29161326/"
      />
      <BaseContainer>
        <Contact dictionary={dict.contact} />
      </BaseContainer>
    </>
  );
}
