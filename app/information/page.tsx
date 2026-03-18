"use client";

import { useTranslation } from "react-i18next";
import HennaDivider from "@/components/divider";
import StainingResultsGallery from "@/components/stainingResults";

export default function InformationPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-[var(--information-page-background)] px-6 py-16 flex justify-center">
      <div className="w-full max-w-6xl space-y-24">

        {/* Page Header */}
        <section className="text-center space-y-6 pb-6">
          <div className="h-1 w-24 mx-auto bg-[var(--accent-color)] rounded-full"></div>

          <h1 className="text-4xl md:text-5xl font-bold">
            {t("informationPage.title")}
          </h1>

          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-[var(--information-page-subtitle-text)] leading-relaxed">
              {t("informationPage.subtitle")}
            </p>
          </div>
        </section>

        <HennaDivider />

        {/* History Section */}
        <section className="grid md:grid-cols-2 gap-10 items-start bg-[var(--information-page-section-bg)] backdrop-blur-sm rounded-3xl p-10 shadow-sm">

          {/* Henna History */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--information-page-heading-text)]">
              {t("informationPage.hennaTitle")}
            </h2>

            <div className="space-y-4 text-[var(--information-page-body-text)] leading-relaxed text-justify">
              <p>{t("informationPage.hennaParagraph1")}</p>
              <p>{t("informationPage.hennaParagraph2")}</p>
            </div>
          </div>

          {/* Jagua History */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--information-page-heading-text)]">
              {t("informationPage.jaguaTitle")}
            </h2>

            <div className="text-[var(--information-page-body-text)] leading-relaxed text-justify">
              <p>{t("informationPage.jaguaParagraph")}</p>
            </div>
          </div>

        </section>

        <HennaDivider />

        {/* Ingredients Section */}
        <section className="space-y-12 bg-[var(--information-page-section-bg)] backdrop-blur-sm rounded-3xl p-10 shadow-sm">

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-[var(--information-page-heading-text)]">
              {t("informationPage.ingredientsHeader")}
            </h2>

            <div className="w-16 h-[2px] mx-auto bg-[var(--information-page-divider-bg)] rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Henna Ingredients */}
            <div className="bg-[var(--information-page-card-bg)] shadow-md rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--information-page-icon-bg)] flex items-center justify-center text-[var(--information-page-icon-text)] font-bold">
                H
              </div>

              <h3 className="font-semibold text-lg mb-2 text-[var(--information-page-heading-text)]">
                {t("informationPage.hennaIngredientsTitle")}
              </h3>

              <p className="italic text-sm leading-relaxed text-[var(--information-page-body-text)]">
                {t("informationPage.hennaIngredientsList")}
              </p>
            </div>

            {/* Jagua Ingredients */}
            <div className="bg-[var(--information-page-card-bg)] shadow-md rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--information-page-icon-bg)] flex items-center justify-center text-[var(--information-page-icon-text)] font-bold">
                J
              </div>

              <h3 className="font-semibold text-lg mb-2 text-[var(--information-page-heading-text)]">
                {t("informationPage.jaguaIngredientsTitle")}
              </h3>

              <p className="italic text-sm leading-relaxed text-[var(--information-page-body-text)]">
                {t("informationPage.jaguaIngredientsList")}
              </p>
            </div>

            {/* Mixed Cone Ingredients */}
            <div className="bg-[var(--information-page-card-bg)] shadow-md rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--information-page-icon-bg)] flex items-center justify-center text-[var(--information-page-icon-text)] font-bold">
                M
              </div>

              <h3 className="font-semibold text-lg mb-2 text-[var(--information-page-heading-text)]">
                {t("informationPage.mixedConeIngredientsTitle")}
              </h3>

              <p className="italic text-sm leading-relaxed text-[var(--information-page-body-text)]">
                {t("informationPage.mixedConeIngredientsList")}
              </p>
            </div>

            {/* Body Paint Ingredients */}
            <div className="bg-[var(--information-page-card-bg)] shadow-md rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--information-page-icon-bg)] flex items-center justify-center text-[var(--information-page-icon-text)] font-bold">
                B
              </div>

              <h3 className="font-semibold text-lg mb-2 text-[var(--information-page-heading-text)]">
                {t("informationPage.bodyPaintIngredientsTitle")}
              </h3>

              <p className="italic text-sm leading-relaxed text-[var(--information-page-body-text)]">
                {t("informationPage.bodyPaintIngredientsList")}
              </p>
            </div>

          </div>
        </section>

        <HennaDivider />

        {/* Aftercare Section */}
        <section className="space-y-10 bg-[var(--information-page-section-bg)] backdrop-blur-sm rounded-3xl p-10 shadow-sm">

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-[var(--information-page-heading-text)]">
              {t("informationPage.afterCareInstructionsTitle")}
            </h2>

            <div className="w-16 h-[2px] mx-auto bg-[var(--information-page-divider-bg)] rounded-full"></div>
          </div>

          <div className="bg-[var(--information-page-card-bg)] shadow-lg rounded-2xl p-8">
            <ul className="list-disc pl-6 space-y-4 text-left marker:text-[var(--accent-color)] leading-relaxed text-[var(--information-page-body-text)]">
              <li>{t("informationPage.afterCareInstructions1")}</li>
              <li>{t("informationPage.afterCareInstructions2")}</li>
              <li>{t("informationPage.afterCareInstructions3")}</li>
              <li>{t("informationPage.afterCareInstructions4")}</li>
              <li>{t("informationPage.afterCareInstructions5")}</li>
            </ul>
          </div>

        </section>

        <HennaDivider />

        {/* Staining Results Section */}
        <section className="space-y-12 bg-[var(--information-page-section-bg)] backdrop-blur-sm rounded-3xl p-10 shadow-sm">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-[var(--information-page-heading-text)]">
              {t("informationPage.stainingResultsTitle")}
            </h2>

            <div className="w-16 h-[2px] mx-auto bg-[var(--information-page-divider-bg)] rounded-full"></div>
          </div>

          <StainingResultsGallery />
        </section>
      </div>
    </main>
  );
}