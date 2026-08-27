"use client";

import { Locale } from "@/lib/dictionaries/dictionaries";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

// Map countries to locales
const countryLocaleMap: { [key: string]: Locale } = {
  US: "en-US",
  PH: "en-PH",
  JP: "ja-JP",
  SA: "ar-SA",
  TH: "TH",
  // Add more country-locale mappings as needed
};

let hasDetected = false;

export function LocaleDetector() {
  const router = useRouter();
  const params = useParams();

  async function getUserCountry(): Promise<string | null> {
    if (!("geolocation" in navigator)) {
      console.warn("Geolocation is not supported by this browser.");
      return null;
    }

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
      return data.countryCode;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    if (hasDetected) return; // Prevent multiple executions

    getUserCountry()
      .then((countryCode) => {
        if (countryCode && countryLocaleMap[countryCode]) {
          const detectedLocale = countryLocaleMap[countryCode];
          const currentLocale = params.lang as Locale;
          if (detectedLocale !== currentLocale) {
            // Set a cookie with the detected locale
            document.cookie = `NEXT_LOCALE=${detectedLocale}; path=/; max-age=31536000; SameSite=Strict`;
            // Redirect to the detected locale
            router.push(
              `/${detectedLocale}${window.location.pathname.slice(
                currentLocale.length + 1
              )}`
            );
          }
        }
      })
      .catch(() => undefined)
      .finally(() => (hasDetected = true)); // Mark detection as completed
  }, [params.lang, router]);

  return null; // This component doesn't render anything
}
