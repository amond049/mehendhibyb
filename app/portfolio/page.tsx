"use client";

import useSWR from "swr";
import { useTranslation } from "react-i18next";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PortfolioPage() {
  const { t } = useTranslation();
  const { data: images, error } = useSWR("/api/grabPortfolio", fetcher);

  if (error)
    return (
      <div className="text-center mt-10 text-[var(--portfolio-page-error-text)]">
        {t("portfolioPage.error")}
      </div>
    );

  if (!images)
    return (
      <div className="text-center mt-10 text-[var(--portfolio-page-loading-text)]">
        {t("portfolioPage.loading")}
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--portfolio-page-background)] p-6">
      
      <h1 className="text-3xl font-bold text-center mb-8 text-[var(--portfolio-page-title-text)]">
        {t("portfolioPage.title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center">

        {images.map((src: string) => (
          <div
            key={src}
            className="flex items-center justify-center rounded-lg overflow-hidden 
            bg-[var(--portfolio-page-card-background)] 
            shadow-[var(--portfolio-page-card-shadow)] 
            transition-transform duration-300 
            hover:scale-105 
            hover:shadow-[var(--portfolio-page-card-hover-shadow)]"
          >
            <img
              src={src}
              alt={t("portfolioPage.imageAlt")}
              className="rounded-lg w-full"
              loading="lazy"
            />
          </div>
        ))}

      </div>
    </div>
  );
}