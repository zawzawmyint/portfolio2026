import EditorialHero from "@/components/generic/EditorialHero";
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
      <EditorialHero
        variant="contact"
        index="05"
        eyebrow={dict.common.navigation.contact}
        title={dict.contact.mainTitleDesc.title}
        description={dict.contact.mainTitleDesc.desc}
        videoSrc="https://www.pexels.com/download/video/29161326/"
        poster="/images/intro/dt.jpg"
        meta={[dict.contact.location, dict.contact.eyebrow]}
      />
      <BaseContainer>
        <Contact dictionary={dict.contact} />
      </BaseContainer>
    </>
  );
}
