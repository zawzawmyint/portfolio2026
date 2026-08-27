"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, usePathname, useRouter } from "next/navigation";
import type { Dictionary } from "@/lib/dictionaries/types";

const languages = [
  { value: "en-US", code: "EN", labelKey: "english" },
  { value: "TH", code: "TH", labelKey: "thai" },
  { value: "MM", code: "MM", labelKey: "myanmar" },
  { value: "ja-JP", code: "JP", labelKey: "japanese" },
  { value: "ar-SA", code: "AR", labelKey: "arabic" },
] as const;

type LanguageValue = (typeof languages)[number]["value"];

function LanguageFlag({ language }: { language: LanguageValue }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/10"
      viewBox="0 0 24 16"
    >
      {language === "en-US" && (
        <>
          <rect width="24" height="16" fill="#fff" />
          {[0, 4, 8, 12].map((y) => (
            <rect key={y} y={y} width="24" height="2" fill="#d22630" />
          ))}
          <rect width="10" height="8" fill="#173f8a" />
          {[2, 5, 8].map((x) =>
            [2, 5].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="0.55" fill="#fff" />
            )),
          )}
        </>
      )}
      {language === "TH" && (
        <>
          <rect width="24" height="16" fill="#a51931" />
          <rect y="2.5" width="24" height="11" fill="#fff" />
          <rect y="5" width="24" height="6" fill="#2d2a4a" />
        </>
      )}
      {language === "MM" && (
        <>
          <rect width="24" height="5.34" fill="#fecb00" />
          <rect y="5.33" width="24" height="5.34" fill="#34b233" />
          <rect y="10.66" width="24" height="5.34" fill="#ea2839" />
          <path
            d="m12 2.6 1.35 4.15h4.36l-3.53 2.56 1.35 4.15L12 10.9l-3.53 2.56 1.35-4.15-3.53-2.56h4.36Z"
            fill="#fff"
          />
        </>
      )}
      {language === "ja-JP" && (
        <>
          <rect width="24" height="16" fill="#fff" />
          <circle cx="12" cy="8" r="4.25" fill="#bc002d" />
        </>
      )}
      {language === "ar-SA" && (
        <>
          <rect width="24" height="16" fill="#006c35" />
          <path d="M6 5.1h12M7.5 7h9M9 9h6" stroke="#fff" strokeWidth="1" />
          <path d="M6.5 11.4h10.5l1.5-.8" stroke="#fff" strokeWidth="0.8" />
        </>
      )}
    </svg>
  );
}

export default function LanguageSwitcher({
  controls,
  languages: languageLabels,
}: {
  controls: Dictionary["common"]["controls"];
  languages: Dictionary["common"]["languages"];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const lang = params.lang as string;
  const selectedLanguage =
    languages.find((language) => language.value === lang) ?? languages[0];

  const handleLanguageChange = (value: string) => {
    // Split the pathname into segments
    const pathSegments = pathname.split("/");

    // Replace the language segment (should be the first one after the initial slash)
    pathSegments[1] = value;

    // Join the segments back together
    const newPathname = pathSegments.join("/");

    router.push(newPathname);
  };

  return (
    <Select onValueChange={handleLanguageChange} value={lang}>
      <SelectTrigger
        aria-label={controls.selectLanguage}
        className="skeuo-control h-9 w-[5.25rem] gap-1 rounded-xl bg-background/70 px-2.5"
      >
        <SelectValue>
          <span className="flex items-center gap-1.5">
            <LanguageFlag language={selectedLanguage.value} />
            <span className="text-xs font-semibold">{selectedLanguage.code}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="min-w-[10rem] rounded-xl">
        <SelectGroup>
          {languages.map((language) => (
            <SelectItem key={language.value} value={language.value}>
              <span className="flex items-center gap-2.5">
                <LanguageFlag language={language.value} />
                <span>{languageLabels[language.labelKey]}</span>
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
