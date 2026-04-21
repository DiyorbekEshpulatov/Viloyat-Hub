"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");

  const handleLanguageChange = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-3 py-1 rounded transition-colors ${
          locale === "en"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-border"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange("uz")}
        className={`px-3 py-1 rounded transition-colors ${
          locale === "uz"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-border"
        }`}
      >
        UZ
      </button>
    </div>
  );
}
