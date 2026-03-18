"use client";

import { useTranslation } from "react-i18next";

export default function WelcomeSection() {
  const { t } = useTranslation();

  return (
    <section
      id="welcome"
      className="scroll-mt-32 w-full flex justify-center px-4 sm:px-6 py-12 sm:py-16 bg-[#f0f7ed]" // soft green background
    >
      <div className="max-w-5xl w-full">

        {/* Divider */}
        <div className="flex items-center mb-8 sm:mb-10">
          <div className="flex-grow border-t border-[#b2a36b]"></div> {/* muted gold divider */}
          <div className="mx-3 sm:mx-4 text-[#3a3d2a] text-lg sm:text-xl font-semibold">✿</div> {/* dark olive icon */}
          <div className="flex-grow border-t border-[#b2a36b]"></div>
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl italic font-bold mb-6 sm:mb-10 text-[#2e3022]">
          {t("sections.welcomeSection.welcome")}
        </h2>

        {/* Text */}
        <div className="text-[#3a3d2a] leading-relaxed max-w-2xl mx-auto text-sm sm:text-base">
          <p>
            {t("sections.welcomeSection.description")}
          </p>
        </div>

      </div>
    </section>
  )
}